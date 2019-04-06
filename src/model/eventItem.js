module.exports = app => {
    const schema = app.db.Schema({
        eventId: app.db.Schema.Types.ObjectId,
        userId: app.db.Schema.Types.ObjectId,
        name: String,
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        accepted: { type: Boolean, default: false },
        locked: { type: Boolean, default: false } // TODO: Khóa dữ liệu, không cho người dùng sửa
    });
    const model = app.db.model('EventItem', schema);

    app.model.eventItem = {
        create: (data, done) => model.create(data, done),

        getAll: (done) => {
            model.find({}).sort({
                _id: -1
            }).exec(done);
        },

        get: (_id, done) => {
            model.findOne({
                _id
            }, done);
        },

        getByEventId: (eventId, done) => {
            model.find({
                eventId
            }).sort({
                _id: 1
            }).exec(done);
        },

        getByEventUserId: (eventId, userId, done) => {
            model.find({
                eventId,
                userId
            }).sort({
                _id: 1
            }).exec(done);
        },

        update: (_id, changes, done) => {
            model.findOneAndUpdate({
                _id
            }, {
                    $set: changes
                }, {
                    new: true
                }, done);
        },

        updateRegister: (eventId, userId, ids, done) => {
            model.updateMany({
                eventId,
                userId,
                accepted: {
                    $ne: true
                },
                locked: {
                    $ne: true
                }
            }, {
                    $set: {
                        userId: null
                    }
                }, error => {
                    model.updateMany({
                        _id: {
                            $in: ids
                        },
                        eventId,
                        userId: null,
                        accepted: {
                            $ne: true
                        },
                        locked: {
                            $ne: true
                        }
                    }, {
                            $set: {
                                userId
                            }
                        }, (error) => {
                            if (error) {
                                done(error);
                            } else {
                                model.find({
                                    eventId,
                                    userId
                                }).sort({
                                    _id: 1
                                }).exec(done);
                            }
                        });
                });
        },

        delete: (_id, done) => {
            model.remove({
                _id
            }, done);
        },
    };
};