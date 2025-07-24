const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myNewDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Мидлвар для обработки JSON в запросах
app.use(bodyParser.json());

// Простая страница при GET запросе на /
app.get('/', (req, res) => {
  res.send('Welcome to the registration platform!');
});

// Маршрут для регистрации
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  // Создаем нового пользователя
  const newUser = new User({
    username,
    password: hashedPassword
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
