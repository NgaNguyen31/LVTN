module.exports = app => {
    app.get('/admin/benhvien/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.benhvien.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/benhvien/all', app.role.isAdmin, (req, res) => {
        app.model.benhvien.getAll((error, benhvien) => {
            if (error) res.send({error});
            else res.send({benhvien});
        })
    })

    app.post('/admin/benhvien', app.role.isAdmin, (req, res) => {
        app.model.benhvien.create(req.body.benhvien, (error, benhvien) => {
            res.send({ error, benhvien })
        });
    });

    app.put('/admin/benhvien', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.noi_kham && data.noi_kham != '') changes.noi_kham = data.noi_kham;

        app.model.benhvien.update(req.body._id, changes, (error, benhvien) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, benhvien });
            }
        })
    });

    app.delete('/admin/benhvien', app.role.isAdmin, (req, res) => {
        app.model.benhvien.delete(req.body._id, error => res.send({ error }))
    });

    };