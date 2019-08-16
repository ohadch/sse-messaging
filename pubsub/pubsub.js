require('dotenv').config();

const redisSubscriber = require('./services/redis-subscriber');
console.log("PubSub is Listening...");

function handleTask(channel, message) {
    const task = JSON.parse(message);

    console.log(`${channel}, ${message}`);
}


redisSubscriber.on("message", handleTask);


redisSubscriber.subscribe("tasks");
