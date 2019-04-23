module.exports = app => {
    app.get('/admin/bomon/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.bomon.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.delete('/admin/bomon', app.role.isAdmin, (req, res) => app.model.bomon.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/bomon', app.role.isAdmin, (req, res) => {        
        app.model.bomon.create(req.body.bomon, (error, bomon) => {
            res.send({ error, bomon })
        });
    });

    app.put('/admin/bomon', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.TEN_BM && data.TEN_BM != '') changes.TEN_BM = data.TEN_BM;
        if (data.TEN_TIENG_ANH && data.TEN_TIENG_ANH != '') changes.TEN_TIENG_ANH = data.TEN_TIENG_ANH;
        if (data.MS_KHOA) changes.MS_KHOA = data.MS_KHOA;
        if (data.NAM_THANH_LAP && data.NAM_THANH_LAP != '') changes.NAM_THANH_LAP = data.NAM_THANH_LAP;
        if (data.GHI_CHU && data.GHI_CHU != '') changes.GHI_CHU = data.GHI_CHU;
    
        app.model.bomon.update(req.body._id, changes, (error, bomon) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, bomon });
            }
        })
    });
}