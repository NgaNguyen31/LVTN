module.exports = app => {
    const schema = app.db.Schema({
        eventId: app.db.Schema.Types.ObjectId,
        userId: app.db.Schema.Types.ObjectId,
        email: String,
        phoneNumber: String,
        contactName: String, // Họ và tên người liên hệ
        name: String, // Tên đơn vị
        displayName: String, // Tên đơn vị thể hiện trên gian hàng
        address: String, // Địa chỉ
        taxCode: String, // Mã số thuế
        createdDate: { type: Date, default: Date.now },
        locked: Boolean // TODO: Khóa dữ liệu, không cho người dùng sửa
    });
    const model = app.db.model('Register', schema);

    app.model.register = {
        create: (data, done) => {
            data.createdDate = new Date();
            model.create(data, done)
        },

        getAll: (done) => {
            model.find({}).sort({ _id: -1 }).exec(done);
        },

        getPage: (pageNumber, pageSize, condition, done) => {
            model.countDocuments(condition, (error, totalItem) => {
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
                    model.find(condition).sort({ _id: -1 }).skip(skipNumber).limit(result.pageSize).exec((error, items) => {
                        result.list = error ? [] : items;
                        done(error, result);
                    });
                }
            });
        },

        get: (_id, done) => {
            model.findById(_id, done);
        },

        getByEventUserId: (eventId, userId, done) => {
            model.findOne({ eventId, userId }, done);
        },

        getByName: (name, done) => {
            model.findOne({ name }, done);
        },

        update: (_id, changes, done) => {
            model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done);
        },

        delete: (_id, done) => {
            model.remove({ _id }, done);
        },
    };
};