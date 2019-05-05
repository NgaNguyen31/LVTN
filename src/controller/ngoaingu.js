module.exports = app => {
    app.get('/admin/ngoaingu/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.ngoaingu.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/ngoaingu/all', app.role.isAdmin, (req, res) => {
        app.model.ngoaingu.getAll((error, ngoaingu) => {
            if (error) res.send(error);
            else res.send(ngoaingu);
        })
    })

    app.post('/admin/ngoaingu', app.role.isAdmin, (req, res) => {
        app.model.ngoaingu.create(req.body.ngoaingu, (error, ngoaingu) => {
            res.send({ error, ngoaingu })
        });
    });

    app.put('/admin/ngoaingu', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.N_NGU && data.N_NGU != '') changes.N_NGU = data.N_NGU;

        app.model.ngoaingu.update(req.body._id, changes, (error, ngoaingu) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, ngoaingu });
            }
        })
    });

    app.delete('/admin/ngoaingu', app.role.isAdmin, (req, res) => {
        app.model.ngoaingu.delete(req.body._id, error => res.send({ error }))
    }
    );
};