module.exports = app => {
    app.get('/admin/chau/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.chau.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/chau/all', app.role.isAdmin, (req, res) => {
        app.model.chau.getAll((error, chau) => {
            if (error) res.send(error);
            else res.send(chau);
        })
    })
    
    app.post('/admin/chau', app.role.isAdmin, (req, res) => {
        app.model.chau.create(req.body.chau, (error, chau) => {
            res.send({ error, chau })
        });
    });

    app.put('/admin/chau', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.tenchau && data.tenchau != '') changes.tenchau = data.tenchau;

        app.model.chau.update(req.body._id, changes, (error, chau) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, chau });
            }
        })
    });

    app.delete('/admin/chau', app.role.isAdmin, (req, res) => {
        app.model.chau.delete(req.body._id, error => res.send({ error }))
    }
    );
};