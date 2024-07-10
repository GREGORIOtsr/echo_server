const { Sequelize } = require('sequelize');
require('dotenv').config();



// const db = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, `${process.env.SQL_PASSWORD}`, {
const db = new Sequelize(process.env.SQL_CONNECTION, {
    host: process.env.SQL_HOST,
    dialect: 'postgres',
    ssl: true,
    define: {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        schema: "public",
    },
});

const connectSQL = async () => {
    try {   
        await db.authenticate();
        console.log('PostgreSQL database connected...');
    } catch (error) {
        console.error('Unable to connect to SQL database:', error);
    }
};

connectSQL();

module.exports = {
    connectSQL,
    db
}