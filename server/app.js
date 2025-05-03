const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const MongoStore = require('connect-mongo');
const { connectDB } = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: `http://localhost:4200`,
    credentials: true,
}));

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 14,
        },
    })
);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('*', (req, res) => {
    res.send('This is a wildcard route');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));