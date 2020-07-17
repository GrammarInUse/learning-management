const Sequelize = require("sequelize");

const connectionString = "postgres://postgres:Taolatao0@localhost:5432/Knowledge_Management";

const db = new Sequelize(connectionString);

db.sync()
.then(console.log("TEST DB IS OK"))
.catch((err) => {
    console.log("TEST IS FAILED: " + err);
});

module.exports = db;