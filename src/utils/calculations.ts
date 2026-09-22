// Typing test calculations

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number; // in seconds
  rawWpm: number;
  consistency: number;
}

export interface TestResult {
  id: string;
  name: string;
  email: string;
  mode: 'screen' | 'paper';
  duration: number; // in minutes
  pdfUsed?: boolean; // Whether a PDF was uploaded for paper mode
  stats: TypingStats;
  date: string;
  textTyped: string;
}

// Calculate Words Per Minute
// Standard: 1 word = 5 characters (including spaces)
export function calculateWPM(correctChars: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const words = correctChars / 5;
  const minutes = timeInSeconds / 60;
  return Math.round(words / minutes);
}

// Calculate Raw WPM (including errors)
export function calculateRawWPM(totalChars: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const words = totalChars / 5;
  const minutes = timeInSeconds / 60;
  return Math.round(words / minutes);
}

// Calculate accuracy percentage
export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 10000) / 100;
}

// Calculate consistency based on error distribution
export function calculateConsistency(wpmHistory: number[]): number {
  if (wpmHistory.length < 2) return 100;
  const avg = wpmHistory.reduce((a, b) => a + b, 0) / wpmHistory.length;
  const variance = wpmHistory.reduce((sum, wpm) => sum + Math.pow(wpm - avg, 2), 0) / wpmHistory.length;
  const stdDev = Math.sqrt(variance);
  const cv = (stdDev / avg) * 100;
  return Math.max(0, Math.round((100 - cv) * 100) / 100);
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Format time display
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Get performance rating
export function getPerformanceRating(wpm: number, accuracy: number): string {
  if (wpm >= 80 && accuracy >= 97) return 'Expert';
  if (wpm >= 60 && accuracy >= 95) return 'Advanced';
  if (wpm >= 40 && accuracy >= 90) return 'Intermediate';
  if (wpm >= 25 && accuracy >= 85) return 'Developing';
  return 'Beginner';
}

// Get performance color
export function getPerformanceColor(rating: string): string {
  switch (rating) {
    case 'Expert': return 'text-emerald-400';
    case 'Advanced': return 'text-blue-400';
    case 'Intermediate': return 'text-yellow-400';
    case 'Developing': return 'text-orange-400';
    default: return 'text-red-400';
  }
}
