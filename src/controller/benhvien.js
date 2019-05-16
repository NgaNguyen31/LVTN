module.exports = app => {
    app.get('/admin/benhvien/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.benhvien.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/benhvien/all', app.role.isAdmin, (req, res) => {
        app.model.benhvien.getAll((error, benhvien) => {
            if (error) res.send({error});
            else res.send({benhvien});
        })
    })

    app.post('/admin/benhvien', app.role.isAdmin, (req, res) => {
        app.model.benhvien.create(req.body.benhvien, (error, benhvien) => {
            res.send({ error, benhvien })
        });
    });

    app.put('/admin/benhvien', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.Noi_kham && data.Noi_kham != '') changes.Noi_kham = data.Noi_kham;

        app.model.benhvien.update(req.body._id, changes, (error, benhvien) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, benhvien });
            }
        })
    });

    app.delete('/admin/benhvien', app.role.isAdmin, (req, res) => {
        app.model.benhvien.delete(req.body._id, error => res.send({ error }))
    });

    // Editor ---------------------------------------------------------------------------------------------------------------------------------------
    app.get('/editor/benhvien/page/:pageNumber/:pageSize', app.role.isEditor, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.benhvien.getPage(pageNumber, pageSize, {}, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách bệnh viện không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    // app.post('/editor/benhvien/default', app.role.isEditor, (req, res) => {
    //     app.model.benhvien.create({ title: 'Việc làm', active: false }, (error, item) => res.send({ error, item }));
    // });

    // app.put('/editor/benhvien/swap', app.role.isEditor, (req, res) => {
    //     const isMoveUp = req.body.isMoveUp.toString() == 'true';
    //     app.model.benhvien.swapPriority(req.body._id, isMoveUp, error => res.send({ error }));
    // });

    app.put('/editor/benhvien/active', app.role.isEditor, (req, res) => {
        const active = req.body.active.toString() == 'true';
        app.model.benhvien.update(req.body._id, { active }, error => res.send({ error }));
    });

    // app.put('/editor/benhvien', app.role.isEditor, (req, res) => {
    //     app.model.benhvien.update(req.body._id, req.body.changes, (error, item) => res.send({ error, item }));
    // });

    app.get('/editor/benhvien/all', app.role.isEditor, (req, res) => {
        app.model.benhvien.getAll((error, benhvien) => {
            if (error) res.send({error});
            else res.send({benhvien});
        })
    })


    // Home -----------------------------------------------------------------------------------------------------------------------------------------
    app.get('/benhvien/page/:pageNumber/:pageSize', (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize),
            today = new Date(), yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const condition = {
            $or: [{ startPost: null }, { startPost: { $exists: false } }, { startPost: { $lte: today } },],
            $or: [{ stopPost: null }, { stopPost: { $exists: false } }, { stopPost: { $gte: yesterday } },],
            active: true
        };

        app.model.benhvien.getPage(pageNumber, pageSize, condition, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách bệnh viện không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.get('/benhvien/page/:pageNumber/:pageSize/:categoryType', (req, res) => {
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

        app.model.benhvien.getPage(pageNumber, pageSize, condition, (error, page) => {
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

    app.get('/benhvien/item/id/:benhvienId', (req, res) =>
        app.model.benhvien.readById(req.params.benhvienId, (error, item) => res.send({ error, item })));
    // app.get('/benhvien/item/link/:benhvienLink', (req, res) =>
    //     app.model.benhvien.readByLink(req.params.benhvienLink, (error, item) => res.send({ error, item })));

    // app.put('/benhvien/item/check-link', (req, res) => app.model.benhvien.getByLink(req.body.link, (error, item) =>
    //     res.send({ error: error ? 'Lỗi hệ thống' : (item == null || item._id == req.body._id) ? null : 'Link không hợp lệ' })));
};