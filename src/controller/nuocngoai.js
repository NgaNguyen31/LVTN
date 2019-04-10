module.exports = app => {
    app.get('/admin/nuocngoai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.nuocngoai.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/nuocngoai', app.role.isAdmin, (req, res) => app.model.nuocngoai.delete(req.body._id, error => res.send({ error })));

    app.post('/app/nuocngoai', (req, res) => app.model.nuocngoai.create(req.body.nuocngoai, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}