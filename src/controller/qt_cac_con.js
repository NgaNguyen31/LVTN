module.exports = app => {
    app.get('/admin/qt_cac_con/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_cac_con.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_cac_con/all', app.role.isAdmin, (req, res) => {
        app.model.qt_cac_con.getAll((error, qt_cac_con) => {
            if (error) res.send({error});
            else res.send({qt_cac_con});
        })
    })

    app.delete('/admin/qt_cac_con', app.role.isAdmin, (req, res) => app.model.qt_cac_con.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_cac_con', app.role.isAdmin, (req, res) => {                
        app.model.qt_cac_con.create(req.body.qt_cac_con, (error, qt_cac_con) => {            
            res.send({ error, qt_cac_con })
        });
    });

    app.put('/admin/qt_cac_con', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.STT && data.STT != '' ) changes.STT = data.STT;        
        if (data.TEN && data.TEN != '' ) changes.TEN = data.TEN;        
        if (data.NAM_SINH && data.NAM_SINH != '' ) changes.NAM_SINH = data.NAM_SINH;        
        if (data.CVU) changes.CVU = data.CVU;
        if (data.CTAC && data.CTAC != '' ) changes.CTAC = data.CTAC;         
              
        app.model.qt_cac_con.update(req.body._id, changes, (error, qt_cac_con) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_cac_con });
            }
        })
    });
}