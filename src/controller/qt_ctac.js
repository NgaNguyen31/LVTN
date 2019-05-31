module.exports = app => {
    app.get('/admin/qt_ctac/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_ctac.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_ctac/all', app.role.isAdmin, (req, res) => {
        app.model.qt_ctac.getAll((error, qt_ctac) => {
            if (error) res.send({error});
            else res.send({qt_ctac});
        })
    })

    app.delete('/admin/qt_ctac', app.role.isAdmin, (req, res) => app.model.qt_ctac.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_ctac', app.role.isAdmin, (req, res) => {                
        app.model.qt_ctac.create(req.body.qt_ctac, (error, qt_ctac) => {            
            res.send({ error, qt_ctac })
        });
    });

    app.put('/admin/qt_ctac', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
            if (data.MS_NV) changes.MS_NV = data.MS_NV;
            if (data.STT && data.STT != '' ) changes.STT = data.STT;        
            //if (data.TU_THANG && data.TU_THANG != '' ) changes.TU_THANG = data.TU_THANG;        
            if (data.TU_NAM && data.TU_NAM != '' ) changes.TU_NAM = data.TU_NAM;        
            //if (data.DEN_THANG && data.DEN_THANG != '' ) changes.DEN_THANG = data.DEN_THANG;         
            if (data.DEN_NAM && data.DEN_NAM != '' ) changes.DEN_NAM = data.DEN_NAM;        
            if (data.CHUC_VU && data.CHUC_VU != '' ) changes.CHUC_VU = data.CHUC_VU;
            if (data.NOI_CONG_TAC && data.NOI_CONG_TAC != '' ) changes.NOI_CONG_TAC = data.NOI_CONG_TAC;        
            if (data.BO_MON_CT && data.BO_MON_CT != '' ) changes.BO_MON_CT = data.BO_MON_CT;
            if (data.CONG_VIEC && data.CONG_VIEC != '' ) changes.CONG_VIEC = data.CONG_VIEC;        
            if (data.GHI_CHU && data.GHI_CHU != '' ) changes.GHI_CHU = data.GHI_CHU;        
                   
        app.model.qt_ctac.update(req.body._id, changes, (error, qt_ctac) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_ctac });
            }
        })
    });
}