import React, { useState } from 'react';
import { sanitizeInput, isValidEmail, isValidName } from '../utils/validation';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../utils/colors';
import TypeSmoothIcon from './TypeSmoothIcon';
import ThemeToggle from './ThemeToggle';

interface WelcomeScreenProps {
  onSubmit: (name: string, email: string) => void;
}

export default function WelcomeScreen({ onSubmit }: WelcomeScreenProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ name: boolean; email: boolean }>({ name: false, email: false });

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!isValidName(name)) {
      newErrors.name = 'Name must be 2-50 characters (letters only)';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    
    if (validate()) {
      const sanitizedName = sanitizeInput(name.trim());
      const sanitizedEmail = sanitizeInput(email.trim().toLowerCase());
      onSubmit(sanitizedName, sanitizedEmail);
    }
  };

  const handleBlur = (field: 'name' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
      style={{
        background: isDark 
          ? `linear-gradient(135deg, ${colors.electric} 0%, ${colors.dark.bgSecondary} 50%, ${colors.electric} 100%)`
          : `linear-gradient(135deg, ${colors.light.bg} 0%, ${colors.light.bgTertiary} 50%, ${colors.light.bg} 100%)`
      }}
    >
      <div className="w-full max-w-md">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 transition-all duration-300"
            style={{
              background: isDark 
                ? `linear-gradient(135deg, ${colors.lemonade}20, ${colors.lemonade}10)`
                : `linear-gradient(135deg, ${colors.electric}20, ${colors.electric}10)`,
              border: `2px solid ${isDark ? colors.lemonade : colors.electric}40`,
              boxShadow: isDark 
                ? `0 8px 32px ${colors.lemonade}20`
                : `0 8px 32px ${colors.electric}20`
            }}
          >
            <TypeSmoothIcon size={48} />
          </div>
          <h1 
            className="text-5xl font-bold mb-2 transition-colors duration-300"
            style={{ color: isDark ? colors.lemonade : colors.electric }}
          >
            TypeSmooth
          </h1>
          <p 
            className="text-lg transition-colors duration-300"
            style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
          >
            Test your typing speed & accuracy
          </p>
          <p 
            className="text-sm mt-1 transition-colors duration-300"
            style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
          >
            Free to use • No sign-up required
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="rounded-2xl p-8 transition-all duration-300"
          style={{
            backgroundColor: isDark ? colors.dark.card : colors.light.card,
            border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
            backdropFilter: 'blur(20px)',
            boxShadow: isDark 
              ? `0 20px 60px rgba(0, 0, 0, 0.5)`
              : `0 20px 60px rgba(3, 4, 94, 0.1)`
          }}
        >
          <h2 
            className="text-xl font-semibold mb-6 transition-colors duration-300"
            style={{ color: isDark ? colors.dark.text : colors.light.text }}
          >
            Let's get started
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-1.5 transition-colors duration-300"
                style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary,
                  border: `1px solid ${touched.name && errors.name ? colors.coral : (isDark ? colors.dark.border : colors.light.border)}`,
                  color: isDark ? colors.dark.text : colors.light.text
                }}
                maxLength={50}
                autoComplete="name"
              />
              {touched.name && errors.name && (
                <p className="mt-1.5 text-sm flex items-center gap-1" style={{ color: colors.coral }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-1.5 transition-colors duration-300"
                style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: isDark ? colors.dark.bgTertiary : colors.light.bgTertiary,
                  border: `1px solid ${touched.email && errors.email ? colors.coral : (isDark ? colors.dark.border : colors.light.border)}`,
                  color: isDark ? colors.dark.text : colors.light.text
                }}
                maxLength={100}
                autoComplete="email"
              />
              {touched.email && errors.email && (
                <p className="mt-1.5 text-sm flex items-center gap-1" style={{ color: colors.coral }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: isDark 
                  ? `linear-gradient(135deg, ${colors.lemonade}, ${colors.lemonadeDark})`
                  : `linear-gradient(135deg, ${colors.electric}, ${colors.electricMedium})`,
                color: isDark ? colors.electric : colors.lemonade,
                boxShadow: isDark 
                  ? `0 10px 30px ${colors.lemonade}30`
                  : `0 10px 30px ${colors.electric}30`
              }}
            >
              Start Typing Test →
            </button>
          </form>

          {/* Security Notice */}
          <div 
            className="mt-6 flex items-center gap-2 text-xs transition-colors duration-300"
            style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Your data stays on your device. We respect your privacy.</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-3">
            <div className="text-2xl mb-1">⌨️</div>
            <p 
              className="text-xs transition-colors duration-300"
              style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
            >
              Screen & Paper Mode
            </p>
          </div>
          <div className="p-3">
            <div className="text-2xl mb-1">⏱️</div>
            <p 
              className="text-xs transition-colors duration-300"
              style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
            >
              10-20 Min Tests
            </p>
          </div>
          <div className="p-3">
            <div className="text-2xl mb-1">📊</div>
            <p 
              className="text-xs transition-colors duration-300"
              style={{ color: isDark ? colors.dark.textMuted : colors.light.textMuted }}
            >
              Detailed Analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
