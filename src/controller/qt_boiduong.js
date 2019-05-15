module.exports = app => {
    app.get('/admin/qt_boiduong/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_boiduong.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_boiduong/all', app.role.isAdmin, (req, res) => {
        app.model.qt_boiduong.getAll((error, qt_boiduong) => {
            if (error) res.send({error});
            else res.send({qt_boiduong});
        })
    })

    app.delete('/admin/qt_boiduong', app.role.isAdmin, (req, res) => app.model.qt_boiduong.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_boiduong', app.role.isAdmin, (req, res) => {                
        app.model.qt_boiduong.create(req.body.qt_boiduong, (error, qt_boiduong) => {            
            res.send({ error, qt_boiduong })
        });
    });

    app.put('/admin/qt_boiduong', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.STT && data.STT != '' ) changes.STT = data.STT;        
        if (data.TU_THANG && data.TU_THANG != '' ) changes.TU_THANG = data.TU_THANG;        
        if (data.TU_NAM && data.TU_NAM != '' ) changes.TU_NAM = data.TU_NAM;        
        if (data.DEN_THANG && data.DEN_THANG != '' ) changes.DEN_THANG = data.DEN_THANG;         
        if (data.DEN_NAM && data.DEN_NAM != '' ) changes.DEN_NAM = data.DEN_NAM;        
        if (data.NOI_DUNG_BD && data.NOI_DUNG_BD != '' ) changes.NOI_DUNG_BD = data.NOI_DUNG_BD;
        if (data.NOI_BOI_DUONG && data.NOI_BOI_DUONG != '' ) changes.NOI_BOI_DUONG = data.NOI_BOI_DUONG;        
        if (data.HINH_THUC && data.HINH_THUC != '' ) changes.HINH_THUC = data.HINH_THUC;
        if (data.CHUNG_CHI && data.CHUNG_CHI != '' ) changes.CHUNG_CHI = data.CHUNG_CHI;        
        if (data.NOP_CC != null ) changes.NOP_CC = data.NOP_CC;
        if (data.GHI_CHU && data.GHI_CHU != '' ) changes.GHI_CHU = data.GHI_CHU;        
              
        app.model.qt_boiduong.update(req.body._id, changes, (error, qt_boiduong) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_boiduong });
            }
        })
    });
}