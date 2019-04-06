module.exports = app => {
    const schema = app.db.Schema({
        priority: Number,
        categories: [{ type: app.db.Schema.ObjectId, ref: 'Category' }], //[String],
        title: String,
        image: String,
        link: String,
        active: { type: Boolean, default: false },
        abstract: String,
        content: String,
        createdDate: { type: Date, default: Date.now },
        startPost: Date,
        stopPost: Date,
        view: { type: Number, default: 0 },
    });
    const model = app.db.model('News', schema);

    app.model.news = {
        create: (data, done) => {
            model.find({}).sort({ priority: -1 }).limit(1).exec((error, items) => {
                data.priority = error || items == null || items.length === 0 ? 1 : items[0].priority + 1;
                model.create(data, (error, item) => {
                    if (error) {
                        done(error);
                    } else {
                        if (app.data && app.data.numberOfNews) app.data.numberOfNews++;

                        item.image = '/img/news/' + item._id + '.jpg';
                        const srcPath = app.path.join(app.publicPath, '/img/avatar.jpg'),
                            destPath = app.path.join(app.publicPath, item.image);
                        app.fs.copyFile(srcPath, destPath, error => {
                            if (error) {
                                done(error);
                            } else {
                                item.save(done);
                            }
                        });
                    }
                });
            });
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
                model.find(condition).sort({ priority: -1 }).skip(skipNumber).limit(result.pageSize).exec((error, items) => {
                    result.list = (error ? [] : items).map(item => app.clone(item, { content: '' }));
                    done(error, result);
                });
            }
        }),

        getAll: done => model.find({}).sort({ priority: -1 }).exec(done),

        getByCategoryId: (categoryId, numberOfNews, done) => model.find({ categories: categoryId }).sort({ priority: -1 }).limit(numberOfNews).exec(done),

        getAllActive: done => model.find({ active: true }).sort({ priority: -1 }).exec((error, items) => {
            if (error) {
                done(error);
            } else {
                let news = items.map(item => {
                    item = JSON.parse(JSON.stringify(item));
                    item.content = '';
                    return item;
                });
                done(null, news);
            }
        }),

        get: (_id, done) => model.findById(_id, done),
        getByLink: (link, done) => model.findOne({ link }, done),

        read: (condition, done) => model.find(condition).populate('categories').exec((error, items) => {
            if (error) {
                done(error);
            } else if (items == null || items.length != 1) {
                done('Invalid Id!');
            } else {
                items[0].view++;
                items[0].save((error, item) => {
                    app.io.emit('news:item-view-changed', item._id, item.view);
                    done(error, item);
                });
            }
        }),
        readById: (_id, done) => app.model.news.read({ _id, active: true }, done),
        readByLink: (link, done) => app.model.news.read({ link, active: true }, done),

        update: (_id, changes, done) => model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done),

        swapPriority: (_id, isMoveUp, done) => model.findById(_id, (error, item1) => {
            if (error || item1 === null) {
                done('Invalid news Id!');
            } else {
                model.find({ priority: isMoveUp ? { $gt: item1.priority } : { $lt: item1.priority } })
                    .sort({ priority: isMoveUp ? 1 : -1 }).limit(1).exec((error, list) => {
                        if (error) {
                            done(error);
                        } else if (list == null || list.length === 0) {
                            done(null);
                        } else {
                            let item2 = list[0],
                                priority = item1.priority;
                            item1.priority = item2.priority;
                            item2.priority = priority;
                            item1.save(error1 => item2.save(error2 => done(error1 ? error1 : error2)));
                        }
                    });
            }
        }),

        delete: (_id, done) => model.findById(_id, (error, item) => {
            if (error) {
                done(error);
            } else if (item == null) {
                done('Invalid Id!');
            } else {
                if (app.data && app.data.numberOfNews) app.data.numberOfNews--;
                app.deleteImage(item.image);
                item.remove(done);
            }
        }),

        count: (condition, done) => done ? model.countDocuments(condition, done) : model.countDocuments({}, condition),
    };
};