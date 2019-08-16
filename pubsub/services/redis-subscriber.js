const redis = require("redis");
const { HOST: REDIS_HOST, PORT: REDIS_PORT } = require("../config/redis");

const subscriber = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT });

// Subscribe to channels
subscriber.subscribe('new_task');

module.exports = subscriber;
