const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//import routers
const usersRouter = require('./routes/api/users');
const postsRouter = require('./routes/api/posts');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//define routers
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
