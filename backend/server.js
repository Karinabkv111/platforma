const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();

// 1. Добавляем middleware для парсинга JSON данных
app.use(express.json());  // Эта строка позволяет серверу понимать JSON в теле запроса

// 2. Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/myNewDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// 3. Маршрут для регистрации
app.post('/register', (req, res) => {
  const { name, age, email, password } = req.body;  // Теперь сервер будет правильно извлекать данные из req.body

  if (!name || !age || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

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

// 4. Запуск сервера
app.listen(5500, () => {
  console.log('Server running on port 5500');
});
