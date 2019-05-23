module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : { type: app.db.Schema.ObjectId, ref: 'cbcnv' },
        STT: Number,
        NAM: Date,
        HINH_THUC: String,
        CAP_KL: String,
        LY_DO: String,
        GHI_CHU: String,
        SO_QD: String,
        NGAY_QD:Date,
        FIELD1: String
    });
    const model = app.db.model('qt_ky_luat', schema);

    app.model.qt_ky_luat = {
        create: (data, done) => {
            model.findOne(data, (error, item) => {
                if (error) {
                    if (done) done(error);
                } else if (item) {
                    if (done) done('Exist', item);
                } else {
                    model.create(data,done);
                }
            })
        },
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
                model.find(condition).sort({ _id: 1 }).populate(['MS_NV']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
                    result.list = list;
                    done(error, result);
                });
            }
        }),
        getAll: (done) => model.find({}).sort({ _id: -1}).exec({done}),
        get: (_id,done) => model.findById(_id,done),
        update: (_id, changes, done) => {model.findOne(changes, (error, item) => {
            if (error) {
                if (done) done(error);
            } else if (item) {
                if (done) done('Exist', item);
            } else {
                model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done)
            }
        })            
    },
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