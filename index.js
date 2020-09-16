require('dotenv').config()
const express = require("express");
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const port = process.env.PORT || 5001;
// API

// - App config
const app = express();

// - Middleware
app.use(cors({origin: true}));
app.use(express.json());

// - API routs
app.get('/', (req, res) => res.status(200).send('Hello_world'));
app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    console.log('payment receive >>>>', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: 'inr',
    })
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

// - Listen command
app.listen(port, (req, res) =>{
    console.log('app is running at ' + port);
})
