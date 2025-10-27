const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Bot = require('../models/BotInstance');
const dm = require('../controllers/dockerManager');
const config = require('../../config');

const upload = multer({ dest: path.join(__dirname, '..', '..', 'uploads') });

function ensureAuth(req,res,next){ if(!req.user) return res.status(401).json({ ok:false, error:'Unauthorized' }); next(); }

// Create bot - enforce CPU and storage rules
router.post('/create', ensureAuth, async (req,res)=>{
  try{
    const { name, runtime='node', cpu=50, memoryMB=256 } = req.body;
    // check CPU quota
    const user = await User.findById(req.user._id);
    const maxCpu = config.MAX_CPU_PER_USER || 200;
    if((user.cpuUsed + Number(cpu)) > maxCpu) return res.status(400).json({ ok:false, error:'CPU quota exceeded' });
    // create host dir
    const meta = await dm.createBotInstanceFileSpace({ ownerId: req.user._id, botName: name });
    const bot = new Bot({ owner: req.user._id, name, runtime, cpuShares: Number(cpu), memoryMB: Number(memoryMB), hostDir: meta.hostDir, containerId: meta.id, storageGB: config.DEFAULT_STORAGE_GB });
    await bot.save();
    user.bots.push(bot._id);
    user.cpuUsed += Number(cpu);
    await user.save();
    res.json({ ok:true, bot });
  }catch(e){ console.error(e); res.status(500).json({ ok:false, error:e.message }); }
});

// list bots
router.get('/list', ensureAuth, async (req,res)=>{
  const bots = await Bot.find({ owner: req.user._id });
  res.json({ ok:true, bots });
});

// upload file to bot directory (zip or any)
router.post('/upload/:botId', ensureAuth, upload.single('file'), async (req,res)=>{
  try{
    const bot = await Bot.findById(req.params.botId);
    if(!bot) return res.status(404).json({ ok:false, error:'Bot not found' });
    if(bot.owner.toString() !== req.user._id.toString()) return res.status(403).json({ ok:false, error:'Forbidden' });
    const file = req.file;
    // check storage limit (simple check using file size bytes)
    const maxBytes = bot.storageGB * 1024 * 1024 * 1024;
    if(file.size > maxBytes) { fs.unlinkSync(file.path); return res.status(400).json({ ok:false, error:'File exceeds storage limit for this bot' }); }
    // move file into hostDir and create directory if needed
    const dest = path.join(bot.hostDir, file.originalname);
    fs.renameSync(file.path, dest);
    // update user storageUsedBytes (rough)
    const user = await User.findById(req.user._id);
    user.storageUsedBytes += file.size;
    await user.save();
    res.json({ ok:true, path: dest });
  }catch(e){ console.error(e); res.status(500).json({ ok:false, error:e.message }); }
});

module.exports = router;
