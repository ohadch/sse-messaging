module.exports.errorHandler = (err, req, res, next) => {
    if (err.code === "INCORRECT_FILETYPE") {
        res.status(422).json("Only CSV and JSON files are allowed");
        return
    }
    if (err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json("Max allowed size is 500MB");
        return
    }
};
