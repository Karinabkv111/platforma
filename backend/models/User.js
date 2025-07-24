const mongoose = require('mongoose');

// Определяем схему пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Создаем модель на основе схемы
const User = mongoose.model('User', userSchema);

module.exports = User;
