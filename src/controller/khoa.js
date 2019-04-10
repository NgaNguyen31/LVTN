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

    app.post('/app/khoa', (req, res) => app.model.khoa.create(req.body.khoa, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}