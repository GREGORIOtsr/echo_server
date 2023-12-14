const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const cors = require('cors');
const path = require('path')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize express
app.use(express.json());

// Express setup
app.use(express.urlencoded({extended: true}));
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
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

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);
app.use('/likes', likesRoutes);
app.use('/follows', followsRoutes);

app.listen(port, () => {
    console.log(`>Listening on port: http://localhost:${port}`);
});
