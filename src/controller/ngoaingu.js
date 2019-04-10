module.exports = app => {
    app.get('/admin/ngoaingu/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.ngoaingu.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/ngoaingu', app.role.isAdmin, (req, res) => app.model.ngoaingu.delete(req.body._id, error => res.send({ error })));

    app.post('/app/ngoaingu', (req, res) => app.model.ngoaingu.create(req.body.ngoaingu, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}