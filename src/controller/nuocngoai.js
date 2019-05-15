module.exports = app => {
    app.get('/admin/nuocngoai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.nuocngoai.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/nuocngoai/all', app.role.isAdmin, (req, res) => {
        app.model.nuocngoai.getAll((error, nuocngoai) => {
            if (error) res.send({error});
            else res.send({nuocngoai});
        })
    })

    app.delete('/admin/nuocngoai', app.role.isAdmin, (req, res) => app.model.nuocngoai.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/nuocngoai', app.role.isAdmin, (req, res) => {                
        app.model.nuocngoai.create(req.body.nuocngoai, (error, nuocngoai) => {            
            res.send({ error, nuocngoai })
        });
    });

    app.put('/admin/nuocngoai', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.TEN_NUOC && data.TEN_NUOC != '' ) changes.TEN_NUOC = data.TEN_NUOC;        
        if (data.MS_KVUC) changes.MS_KVUC = data.MS_KVUC;       
              
        app.model.nuocngoai.update(req.body._id, changes, (error, nuocngoai) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, nuocngoai });
            }
        })
    });
}