module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : [{ type: app.db.Schema.ObjectId, ref: 'cbcnv' }],
        STT: Number,
        QD_BO_NHIEM: String,
        NGAY_QD_BNHIEM: Date,        
        MA_CV: [{ type: app.db.Schema.ObjectId, ref: 'chucvu' }],
        CHUC_VU: String,
        HE_SO_PCCV: Number,
        NGAY_BO_NHIEM: Date,
        GHI_CHU_BHXH: String,
        NGAY_THOICV: Date,
        QD_THOI_CVU: String,
        NGAY_QD_THOI_CV: Date,
        MS_BOMON: [{ type: app.db.Schema.ObjectId, ref: 'bomon' }],
        GHI_CHU: String
    });
    const model = app.db.model('qt_cvu', schema);

    app.model.qt_cvu = {
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
                model.find(condition).sort({ _id: 1 }).populate(['MS_NV', 'MA_CV', 'MS_BOMON']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
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
                done('Invalid Id!');
            } else {
                item.remove(done);
            }
        }),
    };
};