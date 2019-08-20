require('dotenv').config();

const redisSubscriber = require('./services/redis-subscriber');
const { callPipeline } = require('./services/pipeline');
const getNextStep = require("./utils/routing");
const Task = require("./mongoose/models/task");
const { upsert } = require("./mongoose/utils");
console.log("PubSub is Listening...");

async function handleTask(channel, message) {
    message = JSON.parse(message);

    // Unpack data
    const { entity, step, status } = channel;
    const { fileId } = message;

    await upsert(Task, { fileId: fileId }, );

    if (status === "ended") {
        let nextStep = getNextStep(entity, step);
        callPipeline(nextStep, message)
    }
}


redisSubscriber.on("message", handleTask);


redisSubscriber.psubscribe("file:*");
