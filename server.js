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

app.use('/foodblog/api/customers', Customers);
app.use('/user', User);
app.use('/manufacturer', Manufacturers);

//imports the key
const db = config.get('mongoURI');

//connects the db to mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('server started on port 5000');
});
