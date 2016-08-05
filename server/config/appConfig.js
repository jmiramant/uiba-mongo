/* Use this old export style until sequelize cli supports es6 syntax */
const DB_TYPES = require('./constants').DB_TYPES;

function defaultExport() {}

defaultExport.DB_TYPE = DB_TYPES.MONGO;
defaultExport.ENV = process.env.NODE_ENV || 'development';

module.exports = defaultExport;
