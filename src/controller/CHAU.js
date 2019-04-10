module.exports = app => {
    app.get('/admin/chau/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.chau.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/chau', app.role.isAdmin, (req, res) => app.model.chau.delete(req.body._id, error => res.send({ error })));

    app.post('/app/chau', (req, res) => app.model.chau.create(req.body.chau, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm châu', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}