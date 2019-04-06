module.exports = app => {
    app.get('/admin/job/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.job.getPage(pageNumber, pageSize, {}, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách việc làm không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.post('/admin/job/default', app.role.isAdmin, (req, res) =>
        app.model.job.create({ title: 'Việc làm', active: false }, (error, item) => res.send({ error, item })));

    app.delete('/admin/job', app.role.isAdmin, (req, res) => app.model.job.delete(req.body._id, error => res.send({ error })));

    app.put('/admin/job/swap', app.role.isAdmin, (req, res) => {
        const isMoveUp = req.body.isMoveUp.toString() == 'true';
        app.model.job.swapPriority(req.body._id, isMoveUp, error => res.send({ error }));
    });

    app.put('/admin/job', app.role.isAdmin, (req, res) =>
        app.model.job.update(req.body._id, req.body.changes, (error, item) => res.send({ error, item })));

    app.get('/admin/job/item/:jobId', app.role.isAdmin, (req, res) => app.model.category.getAll('job', (error, categories) => {
        if (error) {
            res.send({ error });
        } else {
            app.model.job.get(req.params.jobId, (error, item) => {
                res.send({
                    error,
                    categories: categories.map(item => ({ id: item._id, text: item.title })),
                    item
                });
            });
        }
    }));


    // Editor ---------------------------------------------------------------------------------------------------------------------------------------
    app.get('/editor/job/page/:pageNumber/:pageSize', app.role.isEditor, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.job.getPage(pageNumber, pageSize, {}, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách việc làm không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    // app.post('/editor/job/default', app.role.isEditor, (req, res) => {
    //     app.model.job.create({ title: 'Việc làm', active: false }, (error, item) => res.send({ error, item }));
    // });

    app.put('/editor/job/swap', app.role.isEditor, (req, res) => {
        const isMoveUp = req.body.isMoveUp.toString() == 'true';
        app.model.job.swapPriority(req.body._id, isMoveUp, error => res.send({ error }));
    });

    app.put('/editor/job/active', app.role.isEditor, (req, res) => {
        const active = req.body.active.toString() == 'true';
        app.model.job.update(req.body._id, { active }, error => res.send({ error }));
    });

    // app.put('/editor/job', app.role.isEditor, (req, res) => {
    //     app.model.job.update(req.body._id, req.body.changes, (error, item) => res.send({ error, item }));
    // });

    app.get('/editor/job/item/:jobId', app.role.isEditor, (req, res) => {
        app.model.category.getAll('job', (error, categories) => {
            if (error) {
                res.send({ error });
            } else {
                app.model.job.get(req.params.jobId, (error, item) => {
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
    app.get('/job/page/:pageNumber/:pageSize', (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize),
            today = new Date(), yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const condition = {
            $or: [{ startPost: null }, { startPost: { $exists: false } }, { startPost: { $lte: today } },],
            $or: [{ stopPost: null }, { stopPost: { $exists: false } }, { stopPost: { $gte: yesterday } },],
            active: true
        };

        app.model.job.getPage(pageNumber, pageSize, condition, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách việc làm không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.get('/job/page/:pageNumber/:pageSize/:categoryType', (req, res) => {
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

        app.model.job.getPage(pageNumber, pageSize, condition, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách việc làm không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.get('/job/item/id/:jobId', (req, res) =>
        app.model.job.readById(req.params.jobId, (error, item) => res.send({ error, item })));
    app.get('/job/item/link/:jobLink', (req, res) =>
        app.model.job.readByLink(req.params.jobLink, (error, item) => res.send({ error, item })));

    app.put('/job/item/check-link', (req, res) => app.model.job.getByLink(req.body.link, (error, item) =>
        res.send({ error: error ? 'Lỗi hệ thống' : (item == null || item._id == req.body._id) ? null : 'Link không hợp lệ' })));
};