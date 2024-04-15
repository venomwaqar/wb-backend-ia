const fetch = require('node-fetch');
const config = require("../config/config.js");
const redis = require("redis");

const searchForBooks = async(searchQuery, startIndex) => {
    try {
        let results = {}
        let redisClient;
        const external_api = `${config.BOOK_API_URL}?q=${searchQuery}&startIndex=${startIndex}`
        redisClient = redis.createClient({
            url: `redis://${config.REDIS_HOST}`
        });
        redisClient.on("error", (error) => console.error(`Error : ${error}`));
        await redisClient.connect();

        const cacheResults = await redisClient.get(external_api);
        if (cacheResults) {
            results = JSON.parse(cacheResults);
            results["isCached"] = true;
        }
        else {
            results = await fetch(external_api);
            results = await results.json();
            results["isCached"] = false;
            await redisClient.set(external_api, JSON.stringify(results), {
                EX: config.REDIS_CACHE_EXPIRY_IN_SECONDS,
                NX: true,
            });
        }
        await redisClient.disconnect();
        return Promise.resolve(results);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = {
    searchForBooks
}