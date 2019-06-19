module.exports = app => {
    app.get('/admin/bomon/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.bomon.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/bomon/all', app.role.isAdmin, (req, res) => {
        app.model.bomon.getAll((error, bomon) => {
            if (error) res.send(error);
            else res.send({bomon});
        })
    })

    app.delete('/admin/bomon', app.role.isAdmin, (req, res) => app.model.bomon.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/bomon', app.role.isAdmin, (req, res) => {        
        app.model.bomon.create(req.body.bomon, (error, bomon) => {
            res.send({ error, bomon })
        });
    });

    app.put('/admin/bomon', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.ten_bm && data.ten_bm != '') changes.ten_bm = data.ten_bm;
        if (data.ten_tieng_anh && data.ten_tieng_anh != '') changes.ten_tieng_anh = data.ten_tieng_anh;
        if (data.ms_khoa) changes.ms_khoa = data.ms_khoa;
        if (data.nam_thanh_lap && data.nam_thanh_lap != '') changes.nam_thanh_lap = data.nam_thanh_lap;
        if (data.ghi_chu && data.ghi_chu != '') changes.ghi_chu = data.ghi_chu;
    
        app.model.bomon.update(req.body._id, changes, (error, bomon) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, bomon });
            }
        })
    });
}