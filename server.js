const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const http = require('http');

require('dotenv').config(); 
    
// Connect to database
mongoose
    .connect(process.env.RESTAURANT_DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));


//app
const app = express();

//import routes
const authRoutes = require('./routes/auth');
const db = require('./models/User');


//middlewares
app.use(bodyParser.json());
app.use(cors());
mongoose.Promise = global.Promise; // to avoid deprecated warnings

app.use(morgan('dev'));

//routes middleware
app.use('/api', authRoutes);


const port = process.env.PORT || 5000;
// const server = http.createServer(app);
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});