module.exports = app => {
    app.get('/admin/bomon/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.bomon.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/bomon', app.role.isAdmin, (req, res) => app.model.bomon.delete(req.body._id, error => res.send({ error })));

    app.post('/app/bomon', (req, res) => app.model.bomon.create(req.body.bomon, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm châu', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}