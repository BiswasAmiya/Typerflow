import { useState } from 'react';
import { exams, Exam } from '../data/exams';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../utils/colors';

interface ExamSelectionProps {
  onSelectExam: (exam: Exam, language: 'english' | 'hindi') => void;
  onBack: () => void;
}

export default function ExamSelection({ onSelectExam, onBack }: ExamSelectionProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi'>('english');

  const categories = [
    { id: 'all', name: 'All Exams', icon: '📋' },
    { id: 'ssc', name: 'SSC', icon: '🏛️' },
    { id: 'railway', name: 'Railway', icon: '🚂' },
    { id: 'state', name: 'State', icon: '🏢' },
    { id: 'defense', name: 'Defense', icon: '🛡️' },
    { id: 'medical', name: 'Medical', icon: '🏥' },
    { id: 'research', name: 'Research', icon: '🔬' }
  ];

  const filteredExams = selectedCategory === 'all' 
    ? exams 
    : exams.filter(exam => exam.category === selectedCategory);

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
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
              Competitive Exam Typing Tests
            </h1>
            <p style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
              Practice for government exam typing tests with exam-specific passages
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg transition-all"
            style={{
              border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
              color: isDark ? colors.dark.text : colors.light.text
            }}
          >
            ← Back to Home
          </button>
        </div>

        {/* Language Selection */}
        <div className="rounded-2xl p-6 mb-6" style={cardStyle}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
            Select Language
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedLanguage('english')}
              className="flex-1 p-4 rounded-xl border-2 transition-all"
              style={{
                borderColor: selectedLanguage === 'english' ? colors.primary.blue : (isDark ? colors.dark.border : colors.light.border),
                backgroundColor: selectedLanguage === 'english' ? `${colors.primary.blue}15` : 'transparent'
              }}
            >
              <div className="text-2xl mb-2">🇬🇧</div>
              <p className="font-semibold" style={{ color: isDark ? colors.dark.text : colors.light.text }}>English</p>
              <p className="text-xs" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                Available for all exams
              </p>
            </button>
            <button
              onClick={() => setSelectedLanguage('hindi')}
              className="flex-1 p-4 rounded-xl border-2 transition-all"
              style={{
                borderColor: selectedLanguage === 'hindi' ? colors.primary.yellow : (isDark ? colors.dark.border : colors.light.border),
                backgroundColor: selectedLanguage === 'hindi' ? `${colors.primary.yellow}15` : 'transparent'
              }}
            >
              <div className="text-2xl mb-2">🇮🇳</div>
              <p className="font-semibold" style={{ color: isDark ? colors.dark.text : colors.light.text }}>Hindi</p>
              <p className="text-xs" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                हिंदी में टाइपिंग
              </p>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="rounded-2xl p-6 mb-6" style={cardStyle}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  backgroundColor: selectedCategory === category.id 
                    ? colors.primary.blue
                    : (isDark ? colors.dark.bgTertiary : colors.light.bgTertiary),
                  color: selectedCategory === category.id 
                    ? colors.text.white 
                    : (isDark ? colors.dark.text : colors.light.text),
                  border: `1px solid ${selectedCategory === category.id ? colors.primary.blue : (isDark ? colors.dark.border : colors.light.border)}`
                }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map(exam => {
            const requirements = selectedLanguage === 'hindi' && exam.requirements.hindi 
              ? exam.requirements.hindi 
              : exam.requirements.english;
            
            const hasLanguageSupport = selectedLanguage === 'hindi' 
              ? !!exam.passages.hindi 
              : true;

            return (
              <div
                key={exam.id}
                className="rounded-2xl p-6 transition-all hover:scale-105"
                style={cardStyle}
              >
                <div className="text-4xl mb-3">{exam.logo}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
                  {exam.shortName}
                </h3>
                <p className="text-sm mb-4" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                  {exam.description}
                </p>
                
                <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary }}>
                  <p className="text-xs mb-2" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
                    Requirements:
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
                      Speed: <strong style={{ color: colors.primary.blue }}>{requirements.speed} {requirements.unit}</strong>
                    </span>
                    <span className="text-sm" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
                      Duration: <strong style={{ color: colors.primary.yellow }}>{requirements.duration} min</strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => hasLanguageSupport && onSelectExam(exam, selectedLanguage)}
                  disabled={!hasLanguageSupport}
                  className="w-full py-2.5 rounded-lg font-semibold transition-all"
                  style={{
                    backgroundColor: hasLanguageSupport ? colors.primary.yellow : colors.border.gray,
                    color: hasLanguageSupport ? colors.text.brown : colors.text.light,
                    cursor: hasLanguageSupport ? 'pointer' : 'not-allowed'
                  }}
                >
                  {hasLanguageSupport ? 'Start Practice →' : 'Not Available in Hindi'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: `${colors.primary.blue}15`, border: `1px solid ${colors.primary.blue}30` }}>
          <h4 className="font-semibold mb-3" style={{ color: isDark ? colors.dark.text : colors.light.text }}>
            💡 Tips for Exam Preparation
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}>
            <li>• Practice regularly to improve your typing speed and accuracy</li>
            <li>• Focus on accuracy first, speed will improve with practice</li>
            <li>• Use the same keyboard you'll use in the actual exam</li>
            <li>• Practice with exam-specific passages to get familiar with the content</li>
            <li>• Take timed tests to simulate exam conditions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
