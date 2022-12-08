const Sequelize = require('sequelize');

const path = "mysql://root:root@localhost:3306/videotheque";
const db = new Sequelize(path);

db.authenticate().then(() => {
    console.log("Connection established !");
}).catch(err => {
    console.error("Unable to connect to database : ", err);
})

module.exports = db;