const sequelize = require('../config/db')
const { DataTypes } = require('sequelize');
const User = require('./User');


const Task = sequelize.define('Task', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    task_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },

    title: {
        type: DataTypes.STRING
    },

    description: {
        type: DataTypes.STRING
    },

    completed: {
        type: DataTypes.STRING,
        defaultValue: 0

    },

    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'user_id',
      },
    },


  }, { timestamps: true });


module.exports = Task