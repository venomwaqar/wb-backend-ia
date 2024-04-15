require('dotenv').config()

module.exports = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_DB,
  BOOK_API_URL: process.env.BOOK_API_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_CACHE_EXPIRY_IN_SECONDS: process.env.REDIS_CACHE_EXPIRY_IN_SECONDS,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};