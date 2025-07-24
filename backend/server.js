const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Подключение к базе данных MongoDB
const uri = 'mongodb://127.0.0.1:27017'; // Используем локальное подключение
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Подключение к базе данных
let db;
client.connect().then(() => {
  db = client.db('myNewDatabase'); // Выбираем базу данных
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

// Роут для регистрации
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  // Вставляем пользователя в коллекцию
  try {
    const result = await db.collection('users').insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered', userId: result.insertedId });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
