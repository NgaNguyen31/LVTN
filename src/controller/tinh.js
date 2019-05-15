module.exports = app => {
    app.get('/admin/tinh/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.tinh.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/tinh/all', app.role.isAdmin, (req, res) => {
        app.model.tinh.getAll((error, tinh) => {
            if (error) {
                res.send({error});
            }
            else res.send({tinh});        
        });
    });

    app.post('/admin/tinh', app.role.isAdmin, (req, res) => {
        app.model.tinh.create(req.body.tinh, (error, tinh) => {
            res.send({ error, tinh })
        });
    });

    app.put('/admin/tinh', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.TEN_TINH && data.TEN_TINH != '') changes.TEN_TINH = data.TEN_TINH;
        if (data.MS_VUNG && data.MS_VUNG != '') changes.MS_VUNG = data.MS_VUNG;

        app.model.tinh.update(req.body._id, changes, (error, tinh) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, tinh });
            }
        })
    });

    app.delete('/admin/tinh', app.role.isAdmin, (req, res) => {
        app.model.tinh.delete(req.body._id, error => res.send({ error }))
    }
    );
};