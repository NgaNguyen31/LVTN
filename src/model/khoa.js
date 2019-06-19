module.exports = app =>{
    const schema = app.db.Schema({
        ten_khoa: String,
        ten_tieng_anh: String,
        ten_khoa_tat: String,
        xoa: Boolean
    });
    const model = app.db.model('khoa',schema);

    app.model.khoa = {
        create: (data, done) => {
            model.find({
                $or : [
                    {
                        ten_khoa: data.ten_khoa                        
                    }
                    , {      
                        ten_tieng_anh: data.ten_tieng_anh
                    }, {
                        ten_khoa_tat: data.ten_khoa_tat
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
                model.find(condition).sort({ _id: 1 }).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
                    result.list = list;
                    done(error, result);
                });
            }
        }),
        // getAll: (done) => model.find({}).sort({ _id: -1}).exec({done}),
        getAll: (done) => model.find({}, done),
        get: (_id,done) => model.findById(_id,done),
        update: (_id, changes, done) => {
            model.find({
                $or : [
                    {
                        ten_khoa: changes.ten_khoa                        
                    }
                    , {      
                        ten_tieng_anh: changes.ten_tieng_anh
                    }, {
                        ten_khoa_tat: changes.ten_khoa_tat
                    }
                ]
            }, (error, items) => {
                if (items.length > 0) {
                    if (done) done('Exist', items);
                }
                else{
                    model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, (error, item) => {
                        console.log(error, item);
                        done(error, item);
                    })
                }
            })},
        //     model.findOne(changes, (error, item) => {
        //         if (error) {
        //             if (done) done(error);
        //         } else if (item.TEN) {
        //             if (done) done('Exist', item);
        //         } else {
        //             model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done)
        //         }
        //     })            
        // },
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