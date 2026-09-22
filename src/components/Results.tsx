import { TestResult, getPerformanceRating, getPerformanceColor } from '../utils/calculations';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../utils/colors';
import TypeSmoothIcon from './TypeSmoothIcon';

interface ResultsProps {
  result: TestResult;
  onRetake: () => void;
  onHome: () => void;
  onViewHistory: () => void;
}

export default function Results({ result, onRetake, onHome, onViewHistory }: ResultsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const rating = getPerformanceRating(result.stats.wpm, result.stats.accuracy);
  const ratingColor = getPerformanceColor(rating);
  
  const minutes = Math.floor(result.stats.timeElapsed / 60);
  const seconds = result.stats.timeElapsed % 60;

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
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
            style={{
              background: isDark ? `${colors.lemonade}20` : `${colors.electric}20`,
              border: `2px solid ${isDark ? colors.lemonade : colors.electric}40`
            }}
          >
            <TypeSmoothIcon size={48} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
            Test Complete!
          </h1>
          <p style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
            Here are your results, {result.name}
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl p-6 text-center" style={cardStyle}>
            <p className="text-sm mb-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Speed</p>
            <p className="text-4xl font-bold" style={{ color: isDark ? colors.lemonade : colors.electric }}>{result.stats.wpm}</p>
            <p className="text-xs mt-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>WPM</p>
          </div>
          <div className="rounded-2xl p-6 text-center" style={cardStyle}>
            <p className="text-sm mb-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Accuracy</p>
            <p className="text-4xl font-bold" style={{ color: result.stats.accuracy >= 95 ? colors.lemonadeDark : result.stats.accuracy >= 85 ? colors.sky : colors.coral }}>
              {result.stats.accuracy}%
            </p>
            <p className="text-xs mt-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Correct</p>
          </div>
          <div className="rounded-2xl p-6 text-center" style={cardStyle}>
            <p className="text-sm mb-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Raw Speed</p>
            <p className="text-4xl font-bold" style={{ color: colors.lavender }}>{result.stats.rawWpm}</p>
            <p className="text-xs mt-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>WPM (incl. errors)</p>
          </div>
          <div className="rounded-2xl p-6 text-center" style={cardStyle}>
            <p className="text-sm mb-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Rating</p>
            <p className={`text-2xl font-bold ${ratingColor}`}>{rating}</p>
            <p className="text-xs mt-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Performance</p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="rounded-2xl p-6 mb-8" style={cardStyle}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: isDark ? colors.dark.text : colors.light.text }}>Detailed Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
              <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Correct Characters</p>
              <p className="text-xl font-bold" style={{ color: colors.lemonadeDark }}>{result.stats.correctChars}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
              <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Incorrect Characters</p>
              <p className="text-xl font-bold" style={{ color: colors.coral }}>{result.stats.incorrectChars}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
              <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Total Characters</p>
              <p className="text-xl font-bold" style={{ color: isDark ? colors.dark.text : colors.light.text }}>{result.stats.totalChars}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
              <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Time Elapsed</p>
              <p className="text-xl font-bold" style={{ color: isDark ? colors.dark.text : colors.light.text }}>{minutes}m {seconds}s</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
              <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Mode</p>
              <p className="text-xl font-bold capitalize" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
                {result.mode}{result.pdfUsed ? ' (PDF)' : ''}
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
              <p className="text-xs mb-1" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>Duration</p>
              <p className="text-xl font-bold" style={{ color: isDark ? colors.dark.text : colors.light.text }}>{result.duration} min</p>
            </div>
          </div>
        </div>

        {/* Performance Guide */}
        <div 
          className="rounded-2xl p-6 mb-8"
          style={{
            backgroundColor: isDark ? `${colors.dark.bgTertiary}50` : `${colors.light.bgTertiary}50`,
            border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: isDark ? colors.dark.text : colors.light.text }}>Performance Guide</h3>
          <div className="space-y-3">
            {[
              { name: 'Expert', range: '80+ WPM, 97%+ accuracy', color: colors.lemonadeDark },
              { name: 'Advanced', range: '60-79 WPM, 95%+ accuracy', color: colors.sky },
              { name: 'Intermediate', range: '40-59 WPM, 90%+ accuracy', color: colors.lemonade },
              { name: 'Developing', range: '25-39 WPM, 85%+ accuracy', color: colors.lavender },
              { name: 'Beginner', range: 'Under 25 WPM', color: colors.coral }
            ].map((level) => (
              <div 
                key={level.name}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{
                  backgroundColor: rating === level.name ? `${level.color}15` : (isDark ? colors.dark.bgTertiary : colors.light.bgTertiary),
                  border: rating === level.name ? `1px solid ${level.color}40` : '1px solid transparent'
                }}
              >
                <span className="font-medium" style={{ color: level.color }}>{level.name}</span>
                <span className="text-sm" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>{level.range}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetake}
            className="px-8 py-3.5 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95"
            style={{
              background: isDark 
                ? `linear-gradient(135deg, ${colors.lemonade}, ${colors.lemonadeDark})`
                : `linear-gradient(135deg, ${colors.electric}, ${colors.electricMedium})`,
              color: isDark ? colors.electric : colors.lemonade,
              boxShadow: isDark ? `0 10px 30px ${colors.lemonade}30` : `0 10px 30px ${colors.electric}30`
            }}
          >
            🔄 Retake Test
          </button>
          <button
            onClick={onViewHistory}
            className="px-8 py-3.5 rounded-xl font-semibold transition-all"
            style={{
              border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
              color: isDark ? colors.dark.text : colors.light.text
            }}
          >
            📊 View History
          </button>
          <button
            onClick={onHome}
            className="px-8 py-3.5 rounded-xl font-semibold transition-all"
            style={{
              border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
              color: isDark ? colors.dark.text : colors.light.text
            }}
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}
