const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();
const port = 5500;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/myNewDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Статичные файлы (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware для обработки JSON
app.use(express.json());

// Маршрут для получения страницы входа
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Маршрут для регистрации
app.post('/register', (req, res) => {
  const { name, age, email, password } = req.body;

  if (!name || !age || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

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
    })
    .catch(err => res.status(500).json({ error: 'Error checking email' }));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port 5500`);
});
