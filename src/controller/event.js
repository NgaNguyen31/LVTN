module.exports = app => { // TODO: User register. User register list.
    app.get('/admin/event/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.event.getPage(pageNumber, pageSize, {}, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách sự kiện không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.post('/admin/event/default', app.role.isAdmin, (req, res) =>
        app.model.event.create({ title: 'Sự kiện', active: false }, (error, item) => res.send({ error, item })));

    app.delete('/admin/event', app.role.isAdmin, (req, res) => app.model.event.delete(req.body._id, error => res.send({ error })));

    app.put('/admin/event/swap', app.role.isAdmin, (req, res) => {
        const isMoveUp = req.body.isMoveUp.toString() == 'true';
        app.model.event.swapPriority(req.body._id, isMoveUp, error => res.send({ error }));
    });

    app.put('/admin/event', app.role.isAdmin, (req, res) =>
        app.model.event.update(req.body._id, req.body.changes, (error, item) => res.send({ error, item })));

    app.get('/admin/event/item/:eventId', app.role.isAdmin, (req, res) => app.model.category.getAll('event', (error, categories) => {
        if (error || categories == null) {
            res.send({ error: 'Lỗi khi lấy danh mục!' });
        } else {
            app.model.event.get(req.params.eventId, (error, item) => {
                res.send({
                    error,
                    categories: categories.map(item => ({ id: item._id, text: item.title })),
                    item
                });
            });
        }
    }));


    // Editor ---------------------------------------------------------------------------------------------------------------------------------------
    app.get('/editor/event/page/:pageNumber/:pageSize', app.role.isEditor, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.event.getPage(pageNumber, pageSize, {}, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách sự kiện không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    // app.post('/editor/event/default', app.role.isEditor, (req, res) => {
    //     app.model.event.create({ title: 'Sự kiện', active: false }, (error, item) => res.send({ error, item }));
    // });

    app.put('/editor/event/swap', app.role.isEditor, (req, res) => {
        const isMoveUp = req.body.isMoveUp.toString() == 'true';
        app.model.event.swapPriority(req.body._id, isMoveUp, error => res.send({ error }));
    });

    app.put('/editor/event/active', app.role.isEditor, (req, res) => {
        const active = req.body.active.toString() == 'true';
        app.model.event.update(req.body._id, { active }, error => res.send({ error }));
    });

    // app.put('/editor/event', app.role.isEditor, (req, res) => {
    //     app.model.event.update(req.body._id, req.body.changes, (error, item) => res.send({ error, item }));
    // });

    app.get('/editor/event/item/:eventId', app.role.isEditor, (req, res) => {
        app.model.category.getAll('event', (error, categories) => {
            if (error || categories == null) {
                res.send({ error: 'Lỗi khi lấy danh mục!' });
            } else {
                app.model.event.get(req.params.eventId, (error, item) => {
                    res.send({
                        error,
                        categories: categories.map(item => ({ id: item._id, text: item.title })),
                        item
                    });
                });
            }
        });
    });


    // Home -----------------------------------------------------------------------------------------------------------------------------------------
    app.get('/event/page/:pageNumber/:pageSize', (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize),
            today = new Date(), yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const condition = {
            $or: [{ startPost: null }, { startPost: { $exists: false } }, { startPost: { $lte: today } },],
            $or: [{ stopPost: null }, { stopPost: { $exists: false } }, { stopPost: { $gte: yesterday } },],
            active: true
        };

        app.model.event.getPage(pageNumber, pageSize, condition, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách sự kiện không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.get('/event/page/:pageNumber/:pageSize/:categoryType', (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize),
            today = new Date(), yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const condition = {
            categories: req.params.categoryType,
            $or: [{ startPost: null }, { startPost: { $exists: false } }, { startPost: { $lte: today } },],
            $or: [{ stopPost: null }, { stopPost: { $exists: false } }, { stopPost: { $gte: yesterday } },],
            active: true
        };

        app.model.event.getPage(pageNumber, pageSize, condition, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách sự kiện không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.get('/event/item/id/:eventId', (req, res) => {
        app.model.event.readById(req.params.eventId, (error, item) => res.send({ error, item }));
    });
    app.get('/event/item/link/:link', (req, res) => {
        app.model.event.readByLink(req.params.link, (error, item) => res.send({ error, item }));
    });

    app.put('/event/item/check-link', (req, res) => {
        app.model.event.getByLink(req.body.link, (error, item) => {
            res.send({
                error: error ? 'Lỗi hệ thống' : (item == null || item._id == req.body._id) ? null : 'Link không hợp lệ'
            });
        });
    });
};