//db/db.js
require('dotenv').config()

const environment = process.env.NODE_ENV || "development";
module.exports = knex(knexFile[environment]);