module.exports = app => {
    app.get('/admin/qt_luong/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_luong.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_luong/all', app.role.isAdmin, (req, res) => {
        app.model.qt_luong.getAll((error, qt_luong) => {
            if (error) res.send({error});
            else res.send({qt_luong});
        })
    })

    app.delete('/admin/qt_luong', app.role.isAdmin, (req, res) => app.model.qt_luong.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_luong', app.role.isAdmin, (req, res) => {                
        app.model.qt_luong.create(req.body.qt_luong, (error, qt_luong) => {            
            res.send({ error, qt_luong })
        });
    });

    app.put('/admin/qt_luong', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.STT && data.STT != '') changes.STT = data.STT;        
        if (data.QD_luong && data.QD_luong != '' ) changes.QD_luong = data.QD_luong;        
        if (data.Ngay_QD && data.Ngay_QD != '' ) changes.Ngay_QD = data.Ngay_QD;      
        if (data.Ngay_huong && data.Ngay_huong != '' ) changes.Ngay_huong = data.Ngay_huong;      
        if (data.Moc_nang_luong && data.Moc_nang_luong != '' ) changes.Moc_nang_luong = data.Moc_nang_luong;      
        if (data.Ngach) changes.Ngach = data.Ngach;      
        if (data.Heso && data.Heso != '' ) changes.Heso = data.Heso;      
        if (data.Bac && data.Bac != '' ) changes.Bac = data.Bac;      
        if (data.PT_Vuot_Khung && data.PT_Vuot_Khung != '' ) changes.PT_Vuot_Khung = data.PT_Vuot_Khung;      
        if (data.LG_Khoan_Chinh && data.LG_Khoan_Chinh != '' ) changes.LG_Khoan_Chinh = data.LG_Khoan_Chinh;      
        if (data.Ty_le && data.Ty_le != '' ) changes.Ty_le = data.Ty_le;      
        if (data.GHI_CHU_LUONG && data.GHI_CHU_LUONG != '' ) changes.GHI_CHU_LUONG = data.GHI_CHU_LUONG;      
        if (data.GHI_CHU_KHAC && data.GHI_CHU_KHAC != '' ) changes.GHI_CHU_KHAC = data.GHI_CHU_KHAC;      
              
        app.model.qt_luong.update(req.body._id, changes, (error, qt_luong) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_luong });
            }
        })
    });
}