const db = require("./db");

const sequelize = require("sequelize");
const TopicTypes = require("./topic-types");
const Model = sequelize.Model;

class Topics extends Model{ 
    static async getID(){
        const topicsList = await Topics.findAll();

        return topicsList.length + 1;
    }
}

Topics.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    type: {
        type: sequelize.INTEGER,
        references: {
            key: "id",
            model: TopicTypes
        }
    }
},{
    sequelize: db,
    modelName: "Topics"
});

module.exports = Topics;