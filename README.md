# Node.js Rest APIs with Express & MySQL - WB Backend
## Prequisites
- NodeJS v20.8.0
- MySQL 8.3.0
- Redis
## Docker (optional) - configure Redis and MySQL
Configure redis to run locally on docker
```
docker run -p 6379:6379 -d --rm redis/redis-stack-server:latest
```
Configure MySQL to run locally on docker
```
docker run -e MYSQL_ROOT_PASSWORD=admin1234 -e MYSQL_DATABASE=wb-backend -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin1234 -p 3306:3306 -d --rm mysql:8.3.0
```

## Project setup
Configure .env file as per your requirements
KEY | VALUE | DESCRIPTION
--- | --- | --- |
DATABASE_HOST | localhost | URL to connect with MySQL |
DATABASE_USER | admin | User for MySQL |
DATABASE_PASSWORD | admin1234 | Password for MySQL |
DATABASE_DB | wb-backend | Database for MySQL |
REDIS_HOST | localhost | URL to connect with REDIS |
REDIS_CACHE_EXPIRY_IN_SECONDS | 30 | Cache expiry in seconds |
BOOK_API_URL | https://www.googleapis.com/books/v1/volumes | URL for Google Books API |
ACCESS_TOKEN_SECRET | ZABBSS%^&&&@DDDB | KEY used to create login's access_token for user |

Run the following commands to configure the project
```
npm config set audit false
npm install .
knex migrate:latest ## it'll create the DB schema in connected database
```

### Run
```
npm run start-dev  
```

Note: I've used ExpressJS without Lucid form - as it was more compatible with adonisjs, but since I had option and more experience with ExpressJS, I went with it. Although, adonisjs seems a pretty good framework.