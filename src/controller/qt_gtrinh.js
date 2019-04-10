module.exports = app => {
    app.get('/admin/qt_gtrinh/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_gtrinh.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/qt_gtrinh', app.role.isAdmin, (req, res) => app.model.qt_gtrinh.delete(req.body._id, error => res.send({ error })));

    app.post('/app/qt_gtrinh', (req, res) => app.model.qt_gtrinh.create(req.body.qt_gtrinh, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}