module.exports = app => {
    app.get('/admin/qt_nngoai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_nngoai.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_nngoai/all', app.role.isAdmin, (req, res) => {
        app.model.qt_nngoai.getAll((error, qt_nngoai) => {
            if (error) res.send({error});
            else res.send({qt_nngoai});
        })
    })

    app.delete('/admin/qt_nngoai', app.role.isAdmin, (req, res) => app.model.qt_nngoai.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_nngoai', app.role.isAdmin, (req, res) => {                
        app.model.qt_nngoai.create(req.body.qt_nngoai, (error, qt_nngoai) => {            
            res.send({ error, qt_nngoai })
        });
    });

    app.put('/admin/qt_nngoai', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.HO && data.HO != '') changes.HO = data.HO;        
        if (data.TEN && data.TEN != '' ) changes.TEN = data.TEN;        
        if (data.SO_QUYET_DINH && data.SO_QUYET_DINH != '' ) changes.SO_QUYET_DINH = data.SO_QUYET_DINH;      
        if (data.NGAY_QDINH && data.NGAY_QDINH != '' ) changes.NGAY_QDINH = data.NGAY_QDINH;      
        if (data.DON_VI && data.DON_VI != '' ) changes.DON_VI = data.DON_VI;      
        if (data.NGAY_DI && data.NGAY_DI != '') changes.NGAY_DI = data.NGAY_DI;      
        if (data.NGAY_VE && data.NGAY_VE != '' ) changes.NGAY_VE = data.NGAY_VE;      
        if (data.NGAY_VE_THUC && data.NGAY_VE_THUC != '' ) changes.NGAY_VE_THUC = data.NGAY_VE_THUC;      
        if (data.SO_QD_TIEP_NHAN && data.SO_QD_TIEP_NHAN != '' ) changes.SO_QD_TIEP_NHAN = data.SO_QD_TIEP_NHAN;      
        if (data.NGAY_QD_TIEP_NHAN && data.NGAY_QD_TIEP_NHAN != '' ) changes.NGAY_QD_TIEP_NHAN = data.NGAY_QD_TIEP_NHAN;      
        if (data.MUC_DICH) changes.MUC_DICH = data.MUC_DICH;      
        if (data.NOI_DUNG && data.NOI_DUNG != '' ) changes.NOI_DUNG = data.NOI_DUNG;      
        if (data.NGANH_HOC && data.NGANH_HOC != '' ) changes.NGANH_HOC = data.NGANH_HOC;      
        if (data.GIA_HAN && data.GIA_HAN != '' ) changes.GIA_HAN = data.GIA_HAN;      
        if (data.NUOC_DEN) changes.NUOC_DEN = data.NUOC_DEN;      
        if (data.NOI_DEN && data.NOI_DEN != '' ) changes.NOI_DEN = data.NOI_DEN;      
        if (data.CHI_PHI && data.CHI_PHI != '' ) changes.CHI_PHI = data.CHI_PHI;      
        if (data.GHI_CHU && data.GHI_CHU != '' ) changes.GHI_CHU = data.GHI_CHU;      
        if (data.HOAN_TRA_KP_BHXH && data.HOAN_TRA_KP_BHXH != '' ) changes.HOAN_TRA_KP_BHXH = data.HOAN_TRA_KP_BHXH;      
        if (data.NGAY_NHAP && data.NGAY_NHAP != '' ) changes.NGAY_NHAP = data.NGAY_NHAP;      
        if (data.BHXH && data.BHXH != '' ) changes.BHXH = data.BHXH;      
        
              
        app.model.qt_nngoai.update(req.body._id, changes, (error, qt_nngoai) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_nngoai });
            }
        })
    });
}