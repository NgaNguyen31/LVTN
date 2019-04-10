module.exports = app => {
    app.get('/admin/cb_nngoai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.cb_nngoai.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/cb_nngoai', app.role.isAdmin, (req, res) => app.model.cb_nngoai.delete(req.body._id, error => res.send({ error })));

    app.post('/app/cb_nngoai', (req, res) => app.model.cb_nngoai.create(req.body.cb_nngoai, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}