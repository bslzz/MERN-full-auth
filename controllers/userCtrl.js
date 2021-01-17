const Users = require('../models/userModel');
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

      //save to mongodb
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      const activation_token = jwtCtrl.createActivationToken(newUser);

      const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;
      console.log(url);
      sendMail(email, url);

      res.json({
        msg: 'Register Success! Please activate your email to start',
      });
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
