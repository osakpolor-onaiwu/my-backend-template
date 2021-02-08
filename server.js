const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//init express
const app = express();

//this imports our customer api file in our router
const Customers = require('./routers/api/customerApi');
const Categories = require('./routers/api/categoryApi');
const Manufacturers = require('./routers/api/manufacturerApi');
const Post = require('./routers/api/postApi');
const User = require('./routers/api/userApi');
const Auth = require('./routers/api/auth');

//allow Post request from client
//helps parses the data to json
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'easy test api',
      version: '1.0.0',
      description: 'my testing express',
      contact: {
        name: 'Osakpolor Onaiwu',
        email: 'onaiwuosakpolor@gmail.com',
      },
      servers: ['http://localhost:5000'],
    },
  },
  apis: ['./routers/api/customerApi.js', './routers/api/manufacturerApi.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/customers', Customers);
app.use('/user', User);
app.use('/manufacturer', Manufacturers);

// //imports the key
// for online database
// const db = config.get('mongoURI');

//localdatabase
const url = 'mongodb://127.0.0.1:27017/foodblog';
//connects the db to mongodb
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('db connected', url);
});

db.on('error', (err) => {
  console.log('connection error', err);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('server started on port 5000');
});
