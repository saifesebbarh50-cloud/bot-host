const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: { type: String, unique: true, sparse: true },
  passwordHash: String,
  discordId: { type: String, unique: true, sparse: true },
  username: String,
  createdAt: { type: Date, default: Date.now },
  plan: { type: String, default: 'free' },
  bots: [{ type: Schema.Types.ObjectId, ref: 'BotInstance' }],
  cpuUsed: { type: Number, default: 0 }, // sum of cpuShares for user's bots
  storageUsedBytes: { type: Number, default: 0 }
});
module.exports = mongoose.model('User', UserSchema);
