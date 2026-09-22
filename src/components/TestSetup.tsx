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
          ? `linear-gradient(135deg, ${colors.electric} 0%, ${colors.dark.bgSecondary} 50%, ${colors.electric} 100%)`
          : `linear-gradient(135deg, ${colors.light.bg} 0%, ${colors.light.bgTertiary} 50%, ${colors.light.bg} 100%)`
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between py-6 mb-8">
          <div className="flex items-center gap-3">
            <TypeSmoothIcon size={40} />
            <h1 
              className="text-2xl font-bold transition-colors duration-300"
              style={{ color: isDark ? colors.lemonade : colors.electric }}
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
                color: isDark ? colors.dark.text : colors.light.text,
                border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
              }}
            >
              📊 History
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm transition-all"
              style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Welcome */}
        <div className="text-center mb-10">
          <h2 
            className="text-3xl font-bold mb-2 transition-colors duration-300"
            style={{ color: isDark ? colors.dark.text : colors.light.text }}
          >
            Welcome back, <span style={{ color: isDark ? colors.lemonade : colors.electric }}>{userName}</span>!
          </h2>
          <p 
            className="transition-colors duration-300"
            style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
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
                backgroundColor: isDark ? colors.dark.card : colors.light.card,
                border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
              }}
            >
              <p className="text-sm mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Total Tests</p>
              <p className="text-3xl font-bold" style={{ color: isDark ? colors.dark.text : colors.light.text }}>{avgStats.totalTests}</p>
            </div>
            <div 
              className="rounded-xl p-5 text-center transition-all duration-300"
              style={{
                backgroundColor: isDark ? colors.dark.card : colors.light.card,
                border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
              }}
            >
              <p className="text-sm mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Avg WPM</p>
              <p className="text-3xl font-bold" style={{ color: isDark ? colors.lemonade : colors.electric }}>{avgStats.avgWpm}</p>
            </div>
            <div 
              className="rounded-xl p-5 text-center transition-all duration-300"
              style={{
                backgroundColor: isDark ? colors.dark.card : colors.light.card,
                border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
              }}
            >
              <p className="text-sm mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Best WPM</p>
              <p className="text-3xl font-bold" style={{ color: colors.lemonadeDark }}>{bestWpm}</p>
            </div>
          </div>
        )}

        {/* Mode Selection */}
        <div 
          className="rounded-2xl p-8 mb-6 transition-all duration-300"
          style={{
            backgroundColor: isDark ? colors.dark.card : colors.light.card,
            border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4 transition-colors duration-300"
            style={{ color: isDark ? colors.dark.text : colors.light.text }}
          >
            Select Mode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setMode('screen')}
              className="p-6 rounded-xl border-2 transition-all text-left"
              style={{
                borderColor: mode === 'screen' ? colors.lemonade : (isDark ? colors.dark.border : colors.light.border),
                backgroundColor: mode === 'screen' 
                  ? (isDark ? `${colors.lemonade}10` : `${colors.electric}10`)
                  : (isDark ? colors.dark.bgTertiary : colors.light.bgTertiary),
                boxShadow: mode === 'screen' ? `0 8px 24px ${colors.lemonade}20` : 'none'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🖥️</span>
                <h4 
                  className="text-lg font-semibold transition-colors duration-300"
                  style={{ color: isDark ? colors.dark.text : colors.light.text }}
                >
                  Screen Mode
                </h4>
              </div>
              <p 
                className="text-sm transition-colors duration-300"
                style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
              >
                Text is displayed on screen. Read and type it. Perfect for practice and improving speed.
              </p>
              {mode === 'screen' && (
                <div className="mt-3 text-sm font-medium" style={{ color: colors.lemonade }}>✓ Selected</div>
              )}
            </button>

            <button
              onClick={() => setMode('paper')}
              className="p-6 rounded-xl border-2 transition-all text-left"
              style={{
                borderColor: mode === 'paper' ? colors.lavender : (isDark ? colors.dark.border : colors.light.border),
                backgroundColor: mode === 'paper' 
                  ? (isDark ? `${colors.lavender}10` : `${colors.lavender}10`)
                  : (isDark ? colors.dark.bgTertiary : colors.light.bgTertiary),
                boxShadow: mode === 'paper' ? `0 8px 24px ${colors.lavender}20` : 'none'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📄</span>
                <h4 
                  className="text-lg font-semibold transition-colors duration-300"
                  style={{ color: isDark ? colors.dark.text : colors.light.text }}
                >
                  Paper Mode
                </h4>
              </div>
              <p 
                className="text-sm transition-colors duration-300"
                style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
              >
                Upload a PDF with your test text, then type from the printed paper. Text is hidden on screen — tests real typing skill with accurate results.
              </p>
              {mode === 'paper' && (
                <div className="mt-3 text-sm font-medium" style={{ color: colors.lavender }}>✓ Selected</div>
              )}
            </button>
          </div>
        </div>

        {/* Duration Selection */}
        <div 
          className="rounded-2xl p-8 mb-8 transition-all duration-300"
          style={{
            backgroundColor: isDark ? colors.dark.card : colors.light.card,
            border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4 transition-colors duration-300"
            style={{ color: isDark ? colors.dark.text : colors.light.text }}
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
                  borderColor: duration === mins ? colors.lemonade : (isDark ? colors.dark.border : colors.light.border),
                  backgroundColor: duration === mins 
                    ? (isDark ? `${colors.lemonade}10` : `${colors.electric}10`)
                    : (isDark ? colors.dark.bgTertiary : colors.light.bgTertiary),
                  boxShadow: duration === mins ? `0 8px 24px ${colors.lemonade}20` : 'none'
                }}
              >
                <p 
                  className="text-3xl font-bold mb-1 transition-colors duration-300"
                  style={{ color: isDark ? colors.dark.text : colors.light.text }}
                >
                  {mins}
                </p>
                <p 
                  className="text-sm transition-colors duration-300"
                  style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
                >
                  minutes
                </p>
                {duration === mins && (
                  <div className="mt-2 text-xs font-medium" style={{ color: colors.lemonade }}>✓ Selected</div>
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
              backgroundColor: isDark ? colors.dark.card : colors.light.card,
              border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
            }}
          >
            <h3 
              className="text-lg font-semibold mb-4 transition-colors duration-300"
              style={{ color: isDark ? colors.dark.text : colors.light.text }}
            >
              📄 Upload Your Typing Test PDF (Optional)
            </h3>
            <p 
              className="text-sm mb-6 transition-colors duration-300"
              style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
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
                  backgroundColor: `${colors.coral}15`,
                  color: colors.coral,
                  border: `1px solid ${colors.coral}30`
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
              background: isDark 
                ? `linear-gradient(135deg, ${colors.lemonade}, ${colors.lemonadeDark})`
                : `linear-gradient(135deg, ${colors.electric}, ${colors.electricMedium})`,
              color: isDark ? colors.electric : colors.lemonade,
              boxShadow: isDark 
                ? `0 12px 40px ${colors.lemonade}30`
                : `0 12px 40px ${colors.electric}30`
            }}
          >
            🚀 Start Test ({duration} min - {mode} mode{mode === 'paper' && pdfText ? ' - PDF' : ''})
          </button>
          {mode === 'paper' && !pdfText && (
            <p className="text-sm mt-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
              💡 Tip: Upload a PDF for custom text, or start with default passages
            </p>
          )}
        </div>

        {/* Instructions */}
        <div 
          className="mt-10 rounded-xl p-6 transition-all duration-300"
          style={{
            backgroundColor: isDark ? `${colors.dark.bgTertiary}50` : `${colors.light.bgTertiary}50`,
            border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
          }}
        >
          <h4 
            className="font-semibold mb-3 flex items-center gap-2 transition-colors duration-300"
            style={{ color: isDark ? colors.dark.text : colors.light.text }}
          >
            <svg className="w-5 h-5" style={{ color: colors.lemonade }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            How it works
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.lemonade }} className="mt-0.5">•</span>
              <span><strong>Screen Mode:</strong> A text passage appears on screen. Type it exactly as shown. Your speed and accuracy are tracked in real-time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.lavender }} className="mt-0.5">•</span>
              <span><strong>Paper Mode:</strong> Upload a PDF containing your typing test text, or use the default text. Print it on paper before starting. The screen will be blank — type from your paper reference. Results are calculated based on the PDF content.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.lemonadeDark }} className="mt-0.5">•</span>
              <span><strong>Results:</strong> At the end, you'll see your WPM (words per minute), accuracy percentage, and detailed statistics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: colors.sky }} className="mt-0.5">•</span>
              <span><strong>Tip:</strong> Focus on accuracy first, speed will naturally improve with practice!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
