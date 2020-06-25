const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// import routes
const authRoute = require('./routes/authRoutes');
const routes = require('./routes/routes');
const basicUserRoutes = require('./routes/basicUserRoutes');
const path = require('path');

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

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*'), (req, res) => {
        // load index.html file
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 7000;

app.listen(port, () => console.log('Server is running...'))