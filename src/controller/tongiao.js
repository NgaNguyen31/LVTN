module.exports = app => {
    app.get('/admin/tongiao/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.tongiao.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.post('/admin/tongiao', app.role.isAdmin, (req, res) => {
        app.model.tongiao.create(req.body.tongiao, (error, tongiao) => {
            res.send({ error, tongiao })
        });
    });

    app.put('/admin/tongiao', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.TON_GIAO && data.TON_GIAO != '') changes.TON_GIAO = data.TON_GIAO;

        app.model.tongiao.update(req.body._id, changes, (error, tongiao) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, tongiao });
            }
        })
    });

    app.delete('/admin/tongiao', app.role.isAdmin, (req, res) => {
        app.model.tongiao.delete(req.body._id, error => res.send({ error }))
    }
    );
};