module.exports = app => {
    app.get('/admin/chinhsach/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.chinhsach.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/chinhsach', app.role.isAdmin, (req, res) => app.model.chinhsach.delete(req.body._id, error => res.send({ error })));

    app.post('/app/chinhsach', (req, res) => app.model.chinhsach.create(req.body.chau, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm chính sách', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}