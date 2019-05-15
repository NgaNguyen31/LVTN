module.exports = app => {
    app.get('/admin/qt_bbao/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_bbao.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_bbao/all', app.role.isAdmin, (req, res) => {
        app.model.qt_bbao.getAll((error, qt_bbao) => {
            if (error) res.send({error});
            else res.send({qt_bbao});
        })
    })

    app.delete('/admin/qt_bbao', app.role.isAdmin, (req, res) => app.model.qt_bbao.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_bbao', app.role.isAdmin, (req, res) => {                
        app.model.qt_bbao.create(req.body.qt_bbao, (error, qt_bbao) => {            
            res.send({ error, qt_bbao })
        });
    });

    app.put('/admin/qt_bbao', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.STT && data.STT != '' ) changes.STT = data.STT;        
        if (data.BAI_BAO && data.BAI_BAO != '' ) changes.BAI_BAO = data.BAI_BAO;        
        if (data.TEN_TCHI && data.TEN_TCHI != '' ) changes.TEN_TCHI = data.TEN_TCHI;        
        if (data.NAM && data.NAM != '' ) changes.NAM = data.NAM;         
              
        app.model.qt_bbao.update(req.body._id, changes, (error, qt_bbao) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_bbao });
            }
        })
    });
}