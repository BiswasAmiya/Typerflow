import { useState } from 'react';
import { getAverageStats, getBestWPM } from '../utils/storage';

interface TestSetupProps {
  userName: string;
  userEmail: string;
  onStart: (mode: 'screen' | 'paper', duration: number) => void;
  onLogout: () => void;
  onViewHistory: () => void;
}

export default function TestSetup({ userName, userEmail, onStart, onLogout, onViewHistory }: TestSetupProps) {
  const [mode, setMode] = useState<'screen' | 'paper'>('screen');
  const [duration, setDuration] = useState<number>(10);

  const avgStats = getAverageStats(userEmail);
  const bestWpm = getBestWPM(userEmail);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between py-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">TypeFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onViewHistory}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-lg hover:border-gray-500 transition-all"
            >
              📊 History
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm text-gray-400 hover:text-red-400 transition-all"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Welcome */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-indigo-400">{userName}</span>!
          </h2>
          <p className="text-gray-400">Choose your test settings and start typing</p>
        </div>

        {/* Stats Cards */}
        {avgStats.totalTests > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">Total Tests</p>
              <p className="text-3xl font-bold text-white">{avgStats.totalTests}</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">Avg WPM</p>
              <p className="text-3xl font-bold text-indigo-400">{avgStats.avgWpm}</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-sm mb-1">Best WPM</p>
              <p className="text-3xl font-bold text-emerald-400">{bestWpm}</p>
            </div>
          </div>
        )}

        {/* Mode Selection */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Select Mode</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setMode('screen')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                mode === 'screen'
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                  : 'border-gray-700 hover:border-gray-500 bg-gray-900/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🖥️</span>
                <h4 className="text-lg font-semibold text-white">Screen Mode</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Text is displayed on screen. Read and type it. Perfect for practice and improving speed.
              </p>
              {mode === 'screen' && (
                <div className="mt-3 text-indigo-400 text-sm font-medium">✓ Selected</div>
              )}
            </button>

            <button
              onClick={() => setMode('paper')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                mode === 'paper'
                  ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                  : 'border-gray-700 hover:border-gray-500 bg-gray-900/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📄</span>
                <h4 className="text-lg font-semibold text-white">Paper Mode</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Text is NOT shown on screen. Type from a printed paper or memorized text. Tests real typing skill.
              </p>
              {mode === 'paper' && (
                <div className="mt-3 text-purple-400 text-sm font-medium">✓ Selected</div>
              )}
            </button>
          </div>
        </div>

        {/* Duration Selection */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Select Duration</h3>
          <div className="grid grid-cols-3 gap-4">
            {[10, 15, 20].map((mins) => (
              <button
                key={mins}
                onClick={() => setDuration(mins)}
                className={`p-5 rounded-xl border-2 transition-all ${
                  duration === mins
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                    : 'border-gray-700 hover:border-gray-500 bg-gray-900/30'
                }`}
              >
                <p className="text-3xl font-bold text-white mb-1">{mins}</p>
                <p className="text-gray-400 text-sm">minutes</p>
                {duration === mins && (
                  <div className="mt-2 text-indigo-400 text-xs font-medium">✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={() => onStart(mode, duration)}
            className="px-12 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25"
          >
            🚀 Start Test ({duration} min - {mode} mode)
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-10 bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            How it works
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5">•</span>
              <span><strong>Screen Mode:</strong> A text passage appears on screen. Type it exactly as shown. Your speed and accuracy are tracked in real-time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span><strong>Paper Mode:</strong> Print or write the given text on paper before starting. The screen will be blank — type from your paper reference.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">•</span>
              <span><strong>Results:</strong> At the end, you'll see your WPM (words per minute), accuracy percentage, and detailed statistics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">•</span>
              <span><strong>Tip:</strong> Focus on accuracy first, speed will naturally improve with practice!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
