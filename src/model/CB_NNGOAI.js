module.exports = app =>{
    const schema = app.db.Schema({
        hovaten: {type: app.db.Schema.ObjectId, ref: 'cbcnv'},
        Nuoc: {type: app.db.Schema.ObjectId, ref: 'nuocngoai'},
        Ngaydi: Date,
        Ngayve: Date,
        Thoigian: Number,
        Mucdich: String,
        Giahan: String,
        SoCVan: Number,
        NgayCVan: Date
    });
    const model = app.db.model('cb_nngoai',schema);

    app.model.cb_nngoai = {
        create: (data, done) => {
            model.find({
                $or : [
                    {
                        Hovaten: data.Hovaten   ,
                        Nuoc: data.Nuoc   ,
                        Ngaydi: data.Ngaydi  ,
                        Ngayve: data.Ngayve                
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
                model.find(condition).sort({ _id: 1 }).populate(['Hovaten', 'Nuoc']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
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
                        Hovaten: changes.Hovaten,  
                        Nuoc: changes.Nuoc, 
                        Ngaydi: changes.Ngaydi,
                        Ngayve: changes.Ngayve                     
                    }
                ]
            }, (error, items) => {
                if (items.length > 0) {
                    if(done) done('Exist', items);
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

        count: (condition, done) => done ? model.countDocuments(condition, done) : model.countDocuments({}, condition),
    };
};