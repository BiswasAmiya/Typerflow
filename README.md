# ⌨️ TypeSmooth - Free Typing Speed Test

A modern, responsive typing test website built with React, TypeScript, and Tailwind CSS. Test your typing speed and accuracy with two modes: Screen Mode and Paper Mode. Features a beautiful Electric & Lemonade color scheme with day/night mode toggle.

![TypeSmooth](https://img.shields.io/badge/TypeSmooth-Typing%20Test-03045E?style=for-the-badge&labelColor=B8FB3C)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan?style=for-the-badge&logo=tailwindcss)

## ✨ Features

- **🖥️ Screen Mode** - Text displayed on screen, type along
- **📄 Paper Mode** - Type from printed/written paper (text hidden on screen)
- **⏱️ Multiple Timers** - 10, 15, or 20 minute tests
- **📊 Real-time Stats** - Live WPM, accuracy, and error tracking
- **🏆 Performance Ratings** - Beginner to Expert classification
- **📈 History Tracking** - View all past test results
- **🌓 Day/Night Mode** - Toggle between light and dark themes
- **🎨 Electric & Lemonade Theme** - Beautiful color scheme (#03045E & #B8FB3C)
- **🔒 Privacy First** - All data stored locally, no server needed
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **🛡️ Security** - Input validation, XSS prevention, rate limiting

## 🎨 Color Scheme

TypeSmooth uses a distinctive Electric & Lemonade color palette:

- **Electric** `#03045E` - Deep navy blue (primary dark mode color)
- **Lemonade** `#B8FB3C` - Bright yellow-green (accent/highlight color)
- **Complementary Colors** - Coral, Lavender, and Sky for various UI elements

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/typesmooth.git
cd typesmooth

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🌐 Deploy to Vercel (Recommended)

This project is configured for easy deployment on Vercel.

### Quick Deploy:

1. **Push your code to GitHub**
2. **Go to [vercel.com/new](https://vercel.com/new)**
3. **Import your repository**
4. **Click Deploy** - Vercel auto-detects everything!

Your site will be live at: `https://typesmooth.vercel.app`

### Alternative: GitHub Pages

Also configured for GitHub Pages deployment via GitHub Actions:

1. Go to your repo → **Settings** → **Pages**
2. Under "Build and deployment" → **Source**, select **GitHub Actions**
3. Push to main branch - auto-deploys!

## 🏗️ Project Structure

```
typesmooth/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   └── 404.html                # SPA redirect for GitHub Pages
├── src/
│   ├── components/
│   │   ├── History.tsx         # Past results history
│   │   ├── Results.tsx         # Test results display
│   │   ├── TestSetup.tsx       # Mode & duration selection
│   │   ├── ThemeToggle.tsx     # Day/Night mode toggle
│   │   ├── TypeSmoothIcon.tsx  # Custom SVG icon
│   │   ├── TypingTest.tsx      # Core typing test engine
│   │   └── WelcomeScreen.tsx   # User registration form
│   ├── context/
│   │   └── ThemeContext.tsx    # Theme provider & hook
│   ├── utils/
│   │   ├── calculations.ts     # WPM/accuracy calculations
│   │   ├── colors.ts           # Color palette constants
│   │   ├── storage.ts          # LocalStorage management
│   │   ├── textPassages.ts     # Typing test content
│   │   └── validation.ts       # Input validation & security
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── vercel.json                 # Vercel configuration
├── netlify.toml                # Netlify configuration (backup)
├── vite.config.js              # Vite configuration
└── package.json
```

## 🌓 Theme System

TypeSmooth features a comprehensive day/night mode system:

- **Dark Mode** (default) - Electric blue background with Lemonade accents
- **Light Mode** - Clean white background with Electric blue text
- **Persistent** - Theme preference saved in localStorage
- **Smooth Transitions** - Animated color changes throughout the UI

## 🔒 Security Features

- **Input Sanitization** - All user inputs are sanitized against XSS
- **Email Validation** - Proper email format validation
- **Rate Limiting** - Prevents abuse with submission rate limits
- **Content Security** - Typing input restricted to safe characters
- **Session Tokens** - Cryptographically secure session management
- **Local Storage** - No data sent to external servers

## 📊 How Scoring Works

| Rating | WPM | Accuracy |
|--------|-----|----------|
| 🟢 Expert | 80+ | 97%+ |
| 🔵 Advanced | 60-79 | 95%+ |
| 🟡 Intermediate | 40-59 | 90%+ |
| 🟠 Developing | 25-39 | 85%+ |
| 🔴 Beginner | <25 | <85% |

- **WPM** = (Correct Characters ÷ 5) ÷ Time in Minutes
- **Accuracy** = (Correct Characters ÷ Total Characters) × 100
- Standard word length: 5 characters (including spaces)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS 4** - Utility-first styling
- **LocalStorage** - Client-side data persistence
- **GitHub Actions** - CI/CD deployment
- **Vercel** - Hosting platform

## 📝 License

MIT License - Free to use, modify, and distribute.

---

Built with ❤️ for typing enthusiasts everywhere.
