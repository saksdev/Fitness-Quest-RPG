const cors = require('cors');

const corsOptions = {
    origin: 'https://fitnessquest-backend-wvi0.onrender.com',
    credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
