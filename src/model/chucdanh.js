module.exports = app =>{
    const schema = app.db.Schema({
        chuc_danh: String,
        ten_day_du: String,
        ord: { type: app.db.Schema.ObjectId, ref: 'trinhdo' },
    });
    const model = app.db.model('chucdanh',schema);

    app.model.chucdanh = {
        create: (data, done) => {
            model.find({
                $and : [
                    {
                        chuc_danh: data.chuc_danh,                       
                    }, {
                        ten_day_du: data.ten_day_du,
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
                model.find(condition).sort({ _id: 1 }).populate(['ord']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
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
                        chuc_danh: changes.chuc_danh                       
                    }, {
                        ten_day_du: changes.ten_day_du                       
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