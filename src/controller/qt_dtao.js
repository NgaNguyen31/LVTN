module.exports = app => {
    app.get('/admin/qt_dtao/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_dtao.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_dtao/all', app.role.isAdmin, (req, res) => {
        app.model.qt_dtao.getAll((error, qt_dtao) => {
            if (error) res.send({error});
            else res.send({qt_dtao});
        })
    })

    app.delete('/admin/qt_dtao', app.role.isAdmin, (req, res) => app.model.qt_dtao.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_dtao', app.role.isAdmin, (req, res) => {                
        app.model.qt_dtao.create(req.body.qt_dtao, (error, qt_dtao) => {            
            res.send({ error, qt_dtao })
        });
    });

    app.put('/admin/qt_dtao', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
            if (data.MS_NV) changes.MS_NV = data.MS_NV;
            if (data.STT && data.STT != '' ) changes.STT = data.STT;        
            if (data.TU_THANG && data.TU_THANG != '' ) changes.TU_THANG = data.TU_THANG;        
            if (data.TU_NAM && data.TU_NAM != '' ) changes.TU_NAM = data.TU_NAM;        
            if (data.DEN_THANG && data.DEN_THANG != '' ) changes.DEN_THANG = data.DEN_THANG;         
            if (data.DEN_NAM && data.DEN_NAM != '' ) changes.DEN_NAM = data.DEN_NAM;        
            if (data.cap_dt && data.cap_dt != '') changes.cap_dt = data.cap_dt;
            if (data.CHUYEN_NGANH && data.CHUYEN_NGANH != '' ) changes.CHUYEN_NGANH = data.CHUYEN_NGANH;        
            if (data.NOI_DT && data.NOI_DT != '' ) changes.NOI_DT = data.NOI_DT;
            if (data.QUOC_GIA && data.QUOC_GIA != '' ) changes.QUOC_GIA = data.QUOC_GIA;
            if (data.HINH_THUC && data.HINH_THUC != '' ) changes.HINH_THUC = data.HINH_THUC;        
            if (data.LOAI_TN && data.LOAI_TN != '' ) changes.LOAI_TN = data.LOAI_TN;        
            if (data.NAM && data.NAM != '' ) changes.NAM = data.NAM;
            if (data.CO_NOP_BANG && data.CO_NOP_BANG != '' ) changes.CO_NOP_BANG = data.CO_NOP_BANG;       
            if (data.GHI_CHU && data.GHI_CHU != '' ) changes.GHI_CHU = data.GHI_CHU;        
                   
        app.model.qt_dtao.update(req.body._id, changes, (error, qt_dtao) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_dtao });
            }
        })
    });
}