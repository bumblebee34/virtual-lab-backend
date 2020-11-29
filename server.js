const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();

// Body parser middleware
app.use(express.json());

// Connection details of db
const db = config.get('mongoURI');

// Adding routes
app.use('/user/student' , require('./routes/student'));
app.use('/user/faculty' , require('./routes/faculty'));

// Connecting to db
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch(() => console.log("Error connecting to database"));

const port = process.env.NODE_ENV || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
