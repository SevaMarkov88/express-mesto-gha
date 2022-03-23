const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const { userValidation, loginValidation } = require('./middlewares/validationJoi');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, (err) => {
  if (err) throw err;
});

app.use(express.json());

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ссылка на сервер: http://localhost:${PORT}`);
});
