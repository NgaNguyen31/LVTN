module.exports = app => {
    app.get('/admin/qt_tnghiem/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_tnghiem.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_tnghiem/all', app.role.isAdmin, (req, res) => {
        app.model.qt_tnghiem.getAll((error, qt_tnghiem) => {
            if (error) res.send({error});
            else res.send({qt_tnghiem});
        })
    })

    app.delete('/admin/qt_tnghiem', app.role.isAdmin, (req, res) => app.model.qt_tnghiem.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_tnghiem', app.role.isAdmin, (req, res) => {                
        app.model.qt_tnghiem.create(req.body.qt_tnghiem, (error, qt_tnghiem) => {            
            res.send({ error, qt_tnghiem })
        });
    });

    app.put('/admin/qt_tnghiem', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.STT && data.STT != '') changes.STT = data.STT;        
        if (data.BAI_TN && data.BAI_TN != '' ) changes.BAI_TN = data.BAI_TN;        
        if (data.NAM && data.NAM != '' ) changes.NAM = data.NAM;      
              
        app.model.qt_tnghiem.update(req.body._id, changes, (error, qt_tnghiem) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_tnghiem });
            }
        })
    });
}