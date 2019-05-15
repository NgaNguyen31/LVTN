module.exports = app => {
    app.get('/admin/nghi_ctac/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.nghi_ctac.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/nghi_ctac/all', app.role.isAdmin, (req, res) => {
        app.model.nghi_ctac.getAll((error, nghi_ctac) => {
            if (error) res.send({error});
            else res.send({nghi_ctac});
        })
    })

    app.post('/admin/nghi_ctac', app.role.isAdmin, (req, res) => {
        app.model.nghi_ctac.create(req.body.nghi_ctac, (error, nghi_ctac) => {
            res.send({ error, nghi_ctac })
        });
    });

    app.put('/admin/nghi_ctac', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.NGHI && data.NGHI != '') changes.NGHI = data.NGHI;
        data.Dien_giai && data.Dien_giai != '' && (changes.Dien_giai = data.Dien_giai);

        app.model.nghi_ctac.update(req.body._id, changes, (error, nghi_ctac) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, nghi_ctac });
            }
        })
    });

    app.delete('/admin/nghi_ctac', app.role.isAdmin, (req, res) => {
        app.model.nghi_ctac.delete(req.body._id, error => res.send({ error }))
    }
    );
};