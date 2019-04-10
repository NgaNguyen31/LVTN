module.exports = app => {
    app.get('/admin/qt_cvu/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_cvu.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/qt_cvu', app.role.isAdmin, (req, res) => app.model.qt_cvu.delete(req.body._id, error => res.send({ error })));

    app.post('/app/qt_cvu', (req, res) => app.model.qt_cvu.create(req.body.qt_cvu, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}