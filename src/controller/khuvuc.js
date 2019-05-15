module.exports = app => {
    app.get('/admin/khuvuc/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.khuvuc.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/khuvuc/all', app.role.isAdmin, (req, res) => {
        app.model.khuvuc.getAll((error, khuvuc) => {
            if (error) res.send({error});
            else res.send({khuvuc});
        })
    })

    app.delete('/admin/khuvuc', app.role.isAdmin, (req, res) => app.model.khuvuc.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/khuvuc', app.role.isAdmin, (req, res) => {                
        app.model.khuvuc.create(req.body.khuvuc, (error, khuvuc) => {            
            res.send({ error, khuvuc })
        });
    });

    app.put('/admin/khuvuc', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.TEN_KVUC && data.TEN_KVUC != '') changes.TEN_KVUC = data.TEN_KVUC;        
        if (data.MS_CHAU) changes.MS_CHAU = data.MS_CHAU;
      
        app.model.khuvuc.update(req.body._id, changes, (error, khuvuc) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, khuvuc });
            }
        })
    });
}