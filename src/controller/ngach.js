module.exports = app => {
    app.get('/admin/ngach/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.ngach.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/ngach/all', app.role.isAdmin, (req, res) => {
        app.model.ngach.getAll((error, ngach) => {
            if (error) res.send(error);
            else res.send(ngach);
        })
    })

    app.post('/admin/ngach', app.role.isAdmin, (req, res) => {
        app.model.ngach.create(req.body.ngach, (error, ngach) => {
            res.send({ error, ngach })
        });
    });

    app.put('/admin/ngach', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.NGACH && data.NGACH != '') changes.NGACH = data.NGACH;
        data.TEN_NGACH && data.TEN_NGACH != '' && (changes.TEN_NGACH = data.TEN_NGACH);

        app.model.ngach.update(req.body._id, changes, (error, ngach) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, ngach });
            }
        })
    });

    app.delete('/admin/ngach', app.role.isAdmin, (req, res) => {
        app.model.ngach.delete(req.body._id, error => res.send({ error }))
    }
    );
};