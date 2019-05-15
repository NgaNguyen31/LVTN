module.exports = app => {
    app.get('/admin/qt_cvu/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_cvu.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_cvu/all', app.role.isAdmin, (req, res) => {
        app.model.qt_cvu.getAll((error, qt_cvu) => {
            if (error) res.send({error});
            else res.send({qt_cvu});
        })
    })

    app.delete('/admin/qt_cvu', app.role.isAdmin, (req, res) => app.model.qt_cvu.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_cvu', app.role.isAdmin, (req, res) => {                
        app.model.qt_cvu.create(req.body.qt_cvu, (error, qt_cvu) => {            
            res.send({ error, qt_cvu })
        });
    });

    app.put('/admin/qt_cvu', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
            if (data.MS_NV) changes.MS_NV = data.MS_NV;
            if (data.STT && data.STT != '' ) changes.STT = data.STT;        
            if (data.QD_BO_NHIEM && data.QD_BO_NHIEM != '' ) changes.QD_BO_NHIEM = data.QD_BO_NHIEM;        
            if (data.NGAY_QD_BNHIEM && data.NGAY_QD_BNHIEM != '' ) changes.NGAY_QD_BNHIEM = data.NGAY_QD_BNHIEM;        
            if (data.MA_CV) changes.MA_CV = data.MA_CV;         
            if (data.CHUC_VU && data.CHUC_VU != '' ) changes.CHUC_VU = data.CHUC_VU;        
            if (data.HE_SO_PCCV) changes.HE_SO_PCCV = data.HE_SO_PCCV;
            if (data.NGAY_BO_NHIEM && data.NGAY_BO_NHIEM != '' ) changes.NGAY_BO_NHIEM = data.NGAY_BO_NHIEM;        
            if (data.GHI_CHU_BHXH && data.GHI_CHU_BHXH != '' ) changes.GHI_CHU_BHXH = data.GHI_CHU_BHXH;
            if (data.NGAY_THOICV && data.NGAY_THOICV != '' ) changes.NGAY_THOICV = data.NGAY_THOICV;        
            if (data.QD_THOI_CVU && data.QD_THOI_CVU != '' ) changes.QD_THOI_CVU = data.QD_THOI_CVU;        
            if (data.NGAY_QD_THOI_CV && data.NGAY_QD_THOI_CV != '' ) changes.NGAY_QD_THOI_CV = data.NGAY_QD_THOI_CV;
            if (data.MS_BOMON) changes.MS_BOMON = data.MS_BOMON;        
            if (data.GHI_CHU && data.GHI_CHU != '' ) changes.GHI_CHU = data.GHI_CHU;        
                   
        app.model.qt_cvu.update(req.body._id, changes, (error, qt_cvu) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_cvu });
            }
        })
    });
}