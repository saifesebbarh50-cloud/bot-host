const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config');

const authRoutes = require('./src/routes/auth');
const apiRoutes = require('./src/routes/api');

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err=> console.error('MongoDB connection error:', err));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: config.SESSION_SECRET, resave:false, saveUninitialized:false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/', (req,res)=> res.json({ ok:true, message: 'Bot Hosting backend running' }));

const PORT = process.env.PORT || config.PORT;
app.listen(PORT, ()=> console.log('Server listening on', PORT));
