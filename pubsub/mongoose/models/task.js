const mongoose = require("mongoose");
const mongooseHistory = require('mongoose-history');

module.exports = Task;

const schema = new mongoose.Schema({
    uploadedAt: { type: Date, default: Date.now },
    originalName: String,
    sourceSystem: String,
    sourceEntity: String,
});


const Task = mongoose.model("Task", schema);
Task.plugin(mongooseHistory);
