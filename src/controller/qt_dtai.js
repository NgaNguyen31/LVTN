module.exports = app => {
    app.get('/admin/qt_dtai/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_dtai.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_dtai/all', app.role.isAdmin, (req, res) => {
        app.model.qt_dtai.getAll((error, qt_dtai) => {
            if (error) res.send({error});
            else res.send({qt_dtai});
        })
    })

    app.delete('/admin/qt_dtai', app.role.isAdmin, (req, res) => app.model.qt_dtai.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_dtai', app.role.isAdmin, (req, res) => {                
        app.model.qt_dtai.create(req.body.qt_dtai, (error, qt_dtai) => {            
            res.send({ error, qt_dtai })
        });
    });

    app.put('/admin/qt_dtai', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
            if (data.MS_NV) changes.MS_NV = data.MS_NV;
            if (data.STT && data.STT != '' ) changes.STT = data.STT;        
            if (data.DE_TAI && data.DE_TAI != '' ) changes.DE_TAI = data.DE_TAI;        
            if (data.CHU_NHIEM_DE_TAI && data.CHU_NHIEM_DE_TAI != '' ) changes.CHU_NHIEM_DE_TAI = data.CHU_NHIEM_DE_TAI;        
            if (data.CAP && data.CAP != '' ) changes.CAP = data.CAP;        
            if (data.NGAY_KETTHUC && data.NGAY_KETTHUC != '' ) changes.NGAY_KETTHUC = data.NGAY_KETTHUC;        
            if (data.NAM && data.NAM != '' ) changes.NAM = data.NAM;        

        app.model.qt_dtai.update(req.body._id, changes, (error, qt_dtai) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_dtai });
            }
        })
    });
}