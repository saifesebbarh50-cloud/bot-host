const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const config = require('../../config');

// Local
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done)=>{
  try {
    const u = await User.findOne({ email });
    if(!u) return done(null, false);
    const ok = await bcrypt.compare(password, u.passwordHash);
    if(!ok) return done(null, false);
    return done(null, u);
  } catch(e){ done(e); }
}));

// Discord
passport.use(new DiscordStrategy({
  clientID: config.DISCORD_CLIENT_ID,
  clientSecret: config.DISCORD_CLIENT_SECRET,
  callbackURL: config.DISCORD_CALLBACK_URL,
  scope: ['identify','email']
}, async (accessToken, refreshToken, profile, done)=>{
  try {
    let u = await User.findOne({ discordId: profile.id });
    if(!u) {
      u = new User({ discordId: profile.id, username: profile.username, email: (profile.email||undefined) });
      await u.save();
    }
    return done(null, u);
  } catch(e){ done(e); }
}));

passport.serializeUser((user, done)=> done(null, user.id));
passport.deserializeUser(async (id, done)=> { const u = await User.findById(id); done(null, u); });

// Endpoints
router.post('/register', async (req,res)=>{
  try{
    const { email, password, username } = req.body;
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ ok:false, error:'Email used' });
    const hash = await bcrypt.hash(password, 10);
    const u = new User({ email, passwordHash: hash, username });
    await u.save();
    req.login(u, ()=> res.json({ ok:true, user: { id:u._id, username:u.username } }));
  }catch(e){ console.error(e); res.status(500).json({ ok:false }); }
});

router.post('/login', passport.authenticate('local'), (req,res)=>{
  res.json({ ok:true, user: { id:req.user._id, username:req.user.username } });
});

router.get('/discord', passport.authenticate('discord'));
router.get('/discord/callback', passport.authenticate('discord', { failureRedirect: '/login' }), (req,res)=>{
  // redirect to frontend dashboard
  res.redirect((process.env.FRONTEND_URL||config.FRONTEND_URL) + '/dashboard');
});

router.get('/logout', (req,res)=>{ req.logout(()=>{}); res.json({ ok:true }); });

module.exports = router;
