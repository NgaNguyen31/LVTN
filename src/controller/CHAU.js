module.exports = app => {
    app.get('/admin/CHAU/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.contact.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/CHAU', app.role.isAdmin, (req, res) => app.model.CHAU.delete(req.body._id, error => res.send({ error })));

    app.post('/app/CHAU', (req, res) => app.model.CHAU.create(req.body.CHAU, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm châu', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}