module.exports = app => {
    const schema = app.db.Schema({
        MSBM: { type: app.db.Schema.ObjectId, ref: 'bomon' },
        HO: String,
        TEN: String,
        PHAI: String,
        NAM_SINH: Date,
        The_BHYT: String,
        Noi_kham: String,
        LCB: String,
        PC: String,
        Xoa: Boolean
    });
    const model = app.db.model('cbcnv_hd_khoa',schema);

    app.model.cbcnv_hd_khoa = {
        create: (data, done) => {
            model.find({
            $or : [
                {
                    MSBM: data.MSBM,
                    HO: data.HO,
                    TEN: data.TEN                        
                }                    
            ]
            }, (error, items) => {
            if (items.length > 0) {
                if (done) done('Exist', items);
            }
            else{
                model.create(data,done)
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
                model.find(condition).sort({ _id: 1 }).populate(['MSBM']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
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
                    MSBM: changes.MSBM,                        
                    HO: changes.HO,
                    TEN: changes.TEN   
                }                    
            ]
            }, (error, items) => {
            if (items.length > 0) {
                if (done) done('Exist', items);
            }
            else{
                model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done)
            }
        })},
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