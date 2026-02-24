const express = require('express');
const app = express();

const productRouter = require('./routes/products.routes')

const catchAsyncMiddleware = require('./middlewares/catchAsync.middleware');

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173', // Your React/Vite dev server
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions)); //

app.use(express.json());
app.use(catchAsyncMiddleware);

app.use('/products', productRouter);

module.exports = app;