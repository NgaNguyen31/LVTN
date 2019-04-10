module.exports = app => {
    app.get('/admin/benhvien/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.benhvien.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/benhvien', app.role.isAdmin, (req, res) => app.model.benhvien.delete(req.body._id, error => res.send({ error })));

    app.post('/app/benhvien', (req, res) => app.model.benhvien.create(req.body.benhvien, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}