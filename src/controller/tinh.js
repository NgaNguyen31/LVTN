module.exports = app => {
    app.get('/admin/tinh/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.tinh.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/tinh', app.role.isAdmin, (req, res) => app.model.tinh.delete(req.body._id, error => res.send({ error })));

    app.post('/app/tinh', (req, res) => app.model.tinh.create(req.body.tinh, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}