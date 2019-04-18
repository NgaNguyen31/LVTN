module.exports = app => {
    app.get('/admin/phanloai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.phanloai.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.post('/admin/phanloai', app.role.isAdmin, (req, res) => {
        app.model.phanloai.create(req.body.phanloai, (error, phanloai) => {
            res.send({ error, phanloai })
        });
    });

    app.put('/admin/phanloai', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        data.ORD && data.ORD != '' && (changes.ORD = data.ORD);
        if (data.LOAI && data.LOAI != '') changes.LOAI = data.LOAI;
        

        app.model.phanloai.update(req.body._id, changes, (error, phanloai) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, phanloai });
            }
        })
    });

    app.delete('/admin/phanloai', app.role.isAdmin, (req, res) => {
        app.model.phanloai.delete(req.body._id, error => res.send({ error }))
    }
    );
};