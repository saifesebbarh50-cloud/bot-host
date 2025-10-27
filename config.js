module.exports = {
  PORT: 3000,
  MONGO_URI: "mongodb://localhost:27017/saifhosting", // replace with your MongoDB Atlas URI
  SESSION_SECRET: "replace_with_session_secret",
  JWT_SECRET: "Kc2fP2O4ZjnrxDm-WLxQoRXuIqfXUPO7",
  DISCORD_CLIENT_ID: "1417083810230698034",
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || "Kc2fP2O4ZjnrxDm-WLxQoRXuIqfXUPO7",
  DISCORD_CALLBACK_URL: "https://saif-hosting.onrender.com/auth/discord/callback",
  FRONTEND_URL: "https://saif-hosting.onrender.com",
  MAX_CPU_PER_USER: 200,
  DEFAULT_STORAGE_GB: 6
};
