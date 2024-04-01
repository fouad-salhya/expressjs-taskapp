const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const sequelize  = require('./config/db')
const auth = require('./routes/auth')
const users = require('./routes/users')
const tasks = require('./routes/tasks')
const braintree = require('./routes/braintree')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const User = require('./models/User')
const Task = require('./models/Task')


// middlewares
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

  
// base de donne mysql
// sequelize.sync()
//          .then(() => { console.log('Connexion à la base de données réussie.')})
//          .catch((err) => { console.error('Erreur de connexion à la base de données :', err);});

// router
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/tasks', tasks)
app.use('/api/braintree', braintree)

// relationships
User.hasMany(Task, 
    { onDelete:"CASCADE", onUpdate:"CASCADE" },
    { foreignKey: {name: 'user_id'}}
    );

Task.belongsTo(User,
    { onDelete:"CASCADE", onUpdate:"CASCADE" },
    { foreignKey:  {name: 'user_id'}}
    )



// server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app listen to ${port}...`))

