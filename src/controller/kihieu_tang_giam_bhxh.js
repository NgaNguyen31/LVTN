module.exports = app => {
    app.get('/admin/kihieu_tang_giam_bhxh/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.kihieu_tang_giam_bhxh.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.post('/admin/kihieu_tang_giam_bhxh', app.role.isAdmin, (req, res) => {
        app.model.kihieu_tang_giam_bhxh.create(req.body.kihieu_tang_giam_bhxh, (error, kihieu_tang_giam_bhxh) => {
            res.send({ error, kihieu_tang_giam_bhxh })
        });
    });

    app.put('/admin/kihieu_tang_giam_bhxh', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.Ky_hieu && data.Ky_hieu != '') changes.Ky_hieu = data.Ky_hieu;
        data.Dien_giai && data.Dien_giai != '' && (changes.Dien_giai = data.Dien_giai);

        app.model.kihieu_tang_giam_bhxh.update(req.body._id, changes, (error, kihieu_tang_giam_bhxh) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, kihieu_tang_giam_bhxh });
            }
        })
    });

    app.delete('/admin/kihieu_tang_giam_bhxh', app.role.isAdmin, (req, res) => {
        app.model.kihieu_tang_giam_bhxh.delete(req.body._id, error => res.send({ error }))
    }
    );
};