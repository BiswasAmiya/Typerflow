import { useState } from 'react';
import { TestResult, getPerformanceRating, getPerformanceColor } from '../utils/calculations';
import { getUserResults, clearResults } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../utils/colors';
import TypeSmoothIcon from './TypeSmoothIcon';
import ThemeToggle from './ThemeToggle';

interface HistoryProps {
  userEmail: string;
  onBack: () => void;
}

export default function History({ userEmail, onBack }: HistoryProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [results, setResults] = useState<TestResult[]>(getUserResults(userEmail));
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClear = () => {
    clearResults();
    setResults([]);
    setShowClearConfirm(false);
  };

  const sortedResults = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalTests = results.length;
  const avgWpm = totalTests > 0 ? Math.round(results.reduce((sum, r) => sum + r.stats.wpm, 0) / totalTests) : 0;
  const avgAccuracy = totalTests > 0 ? Math.round(results.reduce((sum, r) => sum + r.stats.accuracy, 0) / totalTests * 100) / 100 : 0;
  const bestWpm = totalTests > 0 ? Math.max(...results.map(r => r.stats.wpm)) : 0;

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
      <div className="max-w-5xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TypeSmoothIcon size={40} />
            <h1 
              className="text-2xl font-bold transition-colors duration-300"
              style={{ color: isDark ? colors.lemonade : colors.electric }}
            >
              TypeSmooth
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {results.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-4 py-2 text-sm rounded-lg transition-all"
                style={{
                  color: colors.coral,
                  border: `1px solid ${colors.coral}30`
                }}
              >
                🗑️ Clear All
              </button>
            )}
            <button
              onClick={onBack}
              className="px-4 py-2 text-sm rounded-lg transition-all"
              style={{
                color: isDark ? colors.dark.text : colors.light.text,
                border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1" style={{ color: isDark ? colors.dark.text : colors.light.text }}>Test History</h1>
          <p style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Your typing test results</p>
        </div>

        {/* Summary Stats */}
        {totalTests > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="rounded-xl p-5 text-center" style={cardStyle}>
              <p className="text-sm mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Total Tests</p>
              <p className="text-3xl font-bold" style={{ color: isDark ? colors.dark.text : colors.light.text }}>{totalTests}</p>
            </div>
            <div className="rounded-xl p-5 text-center" style={cardStyle}>
              <p className="text-sm mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Avg WPM</p>
              <p className="text-3xl font-bold" style={{ color: isDark ? colors.lemonade : colors.electric }}>{avgWpm}</p>
            </div>
            <div className="rounded-xl p-5 text-center" style={cardStyle}>
              <p className="text-sm mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Avg Accuracy</p>
              <p className="text-3xl font-bold" style={{ color: colors.lemonadeDark }}>{avgAccuracy}%</p>
            </div>
            <div className="rounded-xl p-5 text-center" style={cardStyle}>
              <p className="text-sm mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Best WPM</p>
              <p className="text-3xl font-bold" style={{ color: colors.lavender }}>{bestWpm}</p>
            </div>
          </div>
        )}

        {/* Results Table */}
        {sortedResults.length > 0 ? (
          <div className="rounded-2xl overflow-hidden" style={cardStyle}>
            {/* Table Header */}
            <div 
              className="hidden md:grid grid-cols-7 gap-4 p-4 text-xs font-medium uppercase tracking-wider"
              style={{
                backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary,
                color: isDark ? colors.dark.textMuted : colors.light.textMuted
              }}
            >
              <span>Date</span>
              <span>Mode</span>
              <span>Duration</span>
              <span>WPM</span>
              <span>Accuracy</span>
              <span>Errors</span>
              <span>Rating</span>
            </div>
            
            {sortedResults.map((result, index) => {
              const rating = getPerformanceRating(result.stats.wpm, result.stats.accuracy);
              const ratingColor = getPerformanceColor(rating);
              const date = new Date(result.date);
              
              return (
                <div
                  key={result.id}
                  className="grid grid-cols-2 md:grid-cols-7 gap-4 p-4 items-center transition-all"
                  style={{
                    borderTop: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
                    backgroundColor: index === 0 
                      ? (isDark ? `${colors.lemonade}08` : `${colors.electric}08`)
                      : 'transparent'
                  }}
                >
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-sm font-medium" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
                      {date.toLocaleDateString()}
                    </p>
                    <p className="text-xs" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                      {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div>
                    <span 
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                      style={{
                        backgroundColor: result.mode === 'screen' 
                          ? (isDark ? `${colors.lemonade}20` : `${colors.electric}20`)
                          : `${colors.lavender}20`,
                        color: result.mode === 'screen' 
                          ? (isDark ? colors.lemonade : colors.electric)
                          : colors.lavender
                      }}
                    >
                      {result.mode === 'screen' ? '🖥️' : '📄'} {result.mode}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm" style={{ color: isDark ? colors.dark.text : colors.light.text }}>{result.duration} min</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg" style={{ color: isDark ? colors.lemonade : colors.electric }}>{result.stats.wpm}</span>
                    <span className="text-xs ml-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>wpm</span>
                  </div>
                  <div>
                    <span 
                      className="font-medium"
                      style={{ 
                        color: result.stats.accuracy >= 95 ? colors.lemonadeDark : result.stats.accuracy >= 85 ? colors.sky : colors.coral 
                      }}
                    >
                      {result.stats.accuracy}%
                    </span>
                  </div>
                  <div>
                    <span className="text-sm" style={{ color: colors.coral }}>{result.stats.incorrectChars}</span>
                  </div>
                  <div>
                    <span className={`text-sm font-medium ${ratingColor}`}>{rating}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: isDark ? colors.dark.text : colors.light.text }}>No tests yet</h3>
            <p className="mb-6" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Complete a typing test to see your results here</p>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl font-semibold transition-all"
              style={{
                background: isDark 
                  ? `linear-gradient(135deg, ${colors.lemonade}, ${colors.lemonadeDark})`
                  : `linear-gradient(135deg, ${colors.electric}, ${colors.electricMedium})`,
                color: isDark ? colors.electric : colors.lemonade
              }}
            >
              Take a Test →
            </button>
          </div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
            <div 
              className="rounded-2xl p-6 max-w-sm w-full"
              style={{
                backgroundColor: isDark ? colors.dark.bgSecondary : colors.light.bgSecondary,
                border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? colors.dark.text : colors.light.text }}>Clear All History?</h3>
              <p className="mb-6" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                This will permanently delete all your test results. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all"
                  style={{
                    border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
                    color: isDark ? colors.dark.text : colors.light.text
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all"
                  style={{
                    backgroundColor: `${colors.coral}20`,
                    border: `1px solid ${colors.coral}50`,
                    color: colors.coral
                  }}
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
