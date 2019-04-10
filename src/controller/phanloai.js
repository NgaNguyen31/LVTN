module.exports = app => {
    app.get('/admin/phanloai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.phanloai.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/phanloai', app.role.isAdmin, (req, res) => app.model.phanloai.delete(req.body._id, error => res.send({ error })));

    app.post('/app/phanloai', (req, res) => app.model.phanloai.create(req.body.phanloai, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}