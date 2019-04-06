module.exports = app => {
    const schema = app.db.Schema ({
        STT: Number,
        MSNV : [{ type: app.db.Schema.ObjectId, ref: 'ALL_CBCNV' }],
        HO: String,
        TEN: String,
        SO_QUYET_DINH: String,
        Ngay_QUYET_DINH: Date,
        DON_VI: String,
        NGAY_DI: Date,
        NGAY_VE: Date,
        NGAY_VE_THUC: Date,
        SO_QD_TIEP_NHAN: String,
        NGAY_QD_TIEP_NHAN: Date,
        MUC_DICH: [{ type: app.db.Schema.ObjectId, ref: 'MUC_DICH' }],
        NOI_DUNG: String,
        NGANH_HOC: String,
        GIA_HAN: Boolean,
        NUOC_DEN: [{ type: app.db.Schema.ObjectId, ref: 'NUOC' }],
        NOI_DEN: String,
        CHI_PHI:String,
        GHI_CHU: String,
        HOAN_TRA_KP_BHXH: String,
        NGAY_NHAP: Date,
        BHXH: String,
        FIELD2: String
    });
    const model = app.db.model('QT_NNGOAI', schema);

    app.model.QT_NNGOAI = {
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