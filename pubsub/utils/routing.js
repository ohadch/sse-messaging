module.exports = getNextStep;

function getNextStep(entity, step) {
    const steps = {
        "file": {
            "store": "extract"
        }
    };

    return steps[entity][step]
}
