import { TestResult, getPerformanceRating, getPerformanceColor } from '../utils/calculations';

interface ResultsProps {
  result: TestResult;
  onRetake: () => void;
  onHome: () => void;
  onViewHistory: () => void;
}

export default function Results({ result, onRetake, onHome, onViewHistory }: ResultsProps) {
  const rating = getPerformanceRating(result.stats.wpm, result.stats.accuracy);
  const ratingColor = getPerformanceColor(rating);
  
  const minutes = Math.floor(result.stats.timeElapsed / 60);
  const seconds = result.stats.timeElapsed % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-4">
            <span className="text-4xl">🏆</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Test Complete!</h1>
          <p className="text-gray-400">Here are your results, {result.name}</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Speed</p>
            <p className="text-4xl font-bold text-indigo-400">{result.stats.wpm}</p>
            <p className="text-gray-500 text-xs mt-1">WPM</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Accuracy</p>
            <p className={`text-4xl font-bold ${result.stats.accuracy >= 95 ? 'text-emerald-400' : result.stats.accuracy >= 85 ? 'text-yellow-400' : 'text-red-400'}`}>
              {result.stats.accuracy}%
            </p>
            <p className="text-gray-500 text-xs mt-1">Correct</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Raw Speed</p>
            <p className="text-4xl font-bold text-purple-400">{result.stats.rawWpm}</p>
            <p className="text-gray-500 text-xs mt-1">WPM (incl. errors)</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Rating</p>
            <p className={`text-2xl font-bold ${ratingColor}`}>{rating}</p>
            <p className="text-gray-500 text-xs mt-1">Performance</p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Detailed Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Correct Characters</p>
              <p className="text-xl font-bold text-emerald-400">{result.stats.correctChars}</p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Incorrect Characters</p>
              <p className="text-xl font-bold text-red-400">{result.stats.incorrectChars}</p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Total Characters</p>
              <p className="text-xl font-bold text-white">{result.stats.totalChars}</p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Time Elapsed</p>
              <p className="text-xl font-bold text-white">{minutes}m {seconds}s</p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Mode</p>
              <p className="text-xl font-bold text-white capitalize">{result.mode}</p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Duration</p>
              <p className="text-xl font-bold text-white">{result.duration} min</p>
            </div>
          </div>
        </div>

        {/* Performance Guide */}
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Guide</h3>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-lg ${rating === 'Expert' ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-gray-900/30'}`}>
              <span className="text-emerald-400 font-medium">Expert</span>
              <span className="text-gray-400 text-sm">80+ WPM, 97%+ accuracy</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg ${rating === 'Advanced' ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-gray-900/30'}`}>
              <span className="text-blue-400 font-medium">Advanced</span>
              <span className="text-gray-400 text-sm">60-79 WPM, 95%+ accuracy</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg ${rating === 'Intermediate' ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-gray-900/30'}`}>
              <span className="text-yellow-400 font-medium">Intermediate</span>
              <span className="text-gray-400 text-sm">40-59 WPM, 90%+ accuracy</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg ${rating === 'Developing' ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-gray-900/30'}`}>
              <span className="text-orange-400 font-medium">Developing</span>
              <span className="text-gray-400 text-sm">25-39 WPM, 85%+ accuracy</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg ${rating === 'Beginner' ? 'bg-red-500/10 border border-red-500/30' : 'bg-gray-900/30'}`}>
              <span className="text-red-400 font-medium">Beginner</span>
              <span className="text-gray-400 text-sm">Under 25 WPM</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetake}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25"
          >
            🔄 Retake Test
          </button>
          <button
            onClick={onViewHistory}
            className="px-8 py-3.5 rounded-xl border border-gray-600 text-gray-300 font-semibold hover:bg-gray-800 transition-all"
          >
            📊 View History
          </button>
          <button
            onClick={onHome}
            className="px-8 py-3.5 rounded-xl border border-gray-600 text-gray-300 font-semibold hover:bg-gray-800 transition-all"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}
