const redis = require("redis");
const { HOST: REDIS_HOST, PORT: REDIS_PORT } = require("../config/redis");


module.exports = {
    createRedisClient,
    getId
};

function createRedisClient() {
    return redis.createClient({ host: REDIS_HOST, port: REDIS_PORT });
}

function getId(entity) {
    const client = createRedisClient();
    return new Promise((resolve, reject) => {
        client.incr(`${entity}:id`, function(err, id) {
            if (err) reject(err);
            resolve(id);
        });
    })
};
