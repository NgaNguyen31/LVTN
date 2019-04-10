module.exports = app => {
    app.get('/admin/nghi_ctac/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.nghi_ctac.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/nghi_ctac', app.role.isAdmin, (req, res) => app.model.nghi_ctac.delete(req.body._id, error => res.send({ error })));

    app.post('/app/nghi_ctac', (req, res) => app.model.nghi_ctac.create(req.body.nghi_ctac, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}