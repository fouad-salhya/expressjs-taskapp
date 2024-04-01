const User = require('../models/User')

exports.getAccount = async (req, res) => {

   try {

      const user_id = req.auth.user_id

      const user = await User.findOne({
        where: { user_id: user_id },
        attributes: ['username','email','user_id', 'role', 'email_verified']
      })
  
      if(!user) {
        return res.json({error: "User Not Found"})
      }
  
        return res.status(200).json({ user });
  
      
   } catch (error) {
       res.json(error);
   }

}

exports.deleteAccount = async (req, res) => {

   try {

      const user_id = req.auth.user_id
      const user = await User.destroy({ where: { user_id: user_id }})
   
   if(user == 0) {
      return res.json({ error: 'User Not Deleted'})
   }

   if(user == 1) {
      return res.json({ message: "User Deleted"})
   }
      
   } catch (error) {
      res.json(error)
   }
}

