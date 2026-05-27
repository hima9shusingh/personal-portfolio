import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import certRoutes from './routes/certRoutes.js';
import authRoutes from './routes/authRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import errorHandler from './middleware/errorHandler.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── CORS ───────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or tools like Postman (no origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: Origin '${origin}' is not allowed.`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ─── BODY PARSERS ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── STATIC FILES ────────────────────────────────────────────────────────────
// Serve uploads directory statically for any assets (like resume.pdf)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ─── HEALTH CHECK ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Himanshu Kumar Singh — Portfolio API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      contact: '/api/contact',
      certifications: '/api/certifications',
      skills: '/api/skills',
      experience: '/api/experience',
      resume: '/api/resume',
    },
  });
});

// ─── API ROUTES ───────────────────────────────────────────────────────────────
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/certifications', certRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/resume', resumeRoutes);

// ─── 404 HANDLER ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─── GLOBAL ERROR HANDLER ────────────────────────────────────────────────────
app.use(errorHandler);

// ─── START SERVER ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}`);
  console.log(`🌐 CORS allowed origins: ${allowedOrigins.join(', ')}\n`);
});

export default app;
