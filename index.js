//'use strict';

const express = require('express');
const config = require('./config');

const userController = require('./controllers/user.controller');
const healthController = require('./controllers/health.controller');
const authController = require('./controllers/auth.controller');
const msgController = require('./controllers/message.controller');
//const errhandlerController = require('./controllers/errorhandler.controller');

const app = express();
app.use(express.json());

app.post('/check', healthController.check);
app.post('/user', userController.createUser);
app.post('/login', authController.login);

// secure endpoints
app.post('/secureTest', authController.secureTest);
app.post('/messages', msgController.send);
app.get('/messages', msgController.get);


//Error handler
//app.use(errhandlerController.errorHandler);
//app.use(errhandlerController.notFoundHandler);

const port = config.web.port;
app.listen(port, () => {
  console.log(`ASAPP Challenge app running on port ${port}`);
});
