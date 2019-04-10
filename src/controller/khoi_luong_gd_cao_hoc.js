module.exports = app => {
    app.get('/admin/khoi_luong_gd_cao_hoc/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.khoi_luong_gd_cao_hoc.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/khoi_luong_gd_cao_hoc', app.role.isAdmin, (req, res) => app.model.khoi_luong_gd_cao_hoc.delete(req.body._id, error => res.send({ error })));

    app.post('/app/khoi_luong_gd_cao_hoc', (req, res) => app.model.khoi_luong_gd_cao_hoc.create(req.body.khoi_luong_gd_cao_hoc, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}