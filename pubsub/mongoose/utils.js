module.exports = {
    upsert
};


function upsert(model, query, newData) {
    return new Promise((resolve, reject) => {
        model.findOneAndUpdate(query, newData, { upsert: true }, function(err, doc){
            if (err) reject(err);
            resolve(doc);
        });
    })

}
