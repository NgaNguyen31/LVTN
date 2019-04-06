module.exports = app => {
    const schema = app.db.Schema({
        MSNV: Number,
        HO: String,
        TEN: String,
        NGAY_SINH: Date,
        NOI_SINH: String,
        NGAY_VAO: Date,
        NGAY_NGHI: Date,
        TRINH_DO: [{ type: app.db.Schema.ObjectId, ref: 'TRINH_DO' }],
        DON_VI: String,
        DIA_CHI: String,
        GHI_CHU: String
    });
    const model = app.db.model('CBCNV_HD_DV_tu_tra',schema);

    app.model.CBCNV_HD_DV_tu_tra = {
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