require('dotenv').config();

const express = require('express');

const sse = require('./services/sse');
const redisSubscriber = require('./services/redis-subscriber');

const app = express();

// Middleware
app.use(sse.enable());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.get('/stream', function(request, response) {
    sse.add(request, response);
    sse.push_sse(1, "opened", { msg: 'connection opened!' });

    // Listen for changes
    redisSubscriber.on("message", function (channel, message) {
        if (channel === "task_success") {
            console.log("task success");
            sse.push_sse(1, "task_success", message);
        }
    });

});


module.exports = app;
