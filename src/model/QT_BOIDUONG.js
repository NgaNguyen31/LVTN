module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : { type: app.db.Schema.ObjectId, ref: 'cbcnv' },
        STT: Number,
        TU_NAM: Date,
        DEN_NAM: Date,
        NOI_DUNG_BD: String,
        NOI_BOI_DUONG: String,
        HINH_THUC: String,
        CHUNG_CHI: String,
        NOP_CC: String,
        GHI_CHU: String
    });
    const model = app.db.model('qt_boiduong', schema);

    app.model.qt_boiduong = {
        create: (data, done) => { model.find({
            $or : [
                {
                    MS_NV: data.MS_NV,
                    NOI_DUNG_BD: data.NOI_DUNG_BD 
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
                        if(element.MS_NV == null ){
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
        getAll: (done) => model.find({},done),
        get: (_id,done) => model.findById(_id,done),
        update: (_id, changes, done) => {
            model.find({
                $or : [
                    {
                        MS_NV: changes.MS_NV,
                        NOI_DUNG_BD: changes.NOI_DUNG_BD
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
                    items.filter(i => i._id != _id).map((it, idx) => {
                        it.STT = idx + 1;
                        it.save();
                   });
                    item.remove(done);     
                })
                }
            }
        ),
    };
};