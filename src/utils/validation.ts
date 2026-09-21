// Input validation and security utilities

// Sanitize input to prevent XSS attacks
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Validate name (2-50 characters, letters and spaces only)
export function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name.trim());
}

// Rate limiting - track submissions
const submissionTimestamps: number[] = [];
const MAX_SUBMISSIONS = 10;
const RATE_WINDOW = 60000; // 1 minute

export function isRateLimited(): boolean {
  const now = Date.now();
  // Remove old timestamps
  while (submissionTimestamps.length > 0 && submissionTimestamps[0] < now - RATE_WINDOW) {
    submissionTimestamps.shift();
  }
  return submissionTimestamps.length >= MAX_SUBMISSIONS;
}

export function recordSubmission(): void {
  submissionTimestamps.push(Date.now());
}

// Content Security - validate typing input
export function sanitizeTypingInput(input: string): string {
  // Allow only printable ASCII characters
  return input.replace(/[^\x20-\x7E\n]/g, '');
}

// Generate CSRF-like token for session
export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
