module.exports = app => {
    app.get('/admin/dantoc/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.dantoc.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/dantoc/all', app.role.isAdmin, (req, res) => {
        app.model.dantoc.getAll((error, dantoc) => {
            if (error) res.send(error);
            else res.send(dantoc);
        })
    })

    app.post('/admin/dantoc', app.role.isAdmin, (req, res) => {
        app.model.dantoc.create(req.body.dantoc, (error, dantoc) => {
            res.send({ error, dantoc })
        });
    });

    app.put('/admin/dantoc', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.Dan_toc && data.Dan_toc != '') changes.Dan_toc = data.Dan_toc;

        app.model.dantoc.update(req.body._id, changes, (error, dantoc) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, dantoc });
            }
        })
    });

    app.delete('/admin/dantoc', app.role.isAdmin, (req, res) => {
        app.model.dantoc.delete(req.body._id, error => res.send({ error }))
    }
    );
};