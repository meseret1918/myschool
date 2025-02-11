const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');

        // Optionally sync models (use carefully in production)
        // await sequelize.sync(); 

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
