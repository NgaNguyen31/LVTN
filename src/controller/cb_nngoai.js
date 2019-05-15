module.exports = app => {
    app.get('/admin/cb_nngoai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.cb_nngoai.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/cb_nngoai/all', app.role.isAdmin, (req, res) =>{
        app.model.cb_nngoai.getAll((error,cb_nngoai) => {
            if (error) {
                res.send(error);
            }
            else res.send({cb_nngoai});
        })
    })

    app.delete('/admin/cb_nngoai', app.role.isAdmin, (req, res) => app.model.cb_nngoai.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/cb_nngoai', app.role.isAdmin, (req, res) => {       
        app.model.cb_nngoai.create(req.body.cb_nngoai, (error, cb_nngoai) => {  
            res.send({ error, cb_nngoai })
        });
    });

    app.put('/admin/cb_nngoai', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.Hovaten && data.Hovaten != '') changes.Hovaten = data.Hovaten;
        if (data.Nuoc && data.Nuoc != '') changes.Nuoc = data.Nuoc;
        if (data.Ngaydi) changes.Ngaydi = data.Ngaydi;
        if (data.Ngayve && data.Ngayve != '') changes.Ngayve = data.Ngayve;
        if (data.Mucdich && data.Mucdich != '') changes.Mucdich = data.Mucdich;
        if (data.Giahan && data.Giahan != '') changes.Giahan = data.Giahan;
        if (data.SoCVan && data.SoCVan != '') changes.SoCVan = data.SoCVan;
        if (data.NgayCVan && data.NgayCVan != '') changes.NgayCVan = data.NgayCVan;

        app.model.cb_nngoai.update(req.body._id, changes, (error, cb_nngoai) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, cb_nngoai });
            }
        })
    });
}