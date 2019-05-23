module.exports = app => {
    const schema = app.db.Schema({
        TEN_BM: String,   
        TEN_TIENG_ANH: String,
        MS_KHOA: [{ type: app.db.Schema.ObjectId, ref: 'khoa' }],
        NAM_THANH_LAP: Date,
        GHI_CHU: String
    });
    const model = app.db.model('bomon',schema);

    app.model.bomon = {
        create: (data, done) => {
            model.find({
                $or : [
                    {
                        TEN_BM: data.TEN_BM                     
                    }, {
                        TEN_TIENG_ANH: data.TEN_TIENG_ANH
                    }
                ]
            }, (error, items) => {
                if (items.length > 0) {
                    if (done) done('Exist', items);
                }
                else{
                    model.create(data,done);
                }
            })},
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
                model.find(condition).sort({ _id: 1 }).populate('MS_KHOA').skip(skipNumber).limit(result.pageSize).exec((error, list) => {
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
                        TEN_KHOA: changes.TEN_KHOA                        
                    }, {
                        TEN_TIENG_ANH: changes.TEN_TIENG_ANH
                    }
                ]
            }, (error, items) => {
                if (items.length > 0) {
                    if (done) done('Exist', items);
                }
                else{
                    model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, (error, item) => {
                        done(error, item);
                    })
                }
            })},
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