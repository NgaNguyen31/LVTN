module.exports = app => {
    app.get('/admin/loai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.loai.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/loai', app.role.isAdmin, (req, res) => app.model.loai.delete(req.body._id, error => res.send({ error })));

    app.post('/app/loai', (req, res) => app.model.loai.create(req.body.loai, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}