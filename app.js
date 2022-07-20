const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const path = require('path'); 
require('dotenv').config()

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, "/fe/build")));

 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/fe/build', 'index.html'));
 });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Rquested-With,Content-Type,Accept,Authorization');
    if (req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.json({
        error : {
            message: err.message
        }
    })
})
module.exports = app;