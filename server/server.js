const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// import routes
const authRoute = require('./routes/authRoutes');
const routes = require('./routes/routes');
const basicUserRoutes = require('./routes/basicUserRoutes');


dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
).then(() => console.log("Connected to MongoDB")).catch((error) => res.status(500).json({ message: error }));

// Middleware
app.use(express.json());
app.use(cors())

// route middleware
app.use('/api/users', authRoute)
app.use('/api/', routes)
app.use('/api/b/', basicUserRoutes)

app.listen(7000, () => console.log('Server is running...'))