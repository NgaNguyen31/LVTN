module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : { type: app.db.Schema.ObjectId, ref: 'cbcnv' },
        STT: Number,
        QD_BO_NHIEM: String,
        NGAY_QD_BNHIEM: Date,        
        MA_CV: { type: app.db.Schema.ObjectId, ref: 'chucvu' },
        HE_SO_PCCV: Number,
        NGAY_BO_NHIEM: Date,
        GHI_CHU_BHXH: String,
        NGAY_THOICV: Date,
        QD_THOI_CVU: String,
        NGAY_QD_THOI_CV: Date,
        MS_BOMON: { type: app.db.Schema.ObjectId, ref: 'bomon' },
        GHI_CHU: String
    });
    const model = app.db.model('qt_cvu', schema);

    app.model.qt_cvu = {
        create: (data, done) => { model.find({
            $or : [
                {
                    MS_NV: data.MS_NV,
                    MA_CV: data.MA_CV 
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
                model.find(condition).sort({ _id: 1 }).populate(['MS_NV', 'MA_CV', 'MS_BOMON']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
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
                        MA_CV: changes.MA_CV
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