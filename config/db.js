const { Sequelize } = require("sequelize");


const sequelize = new Sequelize('spotify', undefined, undefined, {
    host: '/var/run/postgresql',
    dialect: 'postgres'
});

async function testDB(){
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sq: sequelize, testDB };