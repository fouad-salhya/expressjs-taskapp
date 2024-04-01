const User = require('../models/User')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {

  try {

    const { username, email, password } = req.body

    const userByUsername  = await  User.findOne({
      where: {
         username
      }
    })

    if(userByUsername) {
      return res.json({error: 'username deja existe'})
    }
   
    const hashed_password = await bcrypt.hash(password, 10)

    await User.create({
                     username: username,
                     email: email,
                     hashed_password: hashed_password,   
                 })
                 
    res.status(200).json({ message: 'Utilisateur creer avec success' })
    
  } catch (error) {
   
     res.status(500).json({error});
    
  }
}

exports.signin = async (req, res) => {

   try {

    const { email, password } = req.body

    const user = await User.findOne({ 
        where: {
            email: email
        }
     })

     if (!user) {
        return res.status(401).json({ error: 'email incorrect' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.dataValues.hashed_password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'mot de passe incorrect' });
      }


      const token = jwt.sign({ user_id: user.dataValues.user_id, role: user.dataValues.role }, process.env.TOKEN_SECRET, { expiresIn: "1h" })
    
      const { user_id, role } = user.dataValues

    

      res.json({
        token, user_id, role
      })

   } catch (error) {
      res.status(500).json(error);
}

}





