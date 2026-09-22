import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import WelcomeScreen from './components/WelcomeScreen';
import TestSetup from './components/TestSetup';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import History from './components/History';
import { TestResult } from './utils/calculations';
import { saveUser, getUser, clearUser, UserData } from './utils/storage';
import { generateSessionToken } from './utils/validation';

type Screen = 'welcome' | 'setup' | 'test' | 'results' | 'history';

interface AppState {
  screen: Screen;
  user: UserData | null;
  testMode: 'screen' | 'paper';
  testDuration: number;
  pdfText: string;
  lastResult: TestResult | null;
}

function AppContent() {
  const [state, setState] = useState<AppState>({
    screen: 'welcome',
    user: null,
    testMode: 'screen',
    testDuration: 10,
    pdfText: '',
    lastResult: null,
  });

  // Check for existing user session
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setState(prev => ({ ...prev, user: savedUser, screen: 'setup' }));
    }
  }, []);

  const handleWelcomeSubmit = (name: string, email: string) => {
    const sessionToken = generateSessionToken();
    const userData: UserData = { name, email, sessionToken };
    saveUser(userData);
    setState(prev => ({ ...prev, user: userData, screen: 'setup' }));
  };

  const handleStartTest = (mode: 'screen' | 'paper', duration: number, pdfText?: string) => {
    setState(prev => ({ ...prev, testMode: mode, testDuration: duration, pdfText: pdfText || '', screen: 'test' }));
  };

  const handleTestComplete = (result: TestResult) => {
    setState(prev => ({ ...prev, lastResult: result, screen: 'results' }));
  };

  const handleRetake = () => {
    setState(prev => ({ ...prev, screen: 'test' }));
  };

  const handleGoHome = () => {
    setState(prev => ({ ...prev, screen: 'setup' }));
  };

  const handleViewHistory = () => {
    setState(prev => ({ ...prev, screen: 'history' }));
  };

  const handleLogout = () => {
    clearUser();
    setState({
      screen: 'welcome',
      user: null,
      testMode: 'screen',
      testDuration: 10,
      pdfText: '',
      lastResult: null,
    });
  };

  const handleQuitTest = () => {
    setState(prev => ({ ...prev, screen: 'setup' }));
  };

  // Render current screen
  switch (state.screen) {
    case 'welcome':
      return <WelcomeScreen onSubmit={handleWelcomeSubmit} />;
    
    case 'setup':
      return state.user ? (
        <TestSetup
          userName={state.user.name}
          userEmail={state.user.email}
          onStart={handleStartTest}
          onLogout={handleLogout}
          onViewHistory={handleViewHistory}
        />
      ) : null;
    
    case 'test':
      return state.user ? (
        <TypingTest
          userName={state.user.name}
          userEmail={state.user.email}
          mode={state.testMode}
          duration={state.testDuration}
          pdfText={state.pdfText}
          onComplete={handleTestComplete}
          onQuit={handleQuitTest}
        />
      ) : null;
    
    case 'results':
      return state.lastResult ? (
        <Results
          result={state.lastResult}
          onRetake={handleRetake}
          onHome={handleGoHome}
          onViewHistory={handleViewHistory}
        />
      ) : null;
    
    case 'history':
      return state.user ? (
        <History
          userEmail={state.user.email}
          onBack={handleGoHome}
        />
      ) : null;
    
    default:
      return <WelcomeScreen onSubmit={handleWelcomeSubmit} />;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
