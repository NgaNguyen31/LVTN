module.exports = app =>{
    const schema = app.db.Schema({
        MSNV: {
            type: app.db.Schema.ObjectId,
            ref: 'cbcnv',
            index: {
                unique: true,
                dropDups: true
            }
        },
        HO: String,
        TEN: String,
        Hocvi_hocham: String,
        Mon_giangday: String,
        Day_khoa: [{ type: app.db.Schema.ObjectId, ref: 'khoa' }],
        Nganh_day: String,
        Don_vi: String,
        St_day_LT_thucte: Number,
        St_day_TH: Number,
        St_qui_doi_giangday: Number,
        Slg_tieu_luan: Number,
        Tong_st_quidoi:  Number,
        Tong_cong: Number,
        Ghi_chu: String
    });
    const model = app.db.model('khoi_luong_gd_caohoc',schema);

    app.model.khoi_luong_gd_caohoc = {
        create: (data, done) => model.create(data,done),
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
                model.find(condition).sort({ _id: 1 }).populate(['MSNV', 'Day_khoa']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
                    result.list = list;
                    done(error, result);
                });
            }
        }),
        getAll: (done) => model.find({},done),
        get: (_id,done) => model.findById(_id,done),
        update: (_id, changes, done) => model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done),
        delete: (_id, done) => model.findById(_id, (error, item) => {
            if (error) {
                done(error);
            } else if (item == null) {
                done('Invalid Id!');
            } else {
                item.remove(done);
            }
        }),
    };
};