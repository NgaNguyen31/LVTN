module.exports = app => {
    app.get('/admin/qt_khen/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_khen.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/qt_khen', app.role.isAdmin, (req, res) => app.model.qt_khen.delete(req.body._id, error => res.send({ error })));

    app.post('/app/qt_khen', (req, res) => app.model.qt_khen.create(req.body.qt_khen, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}