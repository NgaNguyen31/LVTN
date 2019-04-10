module.exports = app => {
    app.get('/admin/mucdich/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.mucdich.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/mucdich', app.role.isAdmin, (req, res) => app.model.mucdich.delete(req.body._id, error => res.send({ error })));

    app.post('/app/mucdich', (req, res) => app.model.mucdich.create(req.body.mucdich, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}