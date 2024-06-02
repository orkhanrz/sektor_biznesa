const { Sequelize } = require("sequelize");
const config = require('../config/dev');

const sequelize = new Sequelize(config.sql.dbName, config.sql.user, config.sql.password, {
	host: config.sql.host,
	dialect: config.sql.dialect,
    logging: false
});

const connectToDb = async (cb) => {
    try {
        await sequelize.sync();
        cb();
    } catch (err){
        console.log('Db connection error: ', err);
    };
};

module.exports = {connectToDb, sequelize};