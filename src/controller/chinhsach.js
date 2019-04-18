module.exports = app => {
    app.get('/admin/chinhsach/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.chinhsach.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.post('/admin/chinhsach', app.role.isAdmin, (req, res) => {
        app.model.chinhsach.create(req.body.chinhsach, (error, chinhsach) => {
            res.send({ error, chinhsach })
        });
    });

    app.put('/admin/chinhsach', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.TEN_CS && data.TEN_CS != '') changes.TEN_CS = data.TEN_CS;

        app.model.chinhsach.update(req.body._id, changes, (error, chinhsach) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, chinhsach });
            }
        })
    });

    app.delete('/admin/chinhsach', app.role.isAdmin, (req, res) => {
        app.model.chinhsach.delete(req.body._id, error => res.send({ error }))
    }
    );
};