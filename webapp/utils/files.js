const ALLOWED_MIME_TYPES = ["text/csv", "application/json"];

module.exports.fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE";

        // Error occurred
        return cb(error, false)
    }

    return cb(null, true)
};
