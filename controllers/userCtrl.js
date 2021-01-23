const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtCtrl = require('../helpers/jwt');
const sendMail = require('../helpers/sendMail');

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ msg: 'Please enter the required fields' });
      }
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: 'Email is not valid' });
      }

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'Email already exists' });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters long' });
      }

      //password hash
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      const activation_token = jwtCtrl.createActivationToken(newUser);

      const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url, 'Verify your email address');

      res.json({
        msg: 'Register Success! Please activate your email to start',
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  //after email is activated then user data is saved to mongodb
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { name, email, password } = user;
      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: 'This email already exists' });
      const newUser = new Users({
        name,
        email,
        password,
      });
      await newUser.save();
      res.json({ msg: 'Account has been activated' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({
          msg: !email
            ? 'Email is required'
            : !password
            ? 'Password is required'
            : 'Email and Password required',
        });

      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: 'This email does not exist' });

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword)
        return res.status(400).json({ msg: 'Invalid email/password' });
      const refresh_token = jwtCtrl.createRefreshToken({ id: user._id });
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });
      res.json({ msg: 'Login success' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: 'Please login' });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: 'Please login now' });
        const access_token = jwtCtrl.createAccessToken({ id: user.id });

        res.json({ access_token });
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await Users.findOne({ email });

      if (!user)
        return res.status(400).json({ msg: 'This email does not exist' });

      const access_token = jwtCtrl.createAccessToken({ id: user._id });
      const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`;

      sendMail(email, url, 'Reset your password');
      res.json({ msg: 'Re-send the password! Please check your email' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );

      res.json({ msg: 'Password Changed Successfully!' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getUsersAllInfo: async (req, res) => {
    try {
      const users = await Users.find().select('-password');
      res.json(users);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  logOut: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
      return res.json({ msg: 'Logged Out' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, avatar } = req.body;
      await Users.findOneAndUpdate({ _id: req.user.id }, { name, avatar });
      res.json({ msg: 'Update Success' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;
      await Users.findOneAndUpdate({ _id: req.params.id }, { role });
      res.json({ msg: 'Updated Successfully' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Deleted Successfully' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

//email validation
function validateEmail(email) {
  const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
}
