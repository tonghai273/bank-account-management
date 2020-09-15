var express = require('express'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
dbConfig = require('./database/db');

const env = require('./config/env');
var customerRoute = require('./routes/customer.route');
var userRoute = require('./routes/user.route');
var errorsHandle = require('./middlewares/errors-handle');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(cors());

app.use('/customer', customerRoute);
app.use('/auth', userRoute);

// Create port
app.listen(env.port, () => {
    console.log('Connected to port ' + env.port)
});

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
    }).then(() => {
        console.log('Database connected sucessfully ')
    },
    error => {
        console.log('Could not connected to database : ' + error)
    }
);

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(errorsHandle.handleErrors);