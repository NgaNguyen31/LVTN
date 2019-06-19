module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : { type: app.db.Schema.ObjectId, ref: 'cbcnv' },
        N_NGU: { type: app.db.Schema.ObjectId, ref: 'ngoaingu' },
        TRINH_DO: String,
        GHI_CHU: String,
    });
    const model = app.db.model('qt_nngu', schema);

    app.model.qt_nngu = {
        create: (data, done) => { model.find({
            $or : [
                {
                    MS_NV: data.MS_NV,
                    N_NGU: data.N_NGU,
                    TRINH_DO: data.TRINH_DO
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
                model.find(condition).sort({ _id: 1 }).populate(['MS_NV', 'N_NGU']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
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
                        N_NGU: data.N_NGU,
                        TRINH_DO: data.TRINH_DO
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