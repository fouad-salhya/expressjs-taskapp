const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')


const User = sequelize.define('User', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.BLOB('long'),
      data:Buffer,
      contentType:String
    },

    email: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
        isEmail: true
       }
    },

    email_verified: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        min: 6,
        
      },

    },

    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }

  }, { timestamps: true });


module.exports = User