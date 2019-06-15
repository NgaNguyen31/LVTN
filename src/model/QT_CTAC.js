module.exports = app => {
    const schema = app.db.Schema ({
        MS_NV : { type: app.db.Schema.ObjectId, ref: 'cbcnv' },
        STT: Number,
        TU_NAM: Date,
        DEN_NAM: Date,
        CHUC_VU: String,
        NOI_CONG_TAC: String,
        BO_MON_CT: String,
        CONG_VIEC: String,
        GHI_CHU: String
    });
    const model = app.db.model('qt_ctac', schema);

    app.model.qt_ctac = {
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
        getAll: (done) => model.find({},done),
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
                done('Invalid Id!');
            } else {
                model.find({MS_NV: item.MS_NV}, (error,items) => { 
                    index = 1 ;
                    items.forEach(element => {
                        if (element.BAI_BAO != item.BAI_BAO) {
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