require('dotenv').config();

const redisSubscriber = require('./services/redis-subscriber');
const { callPipeline } = require('./services/pipeline');

console.log("PubSub is Listening...");

function handleTask(channel, message) {
    const task = JSON.parse(message);

    console.log(`${channel}, ${message}`);

    callPipeline(channel, task);
}


redisSubscriber.on("message", handleTask);


redisSubscriber.subscribe("tasks");
