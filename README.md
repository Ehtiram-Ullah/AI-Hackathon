# 🎮 Quiz Clash - Battle Royale

<div align="center">

![Quiz Clash](https://img.shields.io/badge/Quiz-Clash-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green?style=for-the-badge&logo=fastapi)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge)

**An immersive multiplayer quiz battle game powered by AI-generated questions**

[Features](#-features) • [Screenshots](#-screenshots) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

---

## 📖 About

**Quiz Clash - Battle Royale** is an engaging, real-time multiplayer quiz game where players compete against AI opponents in fast-paced question battles. The game features AI-generated multiple-choice questions using Google's Gemini AI, stunning 3D character animations, and a health-based combat system that makes learning fun and competitive.

### Key Highlights

- 🤖 **AI-Powered Questions**: Dynamic question generation using Google Gemini 2.5 Flash
- ⚔️ **Battle System**: Real-time health-based combat mechanics
- 🎨 **Stunning UI**: Beautiful animations with Framer Motion and GSAP
- 🎮 **3D Graphics**: Immersive character animations using React Three Fiber
- 📊 **Player Stats**: Track your progress, XP, coins, and level
- 🎯 **Topic Selection**: Choose from various subjects to challenge yourself
- 🎵 **Sound System**: Immersive audio experience with music controls

---

## ✨ Features

### 🎯 Core Gameplay
- **Player Registration**: Create your unique player profile
- **Matchmaking**: Find opponents and enter battle arenas
- **Real-time Battles**: Compete against AI opponents with health-based combat
- **Dynamic Questions**: AI-generated MCQ questions tailored to selected topics
- **Timer System**: 30-second countdown for each question
- **Scoring System**: Damage based on speed and accuracy

### 🎨 User Interface
- **Multiple Screens**: Registration, Menu, Matchmaking, Loading, Versus, and Match screens
- **Animated Transitions**: Smooth screen transitions and animations
- **Player Cards**: Visual representation of player and opponent stats
- **Health Bars**: Real-time health tracking during battles
- **Victory/Defeat Screens**: Dramatic game over screens with winner announcements

### 🤖 AI Integration
- **Google Gemini AI**: Powers intelligent question generation
- **Topic-Based Questions**: Generate questions on any selected subject
- **Structured Output**: Consistent JSON format for reliable parsing
- **Explanation Included**: Each question comes with detailed explanations

### 🎮 Character System
- **3D Animations**: Rich character animations for different states
- **Multiple Animation States**: Idle, Walk, Jump, Dash, Death animations
- **Directional Movement**: 8-directional sprite animations
- **Visual Effects**: Particle effects and dust animations

---

## 🖼️ Screenshots

_Coming soon - Add screenshots of the game interface here_

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn** package manager
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Step 1: Clone the Repository

```bash
git clone https://github.com/Ehtiram-Ullah/AI-Hackathon.git
cd AI-Hackathon
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd src/backend
pip install fastapi uvicorn google-genai typing-extensions
```

Or create a `requirements.txt` file:

```bash
# Create requirements.txt
cat > requirements.txt << EOF
fastapi
uvicorn[standard]
google-genai
typing-extensions
EOF

# Install dependencies
pip install -r requirements.txt
```

### Step 4: Configure API Keys

1. **Backend Configuration**: Update the Google Gemini API key in `src/backend/app.py`:
   ```python
   client = genai.Client(api_key="YOUR_GEMINI_API_KEY_HERE")
   ```

2. **Firebase Configuration** (if using): Set up your Firebase credentials in `src/lib/firebase.ts`

---

## 💻 Usage

### Starting the Backend Server

```bash
cd src/backend
uvicorn app:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

**API Endpoints:**
- `GET /` - Health check endpoint
- `POST /predict` - Generate MCQ questions (requires `{"topic": "your-topic"}` in request body)

### Starting the Frontend Development Server

In a new terminal:

```bash
# From project root
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port Vite assigns)

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **TypeScript** - Type safety
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library
- **GSAP 3.13.0** - Advanced animations
- **React Three Fiber 9.4.0** - 3D graphics
- **Three.js 0.180.0** - 3D library
- **Zustand 5.0.8** - State management
- **Firebase 12.4.0** - Backend services
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **Google Gemini AI** - AI question generation
- **Uvicorn** - ASGI server
- **Python 3.13.5** - Runtime

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
AI-Hackathon/
├── src/
│   ├── assets/
│   │   ├── character/          # Character sprites and animations
│   │   │   ├── Idle/
│   │   │   ├── Walk/
│   │   │   ├── Jump/
│   │   │   ├── Dash/
│   │   │   └── Death/
│   │   └── react.svg
│   ├── backend/
│   │   ├── app.py              # FastAPI backend server
│   │   └── model/
│   │       └── model.py
│   ├── components/
│   │   ├── 3d/
│   │   │   └── RealisticCharacter.tsx
│   │   ├── layout/
│   │   │   └── Background.tsx
│   │   └── ui/
│   │       ├── MenuButtons.tsx
│   │       ├── PlayerProfile.tsx
│   │       ├── QuickStats.tsx
│   │       ├── TopBar.tsx
│   │       └── TopicModel.tsx
│   ├── constants/
│   │   └── animations.ts       # Animation configurations
│   ├── context/
│   │   └── UserContext.tsx     # User context provider
│   ├── lib/
│   │   ├── ai.ts               # AI integration utilities
│   │   └── firebase.ts         # Firebase configuration
│   ├── screens/
│   │   ├── LoadingScreen.tsx
│   │   ├── MatchmakingScreen.tsx
│   │   ├── MatchScreen.tsx     # Main game screen
│   │   ├── MenuScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── VersusScreen.tsx
│   ├── services/
│   │   └── firebase_service.ts
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── public/
│   └── vite.svg
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🎮 Game Flow

1. **Registration Screen** → Player enters their name
2. **Menu Screen** → Player selects topic and starts matchmaking
3. **Matchmaking Screen** → Finding opponent...
4. **Loading Screen** → Preparing battle arena...
5. **Versus Screen** → Player vs Opponent showdown
6. **Match Screen** → Real-time quiz battle begins
7. **Game Over** → Winner announced, return to menu

---

## 🔧 Configuration

### Backend Configuration

The backend server runs on port `8000` by default. You can change this by modifying the uvicorn command:

```bash
uvicorn app:app --reload --port YOUR_PORT
```

### Frontend Configuration

The frontend connects to the backend API. Update the API URL in `src/lib/ai.ts` if your backend runs on a different port.

### CORS Configuration

The backend allows all origins in development. For production, update CORS settings in `src/backend/app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `uvicorn app:app --reload` - Start development server with hot reload
- `uvicorn app:app` - Start production server

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **Ehtiram Ullah** - [GitHub](https://github.com/Ehtiram-Ullah)

---

## 🙏 Acknowledgments

- **Google Gemini** - For AI-powered question generation
- **React Three Fiber** - For amazing 3D graphics capabilities
- **Framer Motion** - For smooth animations
- **FastAPI** - For the excellent Python framework
- **Vite** - For the lightning-fast build tool

---

## 📧 Support

If you encounter any issues or have questions:

- 🐛 [Report a Bug](https://github.com/Ehtiram-Ullah/AI-Hackathon/issues)
- 💡 [Request a Feature](https://github.com/Ehtiram-Ullah/AI-Hackathon/issues)
- 📖 [Documentation](https://github.com/Ehtiram-Ullah/AI-Hackathon#readme)

---

## 🎯 Roadmap

- [ ] Multiplayer support (real players)
- [ ] Leaderboard system
- [ ] More game modes
- [ ] Character customization
- [ ] Power-ups and special abilities
- [ ] Mobile app version
- [ ] Social features (friends, chat)

---

<div align="center">

**Made with ❤️ for AI Hackathon**

⭐ Star this repo if you find it helpful!

</div>
