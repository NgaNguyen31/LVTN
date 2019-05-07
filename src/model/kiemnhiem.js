module.exports = app =>{
    const schema = app.db.Schema({
        MS_NV: { type: app.db.Schema.ObjectId, 
                ref: 'cbcnv',
                index: {
                    unique: true,
                    dropDups: true
                }
                },
        MS_BM: [{ type: app.db.Schema.ObjectId, ref: 'bomon' }],
        MS_CVU: [{ type: app.db.Schema.ObjectId, ref: 'chucvu' }],      
        NGAY_CVU: Date
    });
    const model = app.db.model('kiemnhiem',schema);

    app.model.KIEM_NHIEM = {
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
                model.find(condition).sort({ _id: 1 }).populate(['MS_NV', 'MS_BM', 'MS_CVU']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
                    result.list = list;
                    done(error, result);
                });
            }
        }),
        getAll: (done) => model.find({},done),
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