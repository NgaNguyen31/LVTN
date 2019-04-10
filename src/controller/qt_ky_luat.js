module.exports = app => {
    app.get('/admin/qt_ky_luat/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_ky_luat.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/qt_ky_luat', app.role.isAdmin, (req, res) => app.model.qt_ky_luat.delete(req.body._id, error => res.send({ error })));

    app.post('/app/qt_ky_luat', (req, res) => app.model.qt_ky_luat.create(req.body.qt_ky_luat, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}