const Task = require('../models/Task')


exports.createTask = async (req, res) => {

   try {
    
    const { title, description } = req.body

    const user_id = req.auth.user_id

    const task = await Task.create({
        title: title,
        description: description,
        user_id: user_id
    })

    if(!task) {
        return res.status(400).json({error:"Task Not Created"});
    }

       res.json({message: "Task Created"})


   } catch (error) {
      res.json({error})
   }

}

exports.deleteTask = async (req, res) => {

    try {

        const user_id = req.auth.user_id
        const task_id = req.body.task_id 
        const task = await Task.destroy({ where: { task_id: task_id, user_id: user_id }})
     
     if(task == 0) {
        return res.json({ error: 'task Not Deleted'})
     }
  
     if(task == 1) {
        return res.json({ message: "task Deleted"})
     }
        
     } catch (error) {
        res.json(error)
     }
}

exports.isCompleted = async (req, res) => {

    const user_id = req.auth.user_id
    const task_id = req.body.task_id
    const task = await Task.update({completed: 1}, { where: { task_id: task_id, user_id: user_id }})


}