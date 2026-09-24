import { useState } from 'react';
import { getAverageStats, getBestWPM } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../utils/colors';
import TypeSmoothIcon from './TypeSmoothIcon';
import ThemeToggle from './ThemeToggle';
import PDFUpload from './PDFUpload';

interface TestSetupProps {
  userName: string;
  userEmail: string;
  onStart: (mode: 'screen' | 'paper', duration: number, pdfText?: string) => void;
  onLogout: () => void;
  onViewHistory: () => void;
}

export default function TestSetup({ userName, userEmail, onStart, onLogout, onViewHistory }: TestSetupProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [mode, setMode] = useState<'screen' | 'paper'>('screen');
  const [duration, setDuration] = useState<number>(10);
  const [pdfText, setPdfText] = useState<string>('');
  const [pdfError, setPdfError] = useState<string>('');

  const avgStats = getAverageStats(userEmail);
  const bestWpm = getBestWPM(userEmail);

  return (
    <div 
      className="min-h-screen p-4 transition-colors duration-300"
      style={{
        background: isDark 
          ? `linear-gradient(0deg, ${colors.header.gradientStart}, ${colors.header.gradientEnd} 80%)`
          : colors.surface.lightBlue
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between py-6 mb-8">
          <div className="flex items-center gap-3">
            <TypeSmoothIcon size={40} />
            <h1 
              className="text-2xl font-bold transition-colors duration-300"
              style={{ color: isDark ? colors.primary.yellow : colors.header.background }}
            >
              TypeSmooth
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={onViewHistory}
              className="px-4 py-2 text-sm rounded-lg transition-all"
              style={{
                color: isDark ? colors.text.white : colors.text.dark,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : colors.border.light}`,
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : colors.surface.white,
              }}
            >
              📊 History
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm transition-all"
              style={{ color: isDark ? colors.text.white : colors.text.default }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Welcome */}
        <div className="text-center mb-10">
          <h2 
            className="text-3xl font-bold mb-2 transition-colors duration-300"
            style={{ color: isDark ? colors.text.white : colors.text.dark }}
          >
            Welcome back, <span style={{ color: isDark ? colors.primary.yellow : colors.header.background }}>{userName}</span>!
          </h2>
          <p 
            className="transition-colors duration-300"
            style={{ color: isDark ? colors.text.white : colors.text.default }}
          >
            Choose your test settings and start typing
          </p>
        </div>

        {/* Stats Cards */}
        {avgStats.totalTests > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div 
              className="rounded-xl p-5 text-center transition-all duration-300"
              style={{
                backgroundColor: colors.surface.white,
                border: `1px solid ${colors.border.light}`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-sm mb-1" style={{ color: colors.text.default }}>Total Tests</p>
              <p className="text-3xl font-bold" style={{ color: colors.text.dark }}>{avgStats.totalTests}</p>
            </div>
            <div 
              className="rounded-xl p-5 text-center transition-all duration-300"
              style={{
                backgroundColor: colors.surface.white,
                border: `1px solid ${colors.border.light}`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-sm mb-1" style={{ color: colors.text.default }}>Avg WPM</p>
              <p className="text-3xl font-bold" style={{ color: colors.primary.blue }}>{avgStats.avgWpm}</p>
            </div>
            <div 
              className="rounded-xl p-5 text-center transition-all duration-300"
              style={{
                backgroundColor: colors.surface.white,
                border: `1px solid ${colors.border.light}`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-sm mb-1" style={{ color: colors.text.default }}>Best WPM</p>
              <p className="text-3xl font-bold" style={{ color: colors.primary.yellow }}>{bestWpm}</p>
            </div>
          </div>
        )}

        {/* Mode Selection */}
        <div 
          className="rounded-2xl p-8 mb-6 transition-all duration-300"
          style={{
            backgroundColor: colors.surface.white,
            border: `1px solid ${colors.border.light}`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4 transition-colors duration-300"
            style={{ color: colors.text.dark }}
          >
            Select Mode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setMode('screen')}
              className="p-6 rounded-xl border-2 transition-all text-left"
              style={{
                borderColor: mode === 'screen' ? colors.primary.blue : colors.border.light,
                backgroundColor: mode === 'screen' ? colors.surface.lightBlue : colors.surface.white,
                boxShadow: mode === 'screen' ? '0 8px 24px rgba(50, 149, 219, 0.2)' : 'none'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🖥️</span>
                <h4 
                  className="text-lg font-semibold transition-colors duration-300"
                  style={{ color: colors.text.dark }}
                >
                  Screen Mode
                </h4>
              </div>
              <p 
                className="text-sm transition-colors duration-300"
                style={{ color: colors.text.default }}
              >
                Text is displayed on screen. Read and type it. Perfect for practice and improving speed.
              </p>
              {mode === 'screen' && (
                <div className="mt-3 text-sm font-medium" style={{ color: colors.primary.blue }}>✓ Selected</div>
              )}
            </button>

            <button
              onClick={() => setMode('paper')}
              className="p-6 rounded-xl border-2 transition-all text-left"
              style={{
                borderColor: mode === 'paper' ? colors.primary.yellow : colors.border.light,
                backgroundColor: mode === 'paper' ? `${colors.primary.yellow}15` : colors.surface.white,
                boxShadow: mode === 'paper' ? '0 8px 24px rgba(255, 207, 70, 0.2)' : 'none'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📄</span>
                <h4 
                  className="text-lg font-semibold transition-colors duration-300"
                  style={{ color: colors.text.dark }}
                >
                  Paper Mode
                </h4>
              </div>
              <p 
                className="text-sm transition-colors duration-300"
                style={{ color: colors.text.default }}
              >
                Upload a PDF with your test text, then type from the printed paper. Text is hidden on screen — tests real typing skill with accurate results.
              </p>
              {mode === 'paper' && (
                <div className="mt-3 text-sm font-medium" style={{ color: colors.primary.yellow }}>✓ Selected</div>
              )}
            </button>
          </div>
        </div>

        {/* Duration Selection */}
        <div 
          className="rounded-2xl p-8 mb-8 transition-all duration-300"
          style={{
            backgroundColor: colors.surface.white,
            border: `1px solid ${colors.border.light}`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4 transition-colors duration-300"
            style={{ color: colors.text.dark }}
          >
            Select Duration
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[10, 15, 20].map((mins) => (
              <button
                key={mins}
                onClick={() => setDuration(mins)}
                className="p-5 rounded-xl border-2 transition-all"
                style={{
                  borderColor: duration === mins ? colors.primary.blue : colors.border.light,
                  backgroundColor: duration === mins ? colors.surface.lightBlue : colors.surface.white,
                  boxShadow: duration === mins ? '0 8px 24px rgba(50, 149, 219, 0.2)' : 'none'
                }}
              >
                <p 
                  className="text-3xl font-bold mb-1 transition-colors duration-300"
                  style={{ color: colors.text.dark }}
                >
                  {mins}
                </p>
                <p 
                  className="text-sm transition-colors duration-300"
                  style={{ color: colors.text.default }}
                >
                  minutes
                </p>
                {duration === mins && (
                  <div className="mt-2 text-xs font-medium" style={{ color: colors.primary.blue }}>✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* PDF Upload Section - Only for Paper Mode */}
        {mode === 'paper' && (
          <div 
            className="rounded-2xl p-8 mb-8 transition-all duration-300"
            style={{
              backgroundColor: colors.surface.white,
              border: `1px solid ${colors.border.light}`,
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <h3 
              className="text-lg font-semibold mb-4 transition-colors duration-300"
              style={{ color: colors.text.dark }}
            >
              📄 Upload Your Typing Test PDF (Optional)
            </h3>
            <p 
              className="text-sm mb-6 transition-colors duration-300"
              style={{ color: colors.text.default }}
            >
              Upload a PDF containing the text you want to type, or skip this to use default passages. We'll extract the text and use it for your test.
            </p>
            
            <PDFUpload 
              onTextExtracted={(text) => {
                setPdfText(text);
                setPdfError('');
              }}
              onError={(error) => {
                setPdfError(error);
                setPdfText('');
              }}
            />
            
            {pdfError && (
              <div 
                className="mt-4 p-3 rounded-lg text-sm"
                style={{ 
                  backgroundColor: `${colors.status.error}15`,
                  color: colors.status.error,
                  border: `1px solid ${colors.status.error}30`
                }}
              >
                ⚠️ {pdfError}
              </div>
            )}
          </div>
        )}

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={() => onStart(mode, duration, pdfText || undefined)}
            className="px-12 py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95"
            style={{
              background: colors.primary.yellow,
              color: colors.text.brown,
              boxShadow: '0 12px 40px rgba(255, 207, 70, 0.3)'
            }}
          >
            🚀 Start Test ({duration} min - {mode} mode{mode === 'paper' && pdfText ? ' - PDF' : ''})
          </button>
          {mode === 'paper' && !pdfText && (
            <p className="text-sm mt-2" style={{ color: colors.text.default }}>
              💡 Tip: Upload a PDF for custom text, or start with default passages
            </p>
          )}
        </div>

        {/* Instructions */}
        <div 
          className="mt-10 rounded-xl p-6 transition-all duration-300"
          style={{
            backgroundColor: colors.surface.lightGray,
            border: `1px solid ${colors.border.light}`
          }}
        >
          <h4 
            className="font-semibold mb-3 flex items-center gap-2 transition-colors duration-300"
            style={{ color: colors.text.dark }}
          >
            <svg className="w-5 h-5" style={{ color: colors.primary.blue }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            How it works
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: colors.text.default }}>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.primary.blue }} className="mt-0.5">•</span>
              <span><strong>Screen Mode:</strong> A text passage appears on screen. Type it exactly as shown. Your speed and accuracy are tracked in real-time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.primary.yellow }} className="mt-0.5">•</span>
              <span><strong>Paper Mode:</strong> Upload a PDF containing your typing test text, or use the default text. Print it on paper before starting. During the test, you'll see only a timer and typing box — no text preview or real-time stats. Your typing will be checked against the PDF content for accurate results.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.primary.lightBlue }} className="mt-0.5">•</span>
              <span><strong>Results:</strong> At the end, you'll see your WPM (words per minute), accuracy percentage, and detailed statistics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.primary.blue }} className="mt-0.5">•</span>
              <span><strong>Tip:</strong> Focus on accuracy first, speed will naturally improve with practice!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
