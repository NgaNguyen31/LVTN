module.exports = app => {
    app.get('/admin/nuoc/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.nuoc.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    
    app.get('/admin/nuoc/all', app.role.isAdmin, (req, res) => {
        app.model.nuoc.getAll((error, result) => {
            if (error) {
                res.send({ error });
            } else {                
                res.send(result);
            }
        })
    })

    app.post('/admin/nuoc', app.role.isAdmin, (req, res) => {
        app.model.nuoc.create(req.body.nuoc, (error, nuoc) => {
            res.send({ error, nuoc })
        });
    });

    app.put('/admin/nuoc', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
            data.MS_NUOC && data.MS_NUOC != '' && (changes.MS_NUOC = data.MS_NUOC);
        if (data.TEN_NUOC && data.TEN_NUOC != '') changes.TEN_NUOC = data.TEN_NUOC;

        app.model.nuoc.update(req.body._id, changes, (error, nuoc) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, nuoc });
            }
        })
    });

    app.delete('/admin/nuoc', app.role.isAdmin, (req, res) => {
        app.model.nuoc.delete(req.body._id, error => res.send({ error }))
    }
    );
};