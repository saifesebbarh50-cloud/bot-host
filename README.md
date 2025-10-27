Bot Hosting - Full starter (Frontend + Backend)
- Frontend (Vite/React) in ./frontend
- Backend (Express/Mongo) in ./backend
- Edit backend/config.js to set your MongoDB URI and add DISCORD_CLIENT_SECRET in environment
- Start backend: cd backend && npm install && npm start
- Start frontend: cd frontend && npm install && npm run dev
Notes:
- File upload endpoint: POST /api/upload/:botId (field name: file)
- Create bot endpoint: POST /api/create { name, runtime, cpu, memoryMB }
- Storage and CPU quotas enforced server-side (basic checks). Adjust config.js to change limits.
- Docker operations are placeholder: you'll need a VPS with Docker to run containers per bot.
