module.exports = app => {
    app.get('/admin/dantoc/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.contact.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/dantoc', app.role.isAdmin, (req, res) => app.model.dantoc.delete(req.body._id, error => res.send({ error })));

    app.post('/app/dantoc', (req, res) => app.model.dantoc.create(req.body.dantoc, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm dân tộc', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}