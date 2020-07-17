const db = require("./db");

const sequelize = require("sequelize");
const Users = require("./users");
const Model = sequelize.Model;

class Information extends Model{ }

Information.init({
    id: {
        type: sequelize.TEXT,
        primaryKey: true,
        references: {
            key: "id",
            model: Users
        }
    },
    fullName: {
        type: sequelize.TEXT,
        defaultValue: "Chưa cập nhật"
    },
    dOB: {
        type: sequelize.DATEONLY
    },
    sex: {
        type: sequelize.BOOLEAN,
        defaultValue: true
    },
    phone: {
        type: sequelize.TEXT,
        defaultValue: "Chưa cập nhật"
    },
    job: {
        type: sequelize.TEXT,
        defaultValue: "Chưa cập nhật"
    },
    address: {
        type: sequelize.TEXT,
        defaultValue: "Chưa cập nhật"
    }
},{
    sequelize: db, 
    modelName: "Information"
});

module.exports = Information;