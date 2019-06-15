module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : { type: app.db.Schema.ObjectId, ref: 'cbcnv' },
        STT: Number,
        DE_TAI: String,
        CHU_NHIEM_DE_TAI: String,
        CAP: String,
        NGAY_KETTHUC: Date,
        NAM: Date
    });
    const model = app.db.model('qt_dtai', schema);

    app.model.qt_dtai = {
        create: (data, done) => { model.find({
            $or : [
                {
                    MS_NV: data.MS_NV,
                    CAP: data.CAP, 
                    DE_TAI: data.DE_TAI,
                    CHU_NHIEM_DE_TAI: data.CHU_NHIEM_DE_TAI
                }
            ]
            }, (error, items) => {
            if (items.length > 0) {
                if (done) done('Exist', items);
            }
            else{
                model.find({
                    $or : [
                        {
                            MS_NV: data.MS_NV
                        }]
                    }, (error, itemcounts) => {
                    if (itemcounts.length > 0) {
                        data.STT = itemcounts.length + 1;                
                    }
                    else{
                        data.STT = 1;
                    }
                    model.create(data,done);
                })         
    }})},
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
                    list.forEach(element => {
                        if(element.MS_NV == null){
                            model.findOne({_id: element._id}, function(error,docs){
                                docs.remove();
                            })
                        }                        
                    });
                    result.list = list;
                    done(error, result);
                });
            }
        }),
        getAll: (done) => model.find({}).sort({ _id: -1}).exec({done}),
        get: (_id,done) => model.findById(_id,done),
        update: (_id, changes, done) => {
            model.find({
                $or : [
                    {
                        MS_NV: changes.MS_NV,
                        CAP: changes.CAP, 
                        DE_TAI: changes.DE_TAI,
                        CHU_NHIEM_DE_TAI: changes.CHU_NHIEM_DE_TAI
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
                model.find({MS_NV: item.MS_NV}, (error,items) => { 
                    index = 1 ;
                    items.forEach(element => {
                        if (element.DE_TAI != item.DE_TAI) {
                            item.STT = 0;
                            item.STT += index;    
                            index++;              
                        }  
                        model.findOneAndUpdate({ _id: element._id }, { $set: {STT:item.STT} }, { new: true }, done)                                                     
                    });                                          
                })                                 
                item.remove(done); 
            }
        }),
    };
};