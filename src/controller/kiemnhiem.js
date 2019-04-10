module.exports = app => {
    app.get('/admin/kiemnhiem/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.kiemnhiem.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/kiemnhiem', app.role.isAdmin, (req, res) => app.model.kiemnhiem.delete(req.body._id, error => res.send({ error })));

    app.post('/app/kiemnhiem', (req, res) => app.model.kiemnhiem.create(req.body.kiemnhiem, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}