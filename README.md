# Fitness Quest - Fitness RPG 🏋️‍♂️🎮

Fitness Quest is a full-stack "Fitness RPG" application that gamifies your fitness journey. Track your stats, sync with Fitbit, and level up your character as you hit your real-world health goals.

## 🚀 Recent Updates
- **Vite Migration**: The frontend has been migrated from Create React App to **Vite** for significantly faster build times and a smoother development experience.
- **Improved Authentication**: Migrated to standard ports (5173/5000) and optimized CORS/Cookie handling.
- **Third-Party Integrations**: Integrated **EmailJS** for direct, reliable contact form submissions.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Routing**: React Router DOM (v6)
- **Forms & Validation**: Formik + Yup
- **Charts**: Chart.js (react-chartjs-2)
- **Notifications**: React Hot Toast
- **Icons**: React Icons + FontAwesome
- **API Handling**: Axios (with centralized configuration)

### Backend
- **Framework**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens) with Secure HTTP-Only Cookies
- **File Storage**: Cloudinary (via Multer)
- **Integrations**: Fitbit Web API
- **Middleware**: Custom Authentication & Error Handling

## ✨ Key Features
- **RPG Dashboard**: View your fitness stats as character progression data.
- **Fitbit Sync**: Connect your Fitbit account to automatically import activity and step counts.
- **Visual Progress**: Dynamic charts showing your daily and weekly fitness trends.
- **Secure Profiles**: User accounts with profile picture uploads and bio management.
- **Contact System**: Direct communication using the integrate EmailJS service.

## 📂 Project Structure
```text
Fitness Project/
├── Client/              # React frontend (Vite)
│   ├── src/
│   │   ├── Component/   # UI Components & Pages
│   │   ├── api.jsx      # Centralized API Caller
│   │   └── index.jsx    # Entry Point
│   └── vite.config.js   # Vite Configuration
└── Server/              # Express backend
    ├── config/          # DB & CORS configuration
    ├── controller/      # Business logic
    ├── models/          # Mongoose schemas
    ├── Route/           # API endpoints
    └── index.js         # Entry Point
```

## ⚙️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas).

### 1. Server Setup
1. Navigate to the server folder:
   ```bash
   cd Server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   JWT_SECRET=your_secret
   MONGO_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   FITBIT_CLIENT_ID=...
   FITBIT_CLIENT_SECRET=...
   FITBIT_CALLBACK_URL=http://localhost:5000/api/dashboard/fitbit/callback
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### 2. Client Setup
1. Navigate to the client folder:
   ```bash
   cd Client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your EmailJS/API credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## 🌐 Access
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---
Developed with ❤️ for Fitness Enthusiasts.
