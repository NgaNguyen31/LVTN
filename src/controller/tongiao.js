module.exports = app => {
    app.get('/admin/tongiao/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.tongiao.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/tongiao', app.role.isAdmin, (req, res) => app.model.tongiao.delete(req.body._id, error => res.send({ error })));

    app.post('/app/tongiao', (req, res) => app.model.tongiao.create(req.body.tongiao, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}