# ⌨️ TypeFlow - Free Typing Speed Test

A modern, responsive typing test website built with React, TypeScript, and Tailwind CSS. Test your typing speed and accuracy with two modes: Screen Mode and Paper Mode.

![TypeFlow](https://img.shields.io/badge/TypeFlow-Typing%20Test-indigo?style=for-the-badge)
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
- **🔒 Privacy First** - All data stored locally, no server needed
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **🛡️ Security** - Input validation, XSS prevention, rate limiting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/typeflow.git
cd typeflow

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

## 🌐 Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Create a new GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TypeFlow typing test"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in your repository:**
   - Go to your repo → **Settings** → **Pages**
   - Under "Build and deployment" → **Source**, select **GitHub Actions**

3. **Push to main branch** - The workflow will automatically build and deploy!

4. **Your site will be live at:**
   - `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Manual Deployment (Alternative)

If you prefer to deploy manually using the `gh-pages` package:

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

## 🏗️ Project Structure

```
typeflow/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   └── 404.html                # SPA redirect for GitHub Pages
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.tsx   # User registration form
│   │   ├── TestSetup.tsx       # Mode & duration selection
│   │   ├── TypingTest.tsx      # Core typing test engine
│   │   ├── Results.tsx         # Test results display
│   │   └── History.tsx         # Past results history
│   ├── utils/
│   │   ├── textPassages.ts     # Typing test content
│   │   ├── calculations.ts     # WPM/accuracy calculations
│   │   ├── validation.ts       # Input validation & security
│   │   └── storage.ts          # LocalStorage management
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template with SPA redirect
├── vite.config.js              # Vite configuration
└── package.json
```

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

## 📝 License

MIT License - Free to use, modify, and distribute.

---

Built with ❤️ for typing enthusiasts everywhere.
