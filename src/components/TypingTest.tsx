import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getMultiplePassages } from '../utils/textPassages';
import { calculateWPM, calculateAccuracy, calculateRawWPM, formatTime, generateId, TestResult } from '../utils/calculations';
import { sanitizeTypingInput, isRateLimited, recordSubmission } from '../utils/validation';
import { saveResult } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../utils/colors';
import TypeSmoothIcon from './TypeSmoothIcon';
import ThemeToggle from './ThemeToggle';

interface TypingTestProps {
  userName: string;
  userEmail: string;
  mode: 'screen' | 'paper';
  duration: number;
  onComplete: (result: TestResult) => void;
  onQuit: () => void;
}

export default function TypingTest({ userName, userEmail, mode, duration, onComplete, onQuit }: TypingTestProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [text, setText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [currentWpm, setCurrentWpm] = useState(0);
  const [currentAccuracy, setCurrentAccuracy] = useState(100);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [paperText, setPaperText] = useState('');
  const [copied, setCopied] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const correctCharsRef = useRef(0);
  const incorrectCharsRef = useRef(0);
  const typedTextRef = useRef('');
  const isFinishedRef = useRef(false);
  const durationRef = useRef(duration);

  useEffect(() => { correctCharsRef.current = correctChars; }, [correctChars]);
  useEffect(() => { incorrectCharsRef.current = incorrectChars; }, [incorrectChars]);
  useEffect(() => { typedTextRef.current = typedText; }, [typedText]);
  useEffect(() => { isFinishedRef.current = isFinished; }, [isFinished]);

  useEffect(() => {
    const passageCount = duration <= 10 ? 4 : duration <= 15 ? 6 : 8;
    const generatedText = getMultiplePassages(passageCount);
    setText(generatedText);
    setPaperText(generatedText);
  }, [duration]);

  useEffect(() => {
    if (isStarted && !isFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimeout(() => finishTest(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isStarted, isFinished]);

  const finishTest = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const elapsed = durationRef.current * 60 - (timeLeft > 0 ? timeLeft : 0);
    const actualCorrect = correctCharsRef.current;
    const actualTotal = typedTextRef.current.length;
    
    const wpm = calculateWPM(actualCorrect, elapsed || 1);
    const accuracy = calculateAccuracy(actualCorrect, actualTotal);
    const rawWpm = calculateRawWPM(actualTotal, elapsed || 1);

    if (isRateLimited()) {
      alert('Too many tests completed in a short time. Please wait a moment.');
      onQuit();
      return;
    }

    const result: TestResult = {
      id: generateId(),
      name: userName,
      email: userEmail,
      mode,
      duration: durationRef.current,
      stats: {
        wpm, accuracy,
        correctChars: actualCorrect,
        incorrectChars: incorrectCharsRef.current,
        totalChars: actualTotal,
        timeElapsed: elapsed || durationRef.current * 60,
        rawWpm, consistency: 0
      },
      date: new Date().toISOString(),
      textTyped: typedTextRef.current
    };

    recordSubmission();
    saveResult(result);
    onComplete(result);
  }, [timeLeft, userName, userEmail, mode, onComplete, onQuit]);

  useEffect(() => {
    if (!isStarted || isFinished) return;
    const statsInterval = setInterval(() => {
      if (startTimeRef.current && typedText.length > 0) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setCurrentWpm(calculateWPM(correctChars, elapsed));
        setCurrentAccuracy(calculateAccuracy(correctChars, typedText.length));
      }
    }, 1000);
    return () => clearInterval(statsInterval);
  }, [isStarted, isFinished, correctChars, typedText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;
    const value = sanitizeTypingInput(e.target.value);
    
    if (!isStarted && value.length > 0) {
      setIsStarted(true);
      startTimeRef.current = Date.now();
    }

    setTypedText(value);

    let correct = 0;
    let incorrect = 0;
    const minLength = Math.min(value.length, text.length);
    
    for (let i = 0; i < minLength; i++) {
      if (value[i] === text[i]) correct++;
      else incorrect++;
    }
    
    setCorrectChars(correct);
    setIncorrectChars(incorrect);

    if (value.length >= text.length) finishTest();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') e.preventDefault();
  };

  useEffect(() => { if (textareaRef.current) textareaRef.current.focus(); }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isStarted && !isFinished) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isStarted, isFinished]);

  const progress = text.length > 0 ? (typedText.length / text.length) * 100 : 0;
  const timeProgress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const handleCopyText = () => {
    navigator.clipboard.writeText(paperText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const cardStyle = {
    backgroundColor: isDark ? colors.dark.card : colors.light.card,
    border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
  };

  return (
    <div 
      className="min-h-screen p-4 transition-colors duration-300"
      style={{
        background: isDark 
          ? `linear-gradient(135deg, ${colors.electric} 0%, ${colors.dark.bgSecondary} 50%, ${colors.electric} 100%)`
          : `linear-gradient(135deg, ${colors.light.bg} 0%, ${colors.light.bgTertiary} 50%, ${colors.light.bg} 100%)`
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between py-4 mb-4">
          <div className="flex items-center gap-3">
            <TypeSmoothIcon size={32} />
            <span 
              className="font-semibold transition-colors duration-300"
              style={{ color: isDark ? colors.lemonade : colors.electric }}
            >
              TypeSmooth
            </span>
            <span style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }} className="text-sm">|</span>
            <span className="text-sm" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
              {mode === 'screen' ? '🖥️ Screen' : '📄 Paper'} Mode
            </span>
            <span style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }} className="text-sm">|</span>
            <span className="text-sm" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>{duration} min</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setShowQuitConfirm(true)}
              className="px-4 py-2 text-sm rounded-lg transition-all"
              style={{
                color: isDark ? colors.dark.textMuted : colors.light.textMuted,
                border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
              }}
            >
              ✕ Quit
            </button>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl p-4 text-center transition-all duration-300" style={cardStyle}>
            <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Time Left</p>
            <p className={`text-2xl font-bold font-mono ${timeLeft <= 60 ? 'animate-pulse' : ''}`} style={{ color: timeLeft <= 60 ? colors.coral : (isDark ? colors.dark.text : colors.light.text) }}>
              {formatTime(timeLeft)}
            </p>
          </div>
          <div className="rounded-xl p-4 text-center transition-all duration-300" style={cardStyle}>
            <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>WPM</p>
            <p className="text-2xl font-bold" style={{ color: isDark ? colors.lemonade : colors.electric }}>{currentWpm}</p>
          </div>
          <div className="rounded-xl p-4 text-center transition-all duration-300" style={cardStyle}>
            <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Accuracy</p>
            <p className="text-2xl font-bold" style={{ color: currentAccuracy >= 95 ? colors.lemonadeDark : currentAccuracy >= 85 ? colors.sky : colors.coral }}>
              {currentAccuracy}%
            </p>
          </div>
          <div className="rounded-xl p-4 text-center transition-all duration-300" style={cardStyle}>
            <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Errors</p>
            <p className="text-2xl font-bold" style={{ color: colors.coral }}>{incorrectChars}</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs w-16" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Time</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${timeProgress}%`, background: `linear-gradient(90deg, ${colors.electricMedium}, ${colors.lemonade})` }} />
            </div>
            <span className="text-xs w-12 text-right" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>{Math.round(timeProgress)}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs w-16" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Progress</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%`, background: `linear-gradient(90deg, ${colors.lemonadeDark}, ${colors.lemonade})` }} />
            </div>
            <span className="text-xs w-12 text-right" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Text Display */}
          <div className="rounded-2xl p-6 transition-all duration-300" style={cardStyle}>
            {mode === 'screen' ? (
              <>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.lemonade }}></span>
                  Text to type
                </h3>
                <div className="h-80 overflow-y-auto font-mono text-sm leading-relaxed pr-2">
                  {text.split('').map((char, index) => {
                    let color = isDark ? 'rgba(184, 251, 60, 0.4)' : 'rgba(3, 4, 94, 0.4)';
                    let bg = 'transparent';
                    if (index < typedText.length) {
                      if (typedText[index] === char) {
                        color = colors.lemonadeDark;
                      } else {
                        color = colors.coral;
                        bg = `${colors.coral}20`;
                      }
                    } else if (index === typedText.length) {
                      color = isDark ? colors.dark.text : colors.light.text;
                      bg = `${colors.lemonade}30`;
                    }
                    return (
                      <span key={index} style={{ color, backgroundColor: bg, borderLeft: index === typedText.length ? `2px solid ${colors.lemonade}` : 'none' }}>
                        {char === '\n' ? '↵\n' : char}
                      </span>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.lavender }}></span>
                  📄 Paper Mode - Reference Text
                </h3>
                <div className="h-80 flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-lg font-medium mb-2" style={{ color: isDark ? colors.dark.text : colors.light.text }}>Type from your paper</p>
                  <p className="text-sm mb-6 max-w-xs" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                    The text is NOT shown on screen during typing. Type from the printed/written paper you prepared.
                  </p>
                  <div 
                    className="rounded-lg p-4 max-w-sm w-full"
                    style={{
                      backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary,
                      border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
                    }}
                  >
                    <p className="text-xs mb-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Need the text? Copy it before starting:</p>
                    <textarea
                      readOnly
                      value={paperText}
                      className="w-full h-24 text-xs bg-transparent border-none resize-none focus:outline-none"
                      style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
                      onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    />
                    <button
                      onClick={handleCopyText}
                      className="mt-2 px-3 py-1.5 text-xs rounded transition-all"
                      style={{
                        backgroundColor: copied ? `${colors.lemonadeDark}20` : (isDark ? colors.dark.bgSecondary : colors.light.bgTertiary),
                        color: copied ? colors.lemonadeDark : (isDark ? colors.dark.text : colors.light.text),
                        border: `1px solid ${copied ? `${colors.lemonadeDark}30` : (isDark ? colors.dark.border : colors.light.border)}`
                      }}
                    >
                      {copied ? '✓ Copied!' : '📋 Copy to clipboard'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Typing Area */}
          <div className="rounded-2xl p-6 transition-all duration-300" style={cardStyle}>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
              <span className={`w-2 h-2 rounded-full ${isStarted ? 'animate-pulse' : ''}`} style={{ backgroundColor: isStarted ? colors.lemonade : (isDark ? colors.dark.textMuted : colors.light.textMuted) }}></span>
              {isFinished ? 'Test Complete!' : isStarted ? 'Typing in progress...' : 'Start typing to begin'}
            </h3>
            <textarea
              ref={textareaRef}
              value={typedText}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              disabled={isFinished}
              className="w-full h-80 rounded-xl p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              style={{
                backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary,
                border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
                color: isDark ? colors.dark.text : colors.light.text,
                caretColor: colors.lemonade
              }}
              placeholder={isStarted ? '' : 'Start typing to begin the test...'}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <div className="mt-3 flex items-center justify-between text-xs" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
              <span>Characters: {typedText.length} / {text.length}</span>
              <span>
                {!isStarted && !isFinished && '⏳ Waiting to start...'}
                {isStarted && !isFinished && '🟢 Active'}
                {isFinished && '✅ Complete'}
              </span>
            </div>
          </div>
        </div>

        {/* Keyboard Tips */}
        <div 
          className="mt-6 rounded-xl p-4 transition-all duration-300"
          style={{
            backgroundColor: isDark ? `${colors.dark.bgTertiary}50` : `${colors.light.bgTertiary}50`,
            border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
          }}
        >
          <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded" style={{ backgroundColor: isDark ? colors.dark.bgSecondary : colors.light.bgTertiary, color: isDark ? colors.dark.text : colors.light.text }}>Tab</kbd>
              <span>disabled</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded" style={{ backgroundColor: isDark ? colors.dark.bgSecondary : colors.light.bgTertiary, color: isDark ? colors.dark.text : colors.light.text }}>Backspace</kbd>
              <span>to correct mistakes</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded" style={{ backgroundColor: isDark ? colors.dark.bgSecondary : colors.light.bgTertiary, color: isDark ? colors.dark.text : colors.light.text }}>Enter</kbd>
              <span>for new line</span>
            </span>
            <span style={{ color: isDark ? colors.dark.border : colors.light.border }}>|</span>
            <span>💡 Focus on accuracy first, speed will follow</span>
          </div>
        </div>

        {/* Quit Modal */}
        {showQuitConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
            <div 
              className="rounded-2xl p-6 max-w-sm w-full"
              style={{
                backgroundColor: isDark ? colors.dark.bgSecondary : colors.light.bgSecondary,
                border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚠️</div>
                <h3 className="text-xl font-bold" style={{ color: isDark ? colors.dark.text : colors.light.text }}>Quit Test?</h3>
              </div>
              <p className="mb-6 text-center" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                Your progress will be lost. Are you sure you want to quit?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowQuitConfirm(false)}
                  className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all"
                  style={{
                    border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
                    color: isDark ? colors.dark.text : colors.light.text
                  }}
                >
                  Continue Test
                </button>
                <button
                  onClick={onQuit}
                  className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all"
                  style={{
                    backgroundColor: `${colors.coral}20`,
                    border: `1px solid ${colors.coral}50`,
                    color: colors.coral
                  }}
                >
                  Quit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
