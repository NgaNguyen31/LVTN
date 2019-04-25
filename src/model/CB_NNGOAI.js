module.exports = app =>{
    const schema = app.db.Schema({
        Hovaten: { type: app.db.Schema.ObjectId, ref: 'cbcnv' },
        Nuoc: [{ type: app.db.Schema.ObjectId, ref: 'nuoc' }],
        Ngaydi: Date,
        Ngayve: Date,
        Thoigian: Number,
        Mucdich: String,
        Giahan: Number,
        SoCVan: Number,
        NgayCVan: Date
    },
    { unique: true });
    const model = app.db.model('cb_nngoai',schema);

    app.model.cb_nngoai = {
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
                done('Invalid Id!');
            } else {
                item.remove(done);
            }
        }),
    };
};