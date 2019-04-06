module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : [{ type: app.db.Schema.ObjectId, ref: 'ALL_CBCNV' }],
        STT: Number,
        TEN: String,
        NAM_SINH: Number,
        CVU: [{ type: app.db.Schema.ObjectId, ref: 'CHUC_VU' }],
        CTAC: String
    });
    const model = app.db.model('QT_CAC_CON', schema);

    app.model.QT_CAC_CON = {
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
        delete: (condition, done) => model.findOne(condition, done),
    };
};