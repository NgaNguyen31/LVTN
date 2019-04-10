module.exports = app => {
    app.get('/admin/pctn_nghe_2018/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.pctn_nghe_2018.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/pctn_nghe_2018', app.role.isAdmin, (req, res) => app.model.pctn_nghe_2018.delete(req.body._id, error => res.send({ error })));

    app.post('/app/pctn_nghe_2018', (req, res) => app.model.pctn_nghe_2018.create(req.body.pctn_nghe_2018, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}