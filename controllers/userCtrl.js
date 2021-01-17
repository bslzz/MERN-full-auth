const Users = require('../models/userModel');

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

      res.json({ msg: 'registered' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

function validateEmail(email) {
  const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
}
