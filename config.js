module.exports = {
  PORT: 3000,
  MONGO_URI: "mongodb://localhost:27017/saifhosting", // replace with your MongoDB Atlas URI
  SESSION_SECRET: "replace_with_session_secret",
  JWT_SECRET: "replace_with_jwt_secret",
  DISCORD_CLIENT_ID: "1417083810230698034",
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || "replace_here",
  DISCORD_CALLBACK_URL: "https://saif-hosting.onrender.com/auth/discord/callback",
  FRONTEND_URL: "https://saif-hosting.onrender.com",
  MAX_CPU_PER_USER: 200,
  DEFAULT_STORAGE_GB: 6
};
