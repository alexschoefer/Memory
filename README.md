# 🧠 Memory

A modern and responsive browser-based memory game built with **TypeScript**, **Vite**, and **SCSS**.

The application allows players to challenge their memory skills across multiple themed card collections while enjoying a clean user experience and responsive design. The project focuses on maintainable code architecture, modular styling, and modern frontend development practices.

---

# 🎮 Overview

Memory is a classic card-matching game where players reveal two cards at a time and attempt to find matching pairs.

The game features multiple themes, dedicated game screens, customizable settings, score tracking, and a game-over summary screen.

The game is currently optimized for desktop use.

Responsive layouts for tablets and mobile devices are planned for future releases.

---

# ✨ Features

## 🎴 Multiple Card Themes

Choose from various themed card collections:

- Coding
- Gaming
- Foods
- Projects

## ⚙️ Settings Screen

Configure your game experience before starting a match.

## 🎯 Interactive Gameplay

- Card matching mechanics
- Dynamic game states
- Visual feedback
- Smooth user interactions

## 📊 Score Tracking

Track your progress throughout the game and review your final results.

## 🏆 Game Over Screen

Displays game statistics and allows players to start a new round.

## 📱 Responsive Design

Optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Application Logic |
| Vite | Development Server & Build Tool |
| SCSS | Styling Architecture |
| HTML5 | Structure |
| CSS3 | Layout & Animations |

---

# 📂 Project Structure

```text
memory/
│
├── public/
│   │
│   ├── assets/
│   │   └── img/
│   │
│   ├── cards/
│   │   ├── basic/
│   │   ├── coding/
│   │   ├── foods/
│   │   ├── gaming/
│   │   └── projects/
│   │
│   ├── game/
│   ├── game-over/
│   ├── settings/
│   └── startpage/
│
├── src/
│   │
│   ├── styles/
│   │   ├── abstract/
│   │   │   ├── _variables.scss
│   │   │   └── _mixin.scss
│   │   │
│   │   ├── base/
│   │   │   ├── _basics.scss
│   │   │   └── _fonts.scss
│   │   │
│   │   ├── components/
│   │   │   ├── _buttons.scss
│   │   │   └── _card.scss
│   │   │
│   │   ├── layout/
│   │   │   └── _main.scss
│   │   │
│   │   ├── pages/
│   │   │   ├── _startpage.scss
│   │   │   ├── _settings.scss
│   │   │   ├── _game.scss
│   │   │   ├── _score.scss
│   │   │   └── _game_over.scss
│   │   │
│   │   ├── themes/
│   │   │   ├── _start_theme.scss
│   │   │   ├── _settings_theme.scss
│   │   │   ├── _game_theme.scss
│   │   │   └── _coding_theme.scss
│   │   │
│   │   └── style.scss
│   │
│   └── ts/
│       ├── pages/
│       │   ├── start.ts
│       │   ├── settings.ts
│       │   ├── game.ts
│       │   └── game-over.ts
│       │
│       ├── cardData.ts
│       └── main.ts
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

---

# 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/alexschoefer/Memory.git
```

Navigate into the project directory:

```bash
cd Memory
```

Install all dependencies:

```bash
npm install
```

---

# 💻 Development

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

# 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# 🎮 How to Play

1. Select a theme.
2. Start a new game.
3. Reveal two cards.
4. Match identical pairs.
5. Continue until all pairs have been found.
6. Review your final score on the game-over screen.

The objective is to complete the game with as few moves as possible.

---

# 🎨 Styling Architecture

The project follows a modular SCSS structure to keep styling maintainable and scalable.

## Abstract

Shared resources:

- Variables
- Mixins

## Base

Global styling:

- Typography
- Resets
- Base configurations

## Components

Reusable UI elements:

- Cards
- Buttons

## Layout

General page layouts and containers.

## Pages

Page-specific styles:

- Start Page
- Settings
- Game
- Score
- Game Over

## Themes

Theme-based (Coding, Gaming, DA Projects, Food) customizations for different sections and game modes.

---

# 🔧 Available Scripts

| Command | Description |
|----------|------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build |

---

# 📈 Future Improvements

Potential future enhancements include:

- Additional card themes
- Difficulty levels
- Timer mode
- Local high score system
- Achievements
- Multiplayer functionality
- Persistent game statistics

---

# 🤝 Contributing

Contributions are welcome.

If you would like to improve this project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

# 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Alex Schoefer**

Frontend Developer focused on modern web applications, TypeScript architecture, and interactive user experiences.