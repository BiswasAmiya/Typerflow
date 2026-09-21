import { useState } from 'react';
import { TestResult, getPerformanceRating, getPerformanceColor } from '../utils/calculations';
import { getUserResults, clearResults } from '../utils/storage';

interface HistoryProps {
  userEmail: string;
  onBack: () => void;
}

export default function History({ userEmail, onBack }: HistoryProps) {
  const [results, setResults] = useState<TestResult[]>(getUserResults(userEmail));
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClear = () => {
    clearResults();
    setResults([]);
    setShowClearConfirm(false);
  };

  // Sort by date, newest first
  const sortedResults = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate overall stats
  const totalTests = results.length;
  const avgWpm = totalTests > 0 ? Math.round(results.reduce((sum, r) => sum + r.stats.wpm, 0) / totalTests) : 0;
  const avgAccuracy = totalTests > 0 ? Math.round(results.reduce((sum, r) => sum + r.stats.accuracy, 0) / totalTests * 100) / 100 : 0;
  const bestWpm = totalTests > 0 ? Math.max(...results.map(r => r.stats.wpm)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-4">
      <div className="max-w-5xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Test History</h1>
            <p className="text-gray-400">Your typing test results</p>
          </div>
          <div className="flex items-center gap-3">
            {results.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-4 py-2 text-sm text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all"
              >
                🗑️ Clear All
              </button>
            )}
            <button
              onClick={onBack}
              className="px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg hover:border-gray-500 transition-all"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        {totalTests > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">Total Tests</p>
              <p className="text-3xl font-bold text-white">{totalTests}</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">Avg WPM</p>
              <p className="text-3xl font-bold text-indigo-400">{avgWpm}</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">Avg Accuracy</p>
              <p className="text-3xl font-bold text-emerald-400">{avgAccuracy}%</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">Best WPM</p>
              <p className="text-3xl font-bold text-yellow-400">{bestWpm}</p>
            </div>
          </div>
        )}

        {/* Results Table */}
        {sortedResults.length > 0 ? (
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-7 gap-4 p-4 bg-gray-900/50 text-xs font-medium text-gray-400 uppercase tracking-wider">
              <span>Date</span>
              <span>Mode</span>
              <span>Duration</span>
              <span>WPM</span>
              <span>Accuracy</span>
              <span>Errors</span>
              <span>Rating</span>
            </div>
            
            {/* Table Rows */}
            {sortedResults.map((result, index) => {
              const rating = getPerformanceRating(result.stats.wpm, result.stats.accuracy);
              const ratingColor = getPerformanceColor(rating);
              const date = new Date(result.date);
              
              return (
                <div
                  key={result.id}
                  className={`grid grid-cols-2 md:grid-cols-7 gap-4 p-4 items-center border-t border-gray-700/30 hover:bg-gray-700/20 transition-all ${
                    index === 0 ? 'bg-indigo-500/5' : ''
                  }`}
                >
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-white text-sm font-medium">
                      {date.toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                      result.mode === 'screen' 
                        ? 'bg-indigo-500/20 text-indigo-300' 
                        : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {result.mode === 'screen' ? '🖥️' : '📄'} {result.mode}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300 text-sm">{result.duration} min</span>
                  </div>
                  <div>
                    <span className="text-indigo-400 font-bold text-lg">{result.stats.wpm}</span>
                    <span className="text-gray-500 text-xs ml-1">wpm</span>
                  </div>
                  <div>
                    <span className={`font-medium ${
                      result.stats.accuracy >= 95 ? 'text-emerald-400' : 
                      result.stats.accuracy >= 85 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {result.stats.accuracy}%
                    </span>
                  </div>
                  <div>
                    <span className="text-red-400 text-sm">{result.stats.incorrectChars}</span>
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
            <h3 className="text-xl font-semibold text-white mb-2">No tests yet</h3>
            <p className="text-gray-400 mb-6">Complete a typing test to see your results here</p>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              Take a Test →
            </button>
          </div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-xl font-bold text-white mb-2">Clear All History?</h3>
              <p className="text-gray-400 mb-6">This will permanently delete all your test results. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all"
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
