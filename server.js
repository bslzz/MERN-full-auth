require('dotenv').config();
require('./db/initMongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use('/', (req, res) => {
  res.json({ msg: 'Hello' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
