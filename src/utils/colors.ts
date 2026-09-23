// TypeSmooth Color Palette - Based on typing.com design
// Clean, friendly, educational design

export const colors = {
  // Primary colors
  electric: '#03045E',        // Kept for theme toggle compatibility
  lemonade: '#B8FB3C',        // Kept for theme toggle compatibility
  
  // New typing.com-inspired colors
  primary: {
    yellow: '#FFCF46',        // rgb(255, 207, 70) - Primary brand color
    blue: '#3295DB',          // rgb(50, 149, 219) - Secondary brand color
    lightBlue: '#6FB2E6',     // rgb(111, 178, 230) - Accent blue
  },
  
  // Text colors
  text: {
    dark: '#4A4A4A',          // rgb(74, 74, 74) - Primary text
    brown: '#6D5825',         // rgb(109, 88, 37) - Button text on yellow
    white: '#FFFFFF',         // rgb(255, 255, 255)
    blue: '#2877AF',          // rgb(40, 119, 175) - Links/accents
    light: '#A9A9A9',         // rgb(169, 169, 169) - Muted text
  },
  
  // Surface colors
  surface: {
    white: '#FFFFFF',         // rgb(255, 255, 255)
    yellow: '#FFCF46',        // rgb(255, 207, 70)
    lightBlue: '#DEEEFC',     // rgb(222, 238, 252)
    blue: '#3295DB',          // rgb(50, 149, 219)
    lightGray: '#F7F7F7',     // rgb(247, 247, 247)
    overlay: 'rgba(0, 0, 0, 0.15)',
  },
  
  // Border colors
  border: {
    light: '#BCDDF8',         // rgb(188, 221, 248)
    medium: '#82C0F1',        // rgb(130, 192, 241)
    gray: '#D5D5D5',          // rgb(213, 213, 213)
  },
  
  // Status colors
  status: {
    success: '#4CAF50',       // Green for correct
    error: '#DC2626',         // Red for errors
    warning: '#F59E0B',       // Orange for warnings
    info: '#3B82F6',          // Blue for info
  },
  
  // Backward compatibility aliases
  coral: '#DC2626',           // Error red
  lemonadeDark: '#8BC420',    // Darker lemonade
  lavender: '#9D4EDD',        // Purple accent
  sky: '#90E0EF',             // Light blue
  electricMedium: '#023E8A',  // Medium blue
  
  // Legacy compatibility (for theme toggle)
  dark: {
    bg: '#03045E',
    bgSecondary: '#0A0B2E',
    bgTertiary: '#0F1035',
    card: 'rgba(10, 11, 46, 0.5)',
    border: 'rgba(184, 251, 60, 0.2)',
    text: '#FFFFFF',
    textSecondary: '#B8FB3C',
    textMuted: 'rgba(184, 251, 60, 0.6)',
  },
  
  light: {
    bg: '#F8F9FA',
    bgSecondary: '#FFFFFF',
    bgTertiary: '#E9ECEF',
    card: 'rgba(255, 255, 255, 0.8)',
    border: 'rgba(3, 4, 94, 0.2)',
    text: '#03045E',
    textSecondary: '#023E8A',
    textMuted: 'rgba(3, 4, 94, 0.6)',
  }
};
