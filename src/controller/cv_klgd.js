module.exports = app => {
    app.get('/admin/cv_klgd/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.cv_klgd.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/cv_klgd', app.role.isAdmin, (req, res) => app.model.cv_klgd.delete(req.body._id, error => res.send({ error })));

    app.post('/app/cv_klgd', (req, res) => app.model.cv_klgd.create(req.body.cv_klgd, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}