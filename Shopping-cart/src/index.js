const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('../src/routes/route');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

mongoose
  .connect("mongodb+srv://chandrakant91550:85A3tszzv0FScC1w@cluster0.lcv0ktb.mongodb.net/Products_Management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/', router);

const server = app.listen(3000, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log('listening on port 3000');
});
