const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const helmet = require('helmet')
const cors = require('cors');
// const path = require('path');
require('dotenv').config();
require('./config/jwt.config')(passport);
require('./models/associations');

const app = express();
const port = process.env.PORT || 3000;

// Initialize express
app.use(express.json());

// Express setup
app.use(express.urlencoded({extended: true}));
app.set("trust proxy", 1);
app.use(cookieParser());
app.use('*', cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https:", "data:"],
      "frame-src": ["'self'", "https://www.youtube.com", "https://youtube.com"],
      "script-src": ["'self'", "https://www.youtube.com", "https://s.ytimg.com"],
      "child-src": ["'self'", "https://www.youtube.com", "https://youtube.com"],
    }
  })
);

// Logger
const morgan = require('./middlewares/morgan');
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

// API routes
const usersRoutes = require('./routes/users.routes');
const postsRoutes = require('./routes/posts.routes');
const commentsRoutes = require('./routes/comments.routes');
const likesRoutes = require('./routes/likes.routes');
const followsRoutes = require('./routes/follows.routes');

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/follows', followsRoutes);

// Auth routes
const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
});
