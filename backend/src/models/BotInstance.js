const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BotSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  runtime: { type: String, enum: ['node','python'], default: 'node' },
  startFile: { type: String, default: 'index.js' },
  cpuShares: { type: Number, default: 50 },
  memoryMB: { type: Number, default: 256 },
  storageGB: { type: Number, default: 6 },
  containerId: String,
  hostDir: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('BotInstance', BotSchema);
