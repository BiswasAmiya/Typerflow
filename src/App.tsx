import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import WelcomeScreen from './components/WelcomeScreen';
import TestSetup from './components/TestSetup';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import History from './components/History';
import ExamSelection from './components/ExamSelection';
import { TestResult } from './utils/calculations';
import { saveUser, getUser, clearUser, UserData } from './utils/storage';
import { generateSessionToken } from './utils/validation';
import { Exam } from './data/exams';

type Screen = 'welcome' | 'setup' | 'test' | 'results' | 'history' | 'examSelection';

interface AppState {
  screen: Screen;
  user: UserData | null;
  testMode: 'screen' | 'paper';
  testDuration: number;
  pdfText: string;
  lastResult: TestResult | null;
  testSessionId: number; // Forces component remount on retake
  selectedExam: Exam | null;
  selectedLanguage: 'english' | 'hindi';
}

function AppContent() {
  const [state, setState] = useState<AppState>({
    screen: 'welcome',
    user: null,
    testMode: 'screen',
    testDuration: 10,
    pdfText: '',
    lastResult: null,
    testSessionId: 0,
    selectedExam: null,
    selectedLanguage: 'english',
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
    setState(prev => ({ ...prev, testMode: mode, testDuration: duration, pdfText: pdfText || '', screen: 'test', testSessionId: prev.testSessionId + 1 }));
  };

  const handleTestComplete = (result: TestResult) => {
    setState(prev => ({ ...prev, lastResult: result, screen: 'results' }));
  };

  const handleRetake = () => {
    setState(prev => ({ ...prev, screen: 'test', testSessionId: prev.testSessionId + 1 }));
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
      testSessionId: 0,
      selectedExam: null,
      selectedLanguage: 'english',
    });
  };

  const handleQuitTest = () => {
    setState(prev => ({ ...prev, screen: 'setup' }));
  };

  const handleGoToExamSelection = () => {
    setState(prev => ({ ...prev, screen: 'examSelection' }));
  };

  const handleSelectExam = (exam: Exam, language: 'english' | 'hindi') => {
    const requirements = language === 'hindi' && exam.requirements.hindi 
      ? exam.requirements.hindi 
      : exam.requirements.english;
    
    setState(prev => ({
      ...prev,
      screen: 'test',
      selectedExam: exam,
      selectedLanguage: language,
      testMode: 'screen',
      testDuration: requirements.duration,
      testSessionId: prev.testSessionId + 1,
    }));
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
          onGoToExamSelection={handleGoToExamSelection}
        />
      ) : null;
    
    case 'examSelection':
      return (
        <ExamSelection
          onSelectExam={handleSelectExam}
          onBack={handleGoHome}
        />
      );
    
    case 'test':
      return state.user ? (
        <TypingTest
          key={state.testSessionId}
          userName={state.user.name}
          userEmail={state.user.email}
          mode={state.testMode}
          duration={state.testDuration}
          pdfText={state.pdfText}
          exam={state.selectedExam}
          language={state.selectedLanguage}
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
