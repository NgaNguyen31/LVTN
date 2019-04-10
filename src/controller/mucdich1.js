module.exports = app => {
    app.get('/admin/mucdich1/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.mucdich1.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/mucdich1', app.role.isAdmin, (req, res) => app.model.mucdich1.delete(req.body._id, error => res.send({ error })));

    app.post('/app/mucdich1', (req, res) => app.model.mucdich1.create(req.body.mucdich1, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}