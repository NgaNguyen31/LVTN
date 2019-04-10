module.exports = app => {
    app.get('/admin/chucvu/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.chucvu.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/chucvu', app.role.isAdmin, (req, res) => app.model.chucvu.delete(req.body._id, error => res.send({ error })));

    app.post('/app/chucvu', (req, res) => app.model.chucvu.create(req.body.chucvu, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}