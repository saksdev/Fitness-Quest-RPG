const cors = require('cors');

const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL, // Allow the deployed frontend URL (e.g., Vercel)
].filter(Boolean); // Remove undefined if CLIENT_URL is not set

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
