const db = require("./db");

const sequelize = require("sequelize");
const Model = sequelize.Model;

const Users = require("./users");
const Topics = require("./topics");

class Learnings extends Model{ }

Learnings.init({
    id: {
        type: sequelize.TEXT,
        primaryKey: true
    },
    name: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    topicId: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            key: "id",
            model: Topics
        }
    },
    userId: {
        type: sequelize.TEXT,
        references: {
            key: "id",
            model: Users
        }
    }
},{
    sequelize: db,
    modelName: "Learnings"
});

module.exports = Learnings;