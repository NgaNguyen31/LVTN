module.exports = app => {
    app.get('/admin/khuvuc/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.khuvuc.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/khuvuc', app.role.isAdmin, (req, res) => app.model.khuvuc.delete(req.body._id, error => res.send({ error })));

    app.post('/app/khuvuc', (req, res) => app.model.khuvuc.create(req.body.khuvuc, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}