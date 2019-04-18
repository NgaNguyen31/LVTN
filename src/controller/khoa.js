module.exports = app => {
    app.get('/admin/khoa/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.khoa.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/khoa', app.role.isAdmin, (req, res) => app.model.khoa.delete(req.body._id, error => res.send({ error })));

    app.put('/admin/khoa', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        data.TEN_KHOA && data.TEN_KHOA != '' && (changes.TEN_KHOA = data.TEN_KHOA);
        data.TEN_TIENG_ANH && data.TEN_TIENG_ANH != '' && (changes.TEN_TIENG_ANH = data.TEN_TIENG_ANH);
        data.TEN_KHOA_TAT && data.TEN_KHOA_TAT != '' && (changes.TEN_KHOA_TAT = data.TEN_KHOA_TAT);
        app.model.khoa.update(req.body._id, changes, (error, khoa) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, khoa });
            }
        })
    });

    app.post('/admin/khoa', app.role.isAdmin, (req, res) => {
        app.model.khoa.create(req.body.khoa, (error, khoa) => {
            res.send({ error, khoa })
        });
    });
}