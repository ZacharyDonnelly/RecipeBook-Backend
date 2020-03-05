const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');

const PORT = 3000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('combined'));

app.post('/', (req, res) => {
  console.log(req.body);
  return;
});
app.get('/', (req, res) => {
  res.send({ message: 'hellooo' });
  return;
});

app.listen(PORT, () => {
  console.log('Server was started on port: 3000');
});
