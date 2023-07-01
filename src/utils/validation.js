const mongoose = require('mongoose');

const ObjectIdCheck = (Id) => {
  return mongoose.Types.ObjectId.isValid(Id);
};
const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^\d{10}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

module.exports = {
  ObjectIdCheck,
  nameRegex,
  phoneRegex,
  emailRegex,
  passwordRegex
};
