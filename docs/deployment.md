# Aux Wars – Deployment Guide

## Overview
This document outlines the steps and configurations needed to deploy the Aux Wars frontend and backend applications. It includes environment variable setup, hosting provider suggestions, and deployment commands.

---

## Environment Variables

| Variable        | Description                                  | Required For      |
|-----------------|----------------------------------------------|-------------------|
| `YOUTUBE_API_KEY` | API key for YouTube Data API (search videos) | Backend           |
| `FRONTEND_URL`  | URL where frontend is hosted (e.g., https://auxwars.vercel.app) | Backend           |
| `BACKEND_URL`   | URL where backend server is hosted (e.g., https://auxwars-backend.onrender.com) | Frontend          |

---

## Frontend Deployment

### Recommended Platforms
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

### Steps
1. Push your latest frontend code to GitHub.
2. Connect your GitHub repo to Vercel or Netlify.
3. Set build command:  `npm run build`
4. Set start command:  `node server.js` or if you use `nodemon` or `pm2`, specify accordingly.
5. Add environment variable `YOUTUBE_API_KEY` with your YouTube API key.
6. Add environment variable `FRONTEND_URL` with your frontend URL.
7. Deploy and verify backend is running.
8. Update frontend `VITE_BACKEND_URL` to point to your backend URL.

---

## Local Development Tips

- Use a `.env` file for environment variables locally:
```
YOUTUBE_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000
```

- Run backend with: `npm run dev`

- Run frontend with: `npm run dev`

---

## Troubleshooting

- **CORS Errors:**  
Ensure your backend allows requests from your frontend URL.

- **API Key Limits:**  
YouTube API keys have quotas. Monitor usage in Google Cloud Console.

- **Environment Variable Not Loading:**  
Double-check variable names and restart your server after changes.

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app/)
- [Heroku Dev Center](https://devcenter.heroku.com/)


