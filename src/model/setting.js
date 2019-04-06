module.exports = (app) => {
    const schema = app.db.Schema({
        key: String,
        value: String
    });

    const model = app.db.model('Setting', schema);
    app.model.setting = {
        get: (keys, done) => {
            let result = {};
            const solveAnItem = (index) => {
                if (index < keys.length) {
                    let key = keys[index];
                    model.findOne({ key }, (error, item) => {
                        result[key] = (error == null && item) ? item.value : null;
                        solveAnItem(index + 1);
                    });
                } else if (done) {
                    if (done) done(result);
                }
            };
            solveAnItem(0);
        },

        set: (data, done) => {
            const keys = Object.keys(data),
                options = { upsert: true, new: true, setDefaultsOnInsert: true };
            let error = null;
            const solveAnItem = (index) => {
                if (index < keys.length) {
                    let key = keys[index];
                    model.findOneAndUpdate({ key }, { $set: { value: data[key] } }, options, (error, item) => {
                        if ((error || item == null) && error == null) error = 'Set setting (' + key + ') has error: ' + error;
                        solveAnItem(index + 1);
                    });
                } else if (done) {
                    done(error);
                }
            };
            solveAnItem(0);
        },

        init: (data, done) => {
            const keys = Object.keys(data);
            const solveAnItem = index => {
                if (index < keys.length) {
                    let key = keys[index],
                        value = data[key];
                    model.findOne({ key }, (error, item) => {
                        if (error) {
                            console.error('Init setting (' + key + ') has errors!');
                            solveAnItem(index + 1);
                        } else if (item) {
                            solveAnItem(index + 1);
                        } else {
                            model.create({ key, value }, (error, item) => {
                                if (error || item == null) {
                                    console.error('Init setting (' + key + ') has errors!');
                                } else {
                                    solveAnItem(index + 1);
                                }
                            });
                        }
                    });
                } else if (done) {
                    done();
                }
            };
            solveAnItem(0);
        }
    };
};