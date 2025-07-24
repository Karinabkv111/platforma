const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Подключаем модель

const app = express();

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myNewDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Мидлвар для обработки JSON (используй express.json())
app.use(express.json());  // Это заменяет body-parser

// Простая страница
app.get('/', (req, res) => {
  res.send('Welcome to the registration platform!');
});

// Маршрут регистрации
app.post('/register', async (req, res) => {
  const { username, password } = req.body;  // req.body должно содержать данные

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user' });
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
