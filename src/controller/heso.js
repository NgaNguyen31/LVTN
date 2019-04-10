module.exports = app => {
    app.get('/admin/heso/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.heso.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/heso', app.role.isAdmin, (req, res) => app.model.heso.delete(req.body._id, error => res.send({ error })));

    app.post('/app/heso', (req, res) => app.model.heso.create(req.body.heso, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}