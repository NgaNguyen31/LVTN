module.exports = app => {
    app.get('/admin/trinhdo/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.trinhdo.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/trinhdo', app.role.isAdmin, (req, res) => app.model.trinhdo.delete(req.body._id, error => res.send({ error })));

    app.post('/app/trinhdo', (req, res) => app.model.trinhdo.create(req.body.trinhdo, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}