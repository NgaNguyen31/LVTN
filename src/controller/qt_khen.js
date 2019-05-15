module.exports = app => {
    app.get('/admin/qt_khen/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_khen.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_khen/all', app.role.isAdmin, (req, res) => {
        app.model.qt_khen.getAll((error, qt_khen) => {
            if (error) res.send({error});
            else res.send({qt_khen});
        })
    })

    app.delete('/admin/qt_khen', app.role.isAdmin, (req, res) => app.model.qt_khen.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_khen', app.role.isAdmin, (req, res) => {                
        app.model.qt_khen.create(req.body.qt_khen, (error, qt_khen) => {            
            res.send({ error, qt_khen })
        });
    });

    app.put('/admin/qt_khen', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.STT && data.STT != '' ) changes.STT = data.STT;        
        if (data.NAM && data.NAM != '' ) changes.NAM = data.NAM;        
        if (data.HINH_THUC && data.HINH_THUC != '' ) changes.HINH_THUC = data.HINH_THUC;        
        if (data.CAP_KHEN && data.CAP_KHEN != '' ) changes.CAP_KHEN = data.CAP_KHEN;     
        if (data.LY_DO && data.LY_DO != '' ) changes.LY_DO = data.LY_DO;        
        if (data.DANH_HIEU && data.DANH_HIEU != '' ) changes.DANH_HIEU = data.DANH_HIEU;        
        if (data.GHI_CHU && data.GHI_CHU != '' ) changes.GHI_CHU = data.GHI_CHU;         
              
        app.model.qt_khen.update(req.body._id, changes, (error, qt_khen) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_khen });
            }
        })
    });
}