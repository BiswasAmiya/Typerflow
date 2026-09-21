import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getMultiplePassages } from '../utils/textPassages';
import { calculateWPM, calculateAccuracy, calculateRawWPM, formatTime, generateId, TestResult } from '../utils/calculations';
import { sanitizeTypingInput, isRateLimited, recordSubmission } from '../utils/validation';
import { saveResult } from '../utils/storage';

interface TypingTestProps {
  userName: string;
  userEmail: string;
  mode: 'screen' | 'paper';
  duration: number; // in minutes
  onComplete: (result: TestResult) => void;
  onQuit: () => void;
}

export default function TypingTest({ userName, userEmail, mode, duration, onComplete, onQuit }: TypingTestProps) {
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

  // Keep refs in sync
  useEffect(() => { correctCharsRef.current = correctChars; }, [correctChars]);
  useEffect(() => { incorrectCharsRef.current = incorrectChars; }, [incorrectChars]);
  useEffect(() => { typedTextRef.current = typedText; }, [typedText]);
  useEffect(() => { isFinishedRef.current = isFinished; }, [isFinished]);

  // Generate text for the test
  useEffect(() => {
    const passageCount = duration <= 10 ? 4 : duration <= 15 ? 6 : 8;
    const generatedText = getMultiplePassages(passageCount);
    setText(generatedText);
    setPaperText(generatedText);
  }, [duration]);

  // Timer logic
  useEffect(() => {
    if (isStarted && !isFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Time's up - trigger finish
            setTimeout(() => finishTest(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
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
      alert('Too many tests completed in a short time. Please wait a moment before trying again.');
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
        wpm,
        accuracy,
        correctChars: actualCorrect,
        incorrectChars: incorrectCharsRef.current,
        totalChars: actualTotal,
        timeElapsed: elapsed || durationRef.current * 60,
        rawWpm,
        consistency: 0
      },
      date: new Date().toISOString(),
      textTyped: typedTextRef.current
    };

    recordSubmission();
    saveResult(result);
    onComplete(result);
  }, [timeLeft, userName, userEmail, mode, onComplete, onQuit]);

  // Update live stats every second
  useEffect(() => {
    if (!isStarted || isFinished) return;

    const statsInterval = setInterval(() => {
      if (startTimeRef.current && typedText.length > 0) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const wpm = calculateWPM(correctChars, elapsed);
        const accuracy = calculateAccuracy(correctChars, typedText.length);
        setCurrentWpm(wpm);
        setCurrentAccuracy(accuracy);
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

    // Calculate character-level accuracy
    let correct = 0;
    let incorrect = 0;
    const minLength = Math.min(value.length, text.length);
    
    for (let i = 0; i < minLength; i++) {
      if (value[i] === text[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }
    
    setCorrectChars(correct);
    setIncorrectChars(incorrect);

    // Auto-finish if all text typed
    if (value.length >= text.length) {
      finishTest();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    // Allow Ctrl+A to select all
    if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
      return; // Let default behavior happen
    }
  };

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Prevent accidental page leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isStarted && !isFinished) {
        e.preventDefault();
        e.returnValue = '';
      }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between py-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white font-semibold">Typerflow</span>
            <span className="text-gray-500 text-sm">|</span>
            <span className="text-gray-400 text-sm">{mode === 'screen' ? '🖥️ Screen' : '📄 Paper'} Mode</span>
            <span className="text-gray-500 text-sm">|</span>
            <span className="text-gray-400 text-sm">{duration} min</span>
          </div>
          <button
            onClick={() => setShowQuitConfirm(true)}
            className="px-4 py-2 text-sm text-gray-400 hover:text-red-400 border border-gray-700 rounded-lg hover:border-red-500/50 transition-all"
          >
            ✕ Quit
          </button>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs mb-1">Time Left</p>
            <p className={`text-2xl font-bold font-mono ${timeLeft <= 60 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs mb-1">WPM</p>
            <p className="text-2xl font-bold text-indigo-400">{currentWpm}</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs mb-1">Accuracy</p>
            <p className={`text-2xl font-bold ${currentAccuracy >= 95 ? 'text-emerald-400' : currentAccuracy >= 85 ? 'text-yellow-400' : 'text-red-400'}`}>
              {currentAccuracy}%
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs mb-1">Errors</p>
            <p className="text-2xl font-bold text-red-400">{incorrectChars}</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-16">Time</span>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                style={{ width: `${timeProgress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-12 text-right">{Math.round(timeProgress)}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-16">Progress</span>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-12 text-right">{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Text Display (Screen Mode) / Instructions (Paper Mode) */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
            {mode === 'screen' ? (
              <>
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  Text to type
                </h3>
                <div className="h-80 overflow-y-auto font-mono text-sm leading-relaxed pr-2">
                  {text.split('').map((char, index) => {
                    let className = 'text-gray-500';
                    if (index < typedText.length) {
                      className = typedText[index] === char 
                        ? 'text-emerald-400' 
                        : 'text-red-400 bg-red-400/20 rounded';
                    } else if (index === typedText.length) {
                      className = 'text-white bg-indigo-500/30 border-l-2 border-indigo-400';
                    }
                    return (
                      <span key={index} className={className}>
                        {char === '\n' ? '↵\n' : char}
                      </span>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  📄 Paper Mode - Reference Text
                </h3>
                <div className="h-80 flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-white text-lg font-medium mb-2">Type from your paper</p>
                  <p className="text-gray-400 text-sm mb-6 max-w-xs">
                    The text is NOT shown on screen during typing. Type from the printed/written paper you prepared.
                  </p>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 max-w-sm w-full">
                    <p className="text-xs text-gray-500 mb-2">Need the text? Copy it before starting:</p>
                    <textarea
                      readOnly
                      value={paperText}
                      className="w-full h-24 text-xs text-gray-400 bg-transparent border-none resize-none focus:outline-none"
                      onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    />
                    <button
                      onClick={handleCopyText}
                      className={`mt-2 px-3 py-1.5 text-xs rounded transition-all ${
                        copied 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                      }`}
                    >
                      {copied ? '✓ Copied!' : '📋 Copy to clipboard'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Typing Area */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isStarted ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`}></span>
              {isFinished ? 'Test Complete!' : isStarted ? 'Typing in progress...' : 'Start typing to begin'}
            </h3>
            <textarea
              ref={textareaRef}
              value={typedText}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              disabled={isFinished}
              className="typing-area w-full h-80 bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={isStarted ? '' : 'Start typing to begin the test...'}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
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
        <div className="mt-6 bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">Tab</kbd>
              <span>disabled</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">Backspace</kbd>
              <span>to correct mistakes</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">Enter</kbd>
              <span>for new line</span>
            </span>
            <span className="text-gray-600">|</span>
            <span>💡 Focus on accuracy first, speed will follow</span>
          </div>
        </div>

        {/* Quit Confirmation Modal */}
        {showQuitConfirm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚠️</div>
                <h3 className="text-xl font-bold text-white">Quit Test?</h3>
              </div>
              <p className="text-gray-400 mb-6 text-center">
                Your progress will be lost. Are you sure you want to quit?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowQuitConfirm(false)}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-all font-medium"
                >
                  Continue Test
                </button>
                <button
                  onClick={onQuit}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all font-medium"
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
