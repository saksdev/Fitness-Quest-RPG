const cors = require('cors');

const allowedOrigins = [
    process.env.FRONTEND_URL,
].filter(Boolean);

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
