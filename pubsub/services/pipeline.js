const axios = require("axios");
const { HOST: PIPELINE_HOST, PORT: PIPELINE_PORT } = require("../config/pipeline");

const PIPELINE_URL = `http://${PIPELINE_HOST}:${PIPELINE_PORT}`;

module.exports.callPipeline = async function (step, payload) {
    return axios.post(`${PIPELINE_URL}/steps/${step}`, payload);
};
