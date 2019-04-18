module.exports = app => {
    app.get('/admin/loai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.loai.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.post('/admin/loai', app.role.isAdmin, (req, res) => {
        app.model.loai.create(req.body.loai, (error, loai) => {
            res.send({ error, loai })
        });
    });

    app.put('/admin/loai', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.LOAI && data.LOAI != '') changes.LOAI = data.LOAI;
        data.Dien_giai && data.Dien_giai != '' && (changes.Dien_giai = data.Dien_giai);

        app.model.loai.update(req.body._id, changes, (error, loai) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, loai });
            }
        })
    });

    app.delete('/admin/loai', app.role.isAdmin, (req, res) => {
        app.model.loai.delete(req.body._id, error => res.send({ error }))
    }
    );
};