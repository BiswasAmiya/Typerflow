// Local storage management for test results
import { TestResult } from './calculations';

const STORAGE_KEY = 'typeflow_results';
const USER_KEY = 'typeflow_user';

export interface UserData {
  name: string;
  email: string;
  sessionToken: string;
}

// Save test result
export function saveResult(result: TestResult): void {
  try {
    const results = getResults();
    results.push(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch (e) {
    console.error('Failed to save result:', e);
  }
}

// Get all results
export function getResults(): TestResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to get results:', e);
    return [];
  }
}

// Get results for specific user
export function getUserResults(email: string): TestResult[] {
  return getResults().filter(r => r.email === email);
}

// Save user data
export function saveUser(user: UserData): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user:', e);
  }
}

// Get user data
export function getUser(): UserData | null {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to get user:', e);
    return null;
  }
}

// Clear user data
export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
}

// Clear all results
export function clearResults(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Get best WPM for user
export function getBestWPM(email: string): number {
  const results = getUserResults(email);
  if (results.length === 0) return 0;
  return Math.max(...results.map(r => r.stats.wpm));
}

// Get average stats for user
export function getAverageStats(email: string): { avgWpm: number; avgAccuracy: number; totalTests: number } {
  const results = getUserResults(email);
  if (results.length === 0) return { avgWpm: 0, avgAccuracy: 0, totalTests: 0 };
  
  const avgWpm = Math.round(results.reduce((sum, r) => sum + r.stats.wpm, 0) / results.length);
  const avgAccuracy = Math.round(results.reduce((sum, r) => sum + r.stats.accuracy, 0) / results.length * 100) / 100;
  
  return { avgWpm, avgAccuracy, totalTests: results.length };
}
