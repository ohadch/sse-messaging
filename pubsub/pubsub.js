require('dotenv').config();

const redisSubscriber = require('./services/redis-subscriber');
const { callPipeline } = require('./services/pipeline');

console.log("PubSub is Listening...");

async function handleTask(channel, message) {
    const task = JSON.parse(message);

    console.log(`${channel}, ${message}`);

    if (channel === "new_task") {
        callPipeline(channel, task);
    }
}


redisSubscriber.on("message", function (channel, message) {
    handleTask(channel, message)
});


redisSubscriber.subscribe("new_task");
