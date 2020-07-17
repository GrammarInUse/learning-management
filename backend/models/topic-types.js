const db = require("./db");

const sequelize = require("sequelize");
const Model = sequelize.Model;

class TopicTypes extends Model{ 
    static async initialize(){
        await TopicTypes.create({
            id: 1,
            name: "Ngôn Ngữ Lập Trình"
        })
        .then(console.log("Successfully created a topic type"))
        .catch((err) => {
            console.log("Something went wrong when you created a topic type: " + err);
        });

        await TopicTypes.create({
            id: 2,
            name: "Ngoại ngữ"
        })
        .then(console.log("Successfully created a topic type"))
        .catch((err) => {
            console.log("Something went wrong when you created a topic type: " + err);
        });

        await TopicTypes.create({
            id: 3,
            name: "Cơ sở dữ liệu"
        })
        .then(console.log("Successfully created a topic type"))
        .catch((err) => {
            console.log("Something went wrong when you created a topic type: " + err);
        });
    }
}

TopicTypes.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    }
},{
    sequelize: db,
    modelName: "TopicTypes"
});

module.exports = TopicTypes;