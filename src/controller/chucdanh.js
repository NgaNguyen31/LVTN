module.exports = app => {
    app.get('/admin/chucdanh/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.chucdanh.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/chucdanh', app.role.isAdmin, (req, res) => app.model.chucdanh.delete(req.body._id, error => res.send({ error })));

    app.post('/app/chucdanh', (req, res) => app.model.chucdanh.create(req.body.chucdanh, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}