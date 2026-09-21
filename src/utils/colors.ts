// TypeSmooth Color Palette
// Based on Electric (#03045E) and Lemonade (#B8FB3C)

export const colors = {
  // Primary colors
  electric: '#03045E',        // Deep navy blue
  lemonade: '#B8FB3C',        // Bright yellow-green
  
  // Electric shades (for dark mode backgrounds & primary elements)
  electricLight: '#0A0B2E',   // Lighter navy for backgrounds
  electricMedium: '#023E8A',  // Medium blue for secondary elements
  electricBright: '#0077B6',  // Bright blue for accents
  
  // Lemonade shades (for highlights & accents)
  lemonadeLight: '#D4FF6B',   // Lighter lemonade
  lemonadeDark: '#8BC420',    // Darker lemonade for contrast
  
  // Complementary colors (from color wheel)
  coral: '#FF6B6B',           // Red-orange for errors/warnings
  lavender: '#9D4EDD',        // Purple for special accents
  sky: '#90E0EF',             // Light blue for info
  
  // Neutrals for dark mode
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
  
  // Neutrals for light mode
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
