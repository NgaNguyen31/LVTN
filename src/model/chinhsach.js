module.exports = app =>{
    const schema = app.db.Schema({
        MS_CS: String,
        TEN_CS: String
    });
    const model = app.db.model('chinhsach',schema);

    app.model.chinhsach = {
        create: (data, done) => {
            model.find({
                $or : [
                    {
                        MS_CS: data.MS_CS                       
                    }, {
                        TEN_CS: data.TEN_CS                       
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
        getAll: (done) => model.find({},done),
        get: (_id, done) => model.findById(_id, done),
        delete: (_id, done) => model.findById(_id, (error, item) => {
            if (error) {
                done(error);
            } else if (item == null) {
                done('Invalid Id!');
            } else {
                item.remove(done);
            }
        }),
        update: (_id, changes ,done) => {
            model.find({
                $or : [
                    {
                        MS_CS: changes.MS_CS                       
                    }, {
                        TEN_CS: changes.TEN_CS                       
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
    };
    
};