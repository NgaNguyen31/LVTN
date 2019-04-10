module.exports = app => {
    app.get('/admin/kihieu_tang_giam_bhxh/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.kihieu_tang_giam_bhxh.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/kihieu_tang_giam_bhxh', app.role.isAdmin, (req, res) => app.model.kihieu_tang_giam_bhxh.delete(req.body._id, error => res.send({ error })));

    app.post('/app/kihieu_tang_giam_bhxh', (req, res) => app.model.kihieu_tang_giam_bhxh.create(req.body.kihieu_tang_giam_bhxh, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}