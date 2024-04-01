const  jwt  = require('jsonwebtoken')
require('dotenv').config()

exports.requireSignin = (req, res, next) => {

    const tokenHeader = req.header('Authorization');

    if(tokenHeader) {
        const token = tokenHeader.split(" ")[1]
    
        if (!token) return res.status(401).json({ error: 'Authentication failed' });
    
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
          
            if(err) {
                return res.status(401).json({ message: 'vous etes pas authntifier' })
            }
               
                req.auth = decode
                next()   
        })

    }
   

}

