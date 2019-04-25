module.exports = app => {
    const schema = app.db.Schema({
        TEN_BM: {
            type: String,
            index: {
                unique: true,
                dropDups: true
            }
        },
        TEN_TIENG_ANH: {
            type: String,
            index: {
                unique: true,
                dropDups: true
            }
        },
        MS_KHOA: [{ type: app.db.Schema.ObjectId, ref: 'khoa' }],
        NAM_THANH_LAP: Number,
        GHI_CHU: String
    });
    const model = app.db.model('bomon',schema);

    app.model.bomon = {
        create: (data, done) => model.create(data,done),
        getPage: (pageNumber, pageSize, condition, done) => model.countDocuments(condition, (error, totalItem) => {
            if (error) {
                done(error);
            } else {
                let result = {
                    totalItem,
                    pageSize,
                    pageTotal: Math.ceil(totalItem / pageSize)
                };
                result.pageNumber = pageNumber === -1 ? result.pageTotal : Math.min(pageNumber, result.pageTotal);

                const skipNumber = (result.pageNumber > 0 ? result.pageNumber - 1 : 0) * result.pageSize;
                model.find(condition).sort({ _id: 1 }).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
                    result.list = list;
                    done(error, result);
                });
            }
        }),
        getAll: (done) => model.find({}).sort({ _id: -1}).exec({done}),
        get: (_id,done) => model.findById(_id,done),
        update: (_id, changes, done) => model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done),
        delete: (_id, done) => model.findById(_id, (error, item) => {
            if (error) {
                done(error);
            } else if (item == null) {
                done('Không có ID!');
            } else {
                item.remove(done);
            }
        }),
    };
};