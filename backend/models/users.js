const sequelize = require("sequelize");
const db = require("./db");

const Model = sequelize.Model;

class Users extends Model { }

Users.init({
    id: {
        type: sequelize.TEXT,
        primaryKey: true
    },
    username: {
        type: sequelize.TEXT,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    verifyToken: {
        type: sequelize.TEXT,
        allowNull: true
    },
    avatar: {
        type: sequelize.TEXT,
        allowNull: true
    }
},{
    sequelize: db,
    modelName: "Users"
});


module.exports = Users;