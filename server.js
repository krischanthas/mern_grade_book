const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// import routes
const authRoute = require('./routes/authRoutes');
const routes = require('./routes/routes'); 


dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
).then(() => console.log("Connected to MongoDB")).catch((error) => res.status(500).json({ message: error }));

// Middleware
app.use(express.json());


// route middleware
app.use('/api/users', authRoute)
app.use('/api/', routes)

app.listen(3000, () => console.log('Server is running...'))