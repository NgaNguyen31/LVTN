module.exports = app => {
    const schema = app.db.Schema({
        ten_bm: String,   
        ten_tieng_anh: String,
        ms_khoa: [{ type: app.db.Schema.ObjectId, ref: 'khoa' }],        
        nam_thanh_lap: String,
        ghi_chu: String
    });
    const model = app.db.model('bomon',schema);

    
    app.model.bomon = {
        create: (data, done) => {
            model.find({
                $or : [
                    {
                        ten_bm: data.ten_bm,                    
                    }, {
                        ten_tieng_anh: data.ten_tieng_anh,
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
                        TEN_KHOA: changes.TEN_KHOA,                      
                    }, {
                        ten_tieng_anh: changes.ten_tieng_anh,
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
                done('Không có ID!');
            } else {
                item.remove(done);
            }
        }),
    };
};