module.exports = app => {
    app.get('/admin/ngach/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.ngach.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/ngach', app.role.isAdmin, (req, res) => app.model.ngach.delete(req.body._id, error => res.send({ error })));

    app.post('/app/ngach', (req, res) => app.model.ngach.create(req.body.ngach, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}