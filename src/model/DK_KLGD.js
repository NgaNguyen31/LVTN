module.exports = app =>{
    const schema = app.db.Schema({
        MS_NV: Number,
        STT: Number,
        HO: String,
        TEN: String,
        MS_BM: [{ type: app.db.Schema.ObjectId, ref: 'ALL_BO_MON' }],
        MS_CV: [{ type: app.db.Schema.ObjectId, ref: 'CV_KLGD_(99_00)' }],
        TU_DK: String,
        NHOMLOP: String,
        SO_SV: Number,
        SO_TIET_THUC: Number,
        SO_TIET_QUY_DOI: Number,
        TU_NGAY: Date,
        DEN_NGAY: Date,
        GHI_CHU: String
    });
    const model = app.db.model('DK_KLGD',schema);

    app.model.DK_KLGD = {
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