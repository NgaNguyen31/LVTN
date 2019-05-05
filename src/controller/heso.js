module.exports = app => {
    app.get('/admin/heso/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.heso.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/heso/all', app.role.isAdmin, (req, res) => {
        app.model.heso.getAll((error, heso) => {
            if (error) res.send(error);
            else res.send(heso);
        })
    })

    app.post('/admin/heso', app.role.isAdmin, (req, res) => {
        app.model.heso.create(req.body.heso, (error, heso) => {
            res.send({ error, heso })
        });
    });

    app.put('/admin/heso', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MLTT && data.MLTT != '') changes.MLTT = data.MLTT;
        data.TL && data.TL != '' && (changes.TL = data.TL);

        app.model.heso.update(req.body._id, changes, (error, heso) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, heso });
            }
        })
    });

    app.delete('/admin/heso', app.role.isAdmin, (req, res) => {
        app.model.heso.delete(req.body._id, error => res.send({ error }))
    }
    );
};