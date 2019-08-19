require('dotenv').config();

const redis = require("redis");
const multer = require("multer");
const { HOST: REDIS_HOST, PORT: REDIS_PORT } = require("./config/redis");
const express = require('express');
const { fileFilter } = require("./utils/files");
const { errorHandler } = require("./utils/middlewares");
const sse = require('./services/sse');

const app = express();

// Middleware
app.use(sse.enable());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer({
    dest: "./uploads",
    fileFilter,
    limits: {
        fileSize: 500000000 // 500 MB
    }
});

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

app.post("/upload", upload.single("file"), function(req, res) {
    return res.json({file: req.file})
});

app.post("/task", function(req, res) {
    const {id, message} = req.body;
    const redisClient = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT });

    // Publish new message
    redisClient.publish("new_task", JSON.stringify({ id, message }));

    return res.json({message: "task created", task: { id, message }})
});


app.use(errorHandler);


module.exports = app;
