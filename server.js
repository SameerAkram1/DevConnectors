const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config()
const app = express();


//connect Database
connectDB();

// Init middleware bodyparser 
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  