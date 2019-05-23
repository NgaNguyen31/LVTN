module.exports = app =>{
    const schema = app.db.Schema({
        TEN_KHOA: String,
        TEN_TIENG_ANH: String,
        TEN_KHOA_TAT: String
    });
    const model = app.db.model('khoa',schema);

    app.model.khoa = {
        create: (data, done) => {
            model.find({
                $or : [
                    {
                        TEN_KHOA: data.TEN_KHOA                        
                    }
                    , {      
                        TEN_TIENG_ANH: data.TEN_TIENG_ANH
                    }, {
                        TEN_KHOA_TAT: data.TEN_KHOA_TAT
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
                        TEN_KHOA: changes.TEN_KHOA                        
                    }
                    , {      
                        TEN_TIENG_ANH: changes.TEN_TIENG_ANH
                    }, {
                        TEN_KHOA_TAT: changes.TEN_KHOA_TAT
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