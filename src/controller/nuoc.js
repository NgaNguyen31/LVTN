module.exports = app => {
    app.get('/admin/nuoc/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.nuoc.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/nuoc', app.role.isAdmin, (req, res) => app.model.nuoc.delete(req.body._id, error => res.send({ error })));

    app.post('/app/nuoc', (req, res) => app.model.nuoc.create(req.body.nuoc, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}