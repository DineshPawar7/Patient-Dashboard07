import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'https://patient-dashboard7.netlify.app', 
  credentials: true
}));
app.use(express.json()); 

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/data', dataRoutes); 

app.get('/', (req, res) => {
  res.send('Acme Patient Dashboard API is running!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});