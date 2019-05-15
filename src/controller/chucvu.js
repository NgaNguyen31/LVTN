module.exports = app => {
    app.get('/admin/chucvu/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.chucvu.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/chucvu/all', app.role.isAdmin, (req, res) => {
        app.model.chucvu.getAll((error, chucvu) => {
            if (error) res.send({error});
            else res.send({chucvu});
        })
    })

    app.post('/admin/chucvu', app.role.isAdmin, (req, res) => {
        app.model.chucvu.create(req.body.chucvu, (error, chucvu) => {
            res.send({ error, chucvu })
        });
    });

    app.put('/admin/chucvu', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.CHUC_VU && data.CHUC_VU != '') changes.CHUC_VU = data.CHUC_VU;
        if (data.PC_CVU && data.PC_CVU != '') changes.PC_CVU = data.PC_CVU;
        if (data.Ghi_chu && data.Ghi_chu != '') changes.Ghi_chu = data.Ghi_chu;

        app.model.chucvu.update(req.body._id, changes, (error, chucvu) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, chucvu });
            }
        })
    });

    app.delete('/admin/chucvu', app.role.isAdmin, (req, res) => {
        app.model.chucvu.delete(req.body._id, error => res.send({ error }))
    }
    );
};