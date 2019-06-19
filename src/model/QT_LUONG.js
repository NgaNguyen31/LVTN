module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : { type: app.db.Schema.ObjectId, ref: 'cbcnv' },
        STT: Number,
        QD_luong: String,
        Ngay_QD: Date,
        Ngay_huong: Date,
        Moc_nang_luong: Date,
        Ngach: { type: app.db.Schema.ObjectId, ref: 'ngach' },
        Heso: Number,
        Bac: Number,
        PT_Vuot_Khung: Number,
        LG_Khoan_Chinh: Number,
        Ty_le:Number,
        GHI_CHU_LUONG: String,
        GHI_CHU_KHAC: String
    });
    const model = app.db.model('qt_luong', schema);

    app.model.qt_luong = {
        create: (data, done) => {
            model.findOne(data, (error, item) => {
                if (error) {
                    if (done) done(error);
                } else if (item) {
                    if (done) done('Exist', item);
                } else {
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
                model.find(condition).sort({ _id: 1 }).populate(['MS_NV', 'Ngach']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
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
        update: (_id, changes, done) => {model.findOne(changes, (error, item) => {
            if (error) {
                if (done) done(error);
            } else if (item) {
                if (done) done('Exist', item);
            } else {
                model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done)
            }
        })            
    },
        delete: (_id, done) => model.findById(_id, (error, item) => {
            if (error) {
                done(error);
            } else if (item == null) {
                done('Không tồn tại Id!');
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