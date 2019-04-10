module.exports = app => {
    app.get('/admin/cbcnv_hd_dv_tu_tra/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.cbcnv_hd_dv_tu_tra.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/cbcnv_hd_dv_tu_tra', app.role.isAdmin, (req, res) => app.model.cbcnv_hd_dv_tu_tra.delete(req.body._id, error => res.send({ error })));

    app.post('/app/cbcnv_hd_dv_tu_tra', (req, res) => app.model.cbcnv_hd_dv_tu_tra.create(req.body.cbcnv_hd_dv_tu_tra, (error, item) => {
        if (item) {
            app.io.emit('Đã thêm thành công', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
}