module.exports = app => {
    app.get('/admin/mucdich/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.mucdich.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/mucdich/all', app.role.isAdmin, (req, res) => {
        app.model.mucdich.getAll((error, mucdich) => {
            if (error) res.send({error});
            else res.send({mucdich});
        })
    })

    app.post('/admin/mucdich', app.role.isAdmin, (req, res) => {
        app.model.mucdich.create(req.body.mucdich, (error, mucdich) => {
            res.send({ error, mucdich })
        });
    });

    app.put('/admin/mucdich', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MUC_DICH && data.MUC_DICH != '') changes.MUC_DICH = data.MUC_DICH;

        app.model.mucdich.update(req.body._id, changes, (error, mucdich) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, mucdich });
            }
        })
    });

    app.delete('/admin/mucdich', app.role.isAdmin, (req, res) => {
        app.model.mucdich.delete(req.body._id, error => res.send({ error }))
    }
    );
};