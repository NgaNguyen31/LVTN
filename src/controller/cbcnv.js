module.exports = app => {
    app.get('/admin/cbcnv/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.cbcnv.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/cbcnv', app.role.isAdmin, (req, res) => app.model.cbcnv.delete(req.body._id, error => res.send({ error })));

    app.post('/app/cbcnv', (req, res) => app.model.cbcnv.create(req.body.cbcnv, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}