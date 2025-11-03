// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Log time', new Date());
  next();
});

app.use((req, res, next) => {
  console.log('request URL:', req.url);
  next();
});

// Get /get-error > Error('This is a forced error.')
app.get('/get-error', (req, res) => {
  throw new Error('This is a forced error.');
});

// Get /healthcheck > {message: 'Server is OK!'}
app.get('/healthcheck', (req, res) => {
  res.status(200).json({ message: 'Server is OK!' });
});

// Get /students > []

app.get('/students', (req, res) => {
  res.status(200).json([]);
});

// Get /students/:studentsid > {}

app.get('/students/:studentid', (req, res) => {
  const { studentid } = req.params;
  res.status(200).json({ id: studentid });
});

//  Post /students {name:, age:}> {}

app.post('/students', (req, res) => {
  // console.log(req.body);
  const newStudent = {
    id: Date.now(),
    onDuty: true,
    ...req.body,
  };
  res.status(201).json(newStudent);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  console.error('Error middleware:', err.message);
  res
    .status(500)
    .json({ error: isProd ? 'oops we have some error' : err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
