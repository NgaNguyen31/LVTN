module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : { type: app.db.Schema.ObjectId, ref: 'cbcnv' },
        STT: Number,
        BAI_BAO: String,
        TEN_TCHI: String,
        NAM: Date
    });
    const model = app.db.model('qt_bbao', schema);

    app.model.qt_bbao = {
        create: (data, done) => { model.find({
            $or : [
                {
                    MS_NV: data.MS_NV,
                    BAI_BAO: data.BAI_BAO 
                }
            ]
            }, (error, items) => {
            if (items.length > 0) {
                if (done) done('Exist', items);
            }
            else{
                model.create(data,done)
            }})         
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
        getAll: (done) => model.find({},done),
        get: (_id,done) => model.findById(_id,done),
        update: (_id, changes, done) => {
            model.find({
                $or : [
                    {
                        MS_NV: changes.MS_NV,
                        BAI_BAO: changes.BAI_BAO
                    }
                ]
                }, (error, items) => {
                if (items.length > 0) {
                    if (done) done('Exist', items);
                }
                else{
                    model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done)
                }})         
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