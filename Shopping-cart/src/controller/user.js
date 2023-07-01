const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const { uploadFiles } = require('../aws/aws');
const jwt = require('jsonwebtoken');
const { ObjectIdCheck, emailRegex, phoneRegex, passwordRegex } = require('../utils/validation');

const SECRET_KEY = "Chandrakant";

// =================================CREATE API==========================================================
const userCreate = async (req, res) => {
  try {
    const file = req.files;
    const { fname, lname, phone, email, password, address } = req.body;

    if (phone.length !== 10) {
      return res.status(400).json({ status: false, message: 'Please enter a valid phone number' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: false, message: 'Please enter a valid email' });
    }
    if (password.length < 8 || password.length > 15) {
      return res.status(400).json({ status: false, message: 'Please enter a valid password' });
    }
    if (!address.shipping && !address.billing) {
      return res.status(400).json({ status: false, message: 'Please enter an address' });
    }
    if (!address.shipping.street && !address.billing.street) {
      return res.status(400).json({ status: false, message: 'Please enter a street address' });
    }
    if (!address.shipping.city && !address.billing.city) {
      return res.status(400).json({ status: false, message: 'Please enter a city' });
    }
    if (!address.shipping.pincode && !address.billing.pincode) {
      return res.status(400).json({ status: false, message: 'Please enter a pincode' });
    }
    if (!file.length) {
      return res.status(400).json({ status: false, message: 'Please upload a profile image' });
    }

    const phoneCheck = await userModel.findOne({ phone: phone });
    const emailCheck = await userModel.findOne({ email: email });

    if (phoneCheck) {
      return res.status(400).json({ status: false, message: 'Phone number already exists' });
    }
    if (emailCheck) {
      return res.status(400).json({ status: false, message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const url = await uploadFiles(file[0]);

    const userDetail = req.body
    userDetail.profileImage =url
    userDetail.password =hashedPassword
    const user = await userModel.create(userDetail);
    return res.status(200).json({ status: true, message: 'User created successfully', data: user });
  } catch (error) {
    if (error.message.includes('duplicate')) {
      return res.status(400).json({ status: false, message: error.message });
    } else if (error.message.includes('validation')) {
      return res.status(400).json({ status: false, message: error.message });
    } else {
      return res.status(500).json({ status: false, message: error.message });
    }
  }
};
//===============================LOGIN API =======================================================
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) 
            return res.status(400).json({ status: false, message: 'Please enter email and password' });
        
        const user = await userModel.findOne({ email: email });
        if (!user) 
            return res.status(400).json({ status: false, message: 'No user with this email' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) 
            return res.status(400).json({ status: false, message: 'Invalid email or password' });
        
        const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '24h' });

            return res.status(200).json({ status: true, message: 'User logged in successfully', data: { userId: user._id, token: token } });
        }
     catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// ======================================GET API======================================================
const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            res.status(400).json({ status: false, message: 'Please enter user id' });
        }
        if (!ObjectIdCheck(userId)) {
            res.status(400).json({ status: false, message: 'Please enter valid user id' });
        }
        
        const user = await userModel.findById(userId);
        if (!user) {
            res.status(404).json({ status: false, message: 'User not found' });
        }
        res.status(200).json({ status: true, message: 'User Profile Details', data: user });
    } catch (error) {
        if (error.message.includes('duplicate')) {
            res.status(400).json({ status: false, message: error.message });
        }
        else if (error.message.includes('validation')) {
            res.status(400).json({ status: false, message: error.message });
        }
        else {
            res.status(500).json({ status: false, message: error.message });
        }
    }
}
// ============================================UPDATE API==========================================

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const data = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        if (Object.keys(data).length < 1) {
            return res.status(400).json({ status: false, message: 'Please provide some fields to update' });
        }

        if (data.email) {
            if (!emailRegex.test(data.email)) {
                return res.status(400).json({ status: false, message: 'Please enter a valid email' });
            }
            const emailCheck = await userModel.findOne({ email: data.email });
            if (emailCheck) {
                return res.status(400).json({ status: false, message: 'Email already exists' });
            }
        }

        if (data.phone) {
            if (!phoneRegex.test(data.phone)) {
                return res.status(400).json({ status: false, message: 'Please enter a valid phone number' });
            }
            const phoneCheck = await userModel.findOne({ phone: data.phone });
            if (phoneCheck) {
                return res.status(400).json({ status: false, message: 'Phone number already exists' });
            }
        }

        if (data.password) {
            if (!passwordRegex.test(data.password)) {
                return res.status(400).json({ status: false, message: 'Please enter a valid password' });
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword;
        }

        if (req.files && req.files.length > 0) {
            const file = req.files[0];
            const url = await uploadFiles(file);
            data['profileImage'] = url;
          }

        await userModel.findByIdAndUpdate(userId, { $set: data }, { new: true });
        const updatedData = await userModel.findById(userId);


        return res.status(200).json({ status: true, message: 'User updated successfully', data: updatedData });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};


module.exports = {
    userCreate,
    userLogin,
    getUserById,
    updateUser
}
