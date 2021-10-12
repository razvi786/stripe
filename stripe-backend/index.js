require('dotenv').config()
const cors = require("cors")
const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { v4: uuid } = require("uuid")

const app = express();


//middleware
app.use(express.json())
app.use(cors())


//routes
app.get("/", (req, res) => {
    res.send("It works at razvi.com");
})

app.post("/payment", (req, res) => {

    const {product, token} = req.body;
    console.log("Product", product);
    console.log("Token", token);
    console.log("Price", product.price);
    const idempotencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            //necessary
            amount: product.price * 100,
            currency: 'inr',
            customer: customer.id,
            //optional
            receipt_email: token.email,
            description: `Purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})

//listen
app.listen(8282, ()=> console.log("Listening at port 8282"))