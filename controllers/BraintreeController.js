const braintree = require("braintree");
require('dotenv').config()


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});


exports.generateToken = (req, res) => {

    gateway.clientToken.generate({}, (err, response) => {
        if(err) {
            return res.json({error: err})
        }

            res.json({token: response.clientToken})
    })
}


