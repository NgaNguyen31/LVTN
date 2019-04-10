module.exports = app => {
    app.get('/admin/qt_dtao/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_dtao.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/qt_dtao', app.role.isAdmin, (req, res) => app.model.qt_dtao.delete(req.body._id, error => res.send({ error })));

    app.post('/app/qt_dtao', (req, res) => app.model.qt_dtao.create(req.body.qt_dtao, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}