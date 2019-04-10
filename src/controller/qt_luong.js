module.exports = app => {
    app.get('/admin/qt_luong/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_luong.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/qt_luong', app.role.isAdmin, (req, res) => app.model.qt_luong.delete(req.body._id, error => res.send({ error })));

    app.post('/app/qt_luong', (req, res) => app.model.qt_luong.create(req.body.qt_luong, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}