module.exports = app => {
    app.get('/admin/cv_klgd/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.cv_klgd.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/cv_klgd/all', app.role.isAdmin, (req, res) => {
        app.model.cv_klgd.getAll((error, cv_klgd) => {
            if (error) res.send({error});
            else res.send({cv_klgd});
        })
    })

    app.post('/admin/cv_klgd', app.role.isAdmin, (req, res) => {
        app.model.cv_klgd.create(req.body.cv_klgd, (error, cv_klgd) => {
            res.send({ error, cv_klgd })
        });
    });

    app.put('/admin/cv_klgd', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        data.TEN_CV && data.TEN_CV != '' && (changes.TEN_CV = data.TEN_CV);
        data.GHI_CHU && data.GHI_CHU != '' && (changes.GHI_CHU = data.GHI_CHU);

        app.model.cv_klgd.update(req.body._id, changes, (error, cv_klgd) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, cv_klgd });
            }
        })
    });

    app.delete('/admin/cv_klgd', app.role.isAdmin, (req, res) => {
        app.model.cv_klgd.delete(req.body._id, error => res.send({ error }))
    }
    );
};