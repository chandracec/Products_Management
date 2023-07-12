const mongoose = require('mongoose')
const aws = require('aws-sdk')

//<<----------------Validation for ObjectId check in DB ---------------->>
const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
};

//<<----------------Validation for String ---------------->>  
const isValidstring = function (pass) {
    return (/^[A-Za-z]+$/).test(pass)
}

//<<----------------Validation for Email ---------------->>  
const isValidemail = function (email) {
    return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email);
}

//<<----------------Validation for Mobile No. ---------------->>
const isValidphone = function (phone) {
    return (/^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/).test(phone);
}

//<<----------------Validation for password ---------------->>  
const isValidpassword = function (pass) {
    return (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,15}$/).test(pass);
}

//<<----------------Validation for pincode ---------------->>
const isValidpin = function (pincode) {
    return (/^[1-9][0-9]{5}$/).test(pincode)

};

//<<----------------Validation for filleds ---------------->>
const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    return true;
  };

//<<----------------Validation for imageExtension ---------------->>
const isValidfile = function (filename) {
    return (/^.*\.(jfif|png|jpg|JPG|gif|GIF|webp|tiff?|bmp)$/).test(filename)
};

//<<----------------Validation for Price ---------------->>
const isValidPrice = function (price) {
    return /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/.test(price);
  }; 

//<<----------------Validation for installment ---------------->>
  const isValidintall = function (value) {
    return /^[1-9][0-9]?$/.test(value); // 1-99 Number.
  };



 


module.exports = {isValidObjectId, isValidstring, isValidemail, isValidphone, isValidpassword, isValidpin, isValid,isValidfile,isValidPrice,isValidintall}