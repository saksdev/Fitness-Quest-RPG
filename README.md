# Fitness Quest - Fitness RPG V2 🏋️‍♂️🎮

Fitness Quest V2 is a comprehensive "Fitness RPG" application that transforms your real-world health data into a gamified experience. Level up, earn gold, complete quests, and compete on the leaderboard!

## 🚀 What's New in V2?

- **Full RPG System**: Earn **XP** and **Gold** by being active. Level up your character and buy items in the **Shop**.
- **Quests & Rewards**: Complete challenges to earn rewards. Claim your **Daily Reward** to keep the streak going!
- **Multi-Integration**: Support for both **Fitbit** and **Google Fit** for maximum flexibility.
- **Admin Dashboard**: Manage users, quests, and rewards from a dedicated admin interface.
- **Vite-Powered**: Faster development and builds using Vite and a optimized proxy setup.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Modern, lightning-fast UI development.
- **Gamified UI**: Custom RPG-themed dashboard and components.
- **State & Routing**: React Router DOM (v6), Formik + Yup for data handling.
- **Visuals**: Chart.js for health trends, React Hot Toast for micro-interactions.

### Backend
- **Node.js & Express**: High-performance API architecture with standard `/api/` prefix.
- **MongoDB**: Flexible data modeling for RPG stats and user inventory.
- **OAuth 2.0**: Secure integrations with Google Fit and Fitbit.
- **Security**: JWT-based authentication with Secure HTTP-Only cookies.

## ✨ Key Features

- **🛡️ Character Stats**: Track Level, XP, Points, and Gold based on your fitness.
- **🏆 Leaderboard**: See how you rank against other fitness adventurers.
- **🎁 Rewards**: Open chests and claim daily bonuses for consistent activity.
- **🛒 RPG Shop**: Use your hard-earned gold to buy legendary items for your inventory.
- **📊 Health Sync**: Seamlessly sync steps, calories, and distance from major fitness platforms.

## 📂 Project Structure
```text
Fitness Project/
├── Client/              # React frontend (Vite)
│   ├── src/Component/   # RPG UI Components & Dashboard
│   └── vite.config.js   # Dev Server & Proxy Settings
└── Server/              # Express backend
    ├── Route/           # Multi-integration & RPG API Endpoints
    ├── models/User.js   # Expanded User Schema with RPG stats
    └── index.js         # Entry Point
```

## ⚙️ Setup Instructions

### 1. Server Setup
1. `cd Server`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your credentials (MongoDB, JWT, Cloudinary, Fitbit, Google).
4. `npm run dev`

### 2. Client Setup
1. `cd Client`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your EmailJS credentials.
4. `npm run dev`

---
Developed with ❤️ for the Fitness Community.
