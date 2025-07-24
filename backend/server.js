const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Импорт модели

const app = express();

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/myNewDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Middleware для обработки JSON
app.use(express.json());

// Маршрут регистрации
app.post('/register', (req, res) => {
  const { name, age, email, password } = req.body;

  // Хеширование пароля
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const newUser = new User({
      name,
      age,
      email,
      password: hashedPassword,
    });

    newUser.save()
      .then(() => res.status(201).json({ message: 'User registered successfully' }))
      .catch(error => res.status(500).json({ error: 'Error saving user' }));
  });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
