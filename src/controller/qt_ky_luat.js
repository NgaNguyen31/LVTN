module.exports = app => {
    app.get('/admin/qt_ky_luat/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_ky_luat.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_ky_luat/all', app.role.isAdmin, (req, res) => {
        app.model.qt_ky_luat.getAll((error, qt_ky_luat) => {
            if (error) res.send({error});
            else res.send({qt_ky_luat});
        })
    })

    app.delete('/admin/qt_ky_luat', app.role.isAdmin, (req, res) => app.model.qt_ky_luat.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_ky_luat', app.role.isAdmin, (req, res) => {                
        app.model.qt_ky_luat.create(req.body.qt_ky_luat, (error, qt_ky_luat) => {            
            res.send({ error, qt_ky_luat })
        });
    });

    app.put('/admin/qt_ky_luat', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.STT && data.STT != '' ) changes.STT = data.STT;        
        // if (data.THANG && data.THANG != '' ) changes.THANG = data.THANG;        
        if (data.NAM && data.NAM != '' ) changes.NAM = data.NAM;        
        if (data.HINH_THUC && data.HINH_THUC != '' ) changes.HINH_THUC = data.HINH_THUC;        
        if (data.CAP_KL && data.CAP_KL != '' ) changes.CAP_KL = data.CAP_KL;     
        if (data.LY_DO && data.LY_DO != '' ) changes.LY_DO = data.LY_DO;        
        if (data.GHI_CHU && data.GHI_CHU != '' ) changes.GHI_CHU = data.GHI_CHU;         
        if (data.SO_QD && data.SO_QD != '' ) changes.SO_QD = data.SO_QD;        
        if (data.NGAY_QD && data.NGAY_QD != '' ) changes.NGAY_QD = data.NGAY_QD;         
        if (data.GHI_CHU_KHAC && data.GHI_CHU_KHAC != '' ) changes.GHI_CHU_KHAC = data.GHI_CHU_KHAC;           

        app.model.qt_ky_luat.update(req.body._id, changes, (error, qt_ky_luat) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_ky_luat });
            }
        })
    });
}