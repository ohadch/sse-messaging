require('dotenv').config();

const os = require("os");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const express = require('express');
const { fileFilter } = require("./utils/files");
const { errorHandler } = require("./utils/middlewares");
const { createRedisClient, getId } = require("./utils/redis");
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
    const redisClient = createRedisClient();

    sse.add(request, response);

    // Subscribe to successful tasks
    redisClient.subscribe('task_success');

    // Listen for changes
    redisClient.on("message", function (channel, message) {
        sse.push_sse(1, "task_success", message);
    });

});

app.post("/upload", upload.single("file"), async function(req, res) {
    const client = createRedisClient();
    const {file} = req;
    const fileId = await getId("file");

    client.publish(`file:upload:ended`, JSON.stringify({ file, fileId }));

    res.json({ file, fileId })
});

const sub = createRedisClient();
sub.subscribe("file:upload:ended");
sub.on("message", (channel, message) => {
    const {file, fileId} = JSON.parse(message);

    client.publish(`file:store:started`, JSON.stringify({ file, fileId }));

    // Store in temp
    const tempPath = path.join(os.tmpdir(), file.filename);
    fs.rename(file.path, tempPath);
    file.path = tempPath;

    client.publish(`file:store:ended`, JSON.stringify({ file, fileId }));

    console.log(channel, message)
});


app.use(errorHandler);


module.exports = app;
