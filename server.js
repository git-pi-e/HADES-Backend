const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const http = require('http');

require('dotenv').config(); 
    
// Connect to database
mongoose
    .connect(process.env.RESTAURANT_DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected mate')).catch(err => {
        throw new DbConnectionError();
        console.log(err);
    });

//app
const app = express();

//import routes
const userRoutes = require('./routes/user');
const dishRoutes = require('./routes/dishes');

const db = require('./models/User');

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// mongoose.Promise = global.Promise; // no longer needed

//routes middleware - routeHandlers
app.use('/user', userRoutes);
app.use('/dishes', dishRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Arise MERN developers',
        path: req.path,
        method: req.method
    });
});


//start server
const port = process.env.PORT || 5000;
// const server = http.createServer(app);
app.listen(port, () => {
    console.log(`Server is running lmao, listening on ${port}`)
});