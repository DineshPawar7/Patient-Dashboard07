import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const mockUser = {
  id: 'dinesh',
  email: 'dinesh@pawar.com',
  password: 'dinesh123', 
  name: 'Dinesh Pawar',
  goalWeightKg: 70,
  heightCm: 175
};


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
   
    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email, name: mockUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '12h' } 
    );

    res.json({
      token,
      user: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        goalWeightKg: mockUser.goalWeightKg,
        heightCm: mockUser.heightCm,
      },
    });
    
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

import protect from '../middleware/authMiddleware.js'; 
router.get('/me', protect, (req, res) => {
   
    if (req.user.id === mockUser.id) { 
        res.json({
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            goalWeightKg: mockUser.goalWeightKg,
            heightCm: mockUser.heightCm,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});


export default router;