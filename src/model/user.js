module.exports = app => {
    const schema = app.db.Schema({
        firstname: String,
        lastname: String,
        sex: String, //gender
        email: String,
        password: String,
        phoneNumber: String,
        image: String,
        role: { type: String, enum: ['admin', 'editor', 'user'] },

        active: { type: Boolean, default: false },
        createdDate: Date,
        token: String,
        tokenDate: Date
    });
    schema.methods.equalPassword = function (password) {
        return app.crypt.compareSync(password, this.password);
    };
    const model = app.db.model('User', schema);

    app.model.user = {
        hashPassword: password => app.crypt.hashSync(password, app.crypt.genSaltSync(8), null),

        auth: (email, password, done) => model.findOne({ email }, (error, user) =>
            done(error == null && user != null && user.equalPassword(password) ? user : null)),

        create: (data, done) => app.model.user.getByEmail(data.email, (error, user) => {
            if (error) {
                if (done) done(error);
            } else if (user) {
                if (done) done('Email bạn dùng đã được đăng ký!', user);
            } else {
                data.createdDate = new Date();
                data.tokenDate = new Date();
                data.token = 'new'; //app.getToken(8);
                data.password = app.model.user.hashPassword(data.password);
                if (data.active === undefined) data.active = false;

                model.create(data, (error, user) => {
                    if (error) {
                        done && done(error);
                    } else {
                        if (app.data && app.data.numberOfUser) app.data.numberOfUser++;

                        user.image = '/img/user/' + user._id + '.jpg';
                        const srcPath = app.path.join(app.publicPath, '/img/avatar.jpg'),
                            destPath = app.path.join(app.publicPath, user.image);
                        app.fs.copyFileSync(srcPath, destPath);
                        user.save((error, user) => done && done(error, user));
                    }
                });
            }
        }),

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
                model.find(condition).sort({
                    _id: 1
                }).skip(skipNumber).limit(result.pageSize).exec((error, users) => {
                    result.list = (error ? [] : users).map(user => app.clone(user, {
                        password: ''
                    }));
                    done(error, result);
                });
            }
        }),

        get: (_id, done) => model.findById(_id, done),
        getAll: done => model.find({}, done),

        getByEmail: (email, done) => model.findOne({ email }, done),

        getByPhoneNumber: (phoneNumber, done) => model.findOne({ phoneNumber }, done),

        update: (_id, changes, done) => {
            const updateProfile = () => {
                if (changes.password) changes.password = app.model.user.hashPassword(changes.password);
                model.findOneAndUpdate({
                    _id
                }, {
                        $set: changes
                    }, {
                        new: true
                    }, done);
            };

            if (changes.email) {
                model.findOne({
                    email: changes.email
                }, (error, user) => {
                    if (error) {
                        done('Có lỗi xảy ra khi thay đổi mật khẩu!');
                    } else if (user && user._id != _id) {
                        done('Email của bạn đã được sử dụng!');
                    } else {
                        updateProfile();
                    }
                });
            } else {
                updateProfile();
            }
        },

        delete: (_id, done) => model.findById(_id, (error, item) => {
            if (error) {
                done(error);
            } else if (item == null) {
                done('Invalid Id!');
            } else {
                if (app.data && app.data.numberOfUser) app.data.numberOfUser--;
                app.deleteImage(item.image);
                item.remove(done);
            }
        }),

        count: (condition, done) => done ? model.countDocuments(condition, done) : model.countDocuments({}, condition),
    };

    app.createDebugUser();
};