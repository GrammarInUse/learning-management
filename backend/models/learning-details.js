const db = require("./db");

const sequelize = require("sequelize");
const Model = sequelize.Model;

const Learnings = require("./learnings");

class LearningDetails extends Model{ 
    static async getSTT(id){
        const temp = await LearningDetails.findAll({
            where: {
                learningId: id
            }
        });

        return temp.length + 1;
    }
}

LearningDetails.init({
    learningId: {
        type: sequelize.TEXT,
        primaryKey: true,
        references: {
            key: "id",
            model: Learnings
        }
    },
    STT: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    summarySyntax: {
        type: sequelize.TEXT,
        allowNull: true
    },
    summarySemantic: {
        type: sequelize.TEXT,
        allowNull: true
    },
    example: {
        type: sequelize.TEXT,
        allowNull: true
    }
},{
    sequelize: db,
    modelName: "LearningDetails"
});

module.exports = LearningDetails;