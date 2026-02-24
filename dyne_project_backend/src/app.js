const express = require('express');
const app = express();

const productRouter = require('./routes/products.routes')

const catchAsyncMiddleware = require('./middlewares/catchAsync.middleware');

const cors = require('cors');
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000', 
    'https://prajwal-ghadigaonkar-assignment.netlify.app' // Your live Netlify URL
];


// Taken this setting from AI
// 2. Configure CORS to use that array
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Origin is allowed
        } else {
            callback(new Error('Not allowed by CORS')); // Origin is blocked
        }
    },
    credentials: true // Only add this if you are using cookies/sessions
}));

app.use(express.json());
app.use(catchAsyncMiddleware);

app.use('/products', productRouter);

module.exports = app;