const mongoose = require('mongoose');

module.exports = {
  dbConnection: mongoose.connect(
    process.env.MONGODB_URL,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) throw err;
      console.log('Connected to DB successfully');
    }
  ),
};
