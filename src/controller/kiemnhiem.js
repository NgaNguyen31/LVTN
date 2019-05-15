module.exports = app => {
    app.get('/admin/kiemnhiem/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.kiemnhiem.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/kiemnhiem/all', app.role.isAdmin, (req, res) => {
        app.model.kiemnhiem.getAll((error, kiemnhiem) => {
            if (error) res.send({error});
            else res.send({kiemnhiem});
        })
    })

    app.delete('/admin/kiemnhiem', app.role.isAdmin, (req, res) => app.model.kiemnhiem.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/kiemnhiem', app.role.isAdmin, (req, res) => {                
        app.model.kiemnhiem.create(req.body.kiemnhiem, (error, kiemnhiem) => {            
            res.send({ error, kiemnhiem })
        });
    });

    app.put('/admin/kiemnhiem', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV ) changes.MS_NV = data.MS_NV;        
        if (data.MS_BM) changes.MS_BM = data.MS_BM;
        if (data.MS_CVU ) changes.MS_CVU = data.MS_CVU;        
        if (data.NGAY_CVU && data.NGAY_CVU != '') changes.NGAY_CVU = data.NGAY_CVU;
        if (data.GHICHU && data.GHICHU != '') changes.GHICHU = data.GHICHU;
        if (data.Xoa!= null) changes.Xoa = data.Xoa;
              
        app.model.kiemnhiem.update(req.body._id, changes, (error, kiemnhiem) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, kiemnhiem });
            }
        })
    });
}