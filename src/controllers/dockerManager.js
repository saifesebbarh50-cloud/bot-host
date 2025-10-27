const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // creates directory for bot and returns metadata
  createBotInstanceFileSpace: async ({ ownerId, botName }) => {
    const id = uuidv4().split('-')[0];
    const hostDir = path.join(__dirname, '..', '..', 'storage', id);
    fs.mkdirSync(hostDir, { recursive: true });
    return { id, hostDir };
  },
  removeHostDir: async (hostDir) => {
    try { fs.rmSync(hostDir, { recursive: true, force: true }); return true; } catch(e){ return false; }
  }
};
