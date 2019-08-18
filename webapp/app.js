require('dotenv').config();

const redis = require("redis");
const { HOST: REDIS_HOST, PORT: REDIS_PORT } = require("./config/redis");
const express = require('express');
const sse = require('./services/sse');

const app = express();

// Middleware
app.use(sse.enable());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.get('/stream', function(request, response) {
    const redisClient = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT });

    sse.add(request, response);

    // Subscribe to successful tasks
    redisClient.subscribe('task_success');

    // Listen for changes
    redisClient.on("message", function (channel, message) {
        sse.push_sse(1, "task_success", message);
    });

});


app.post("/task", function(req, res) {
    const {id, message} = req.body;
    const redisClient = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT });

    // Publish new message
    redisClient.publish("new_task", JSON.stringify({ id, message }))

    return res.json({message: "task created", task: { id, message }})
});

module.exports = app;
