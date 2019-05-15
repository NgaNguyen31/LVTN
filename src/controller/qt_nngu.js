module.exports = app => {
    app.get('/admin/qt_nngu/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_nngu.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_nngu/all', app.role.isAdmin, (req, res) => {
        app.model.qt_nngu.getAll((error, qt_nngu) => {
            if (error) res.send({error});
            else res.send({qt_nngu});
        })
    })

    app.delete('/admin/qt_nngu', app.role.isAdmin, (req, res) => app.model.qt_nngu.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_nngu', app.role.isAdmin, (req, res) => {                
        app.model.qt_nngu.create(req.body.qt_nngu, (error, qt_nngu) => {            
            res.send({ error, qt_nngu })
        });
    });

    app.put('/admin/qt_nngu', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.N_NGU) changes.N_NGU = data.N_NGU;        
        if (data.TRINH_DO && data.TRINH_DO != '' ) changes.TRINH_DO = data.TRINH_DO;        
        if (data.GHI_CHU && data.GHI_CHU != '' ) changes.GHI_CHU = data.GHI_CHU;      
              
        app.model.qt_nngu.update(req.body._id, changes, (error, qt_nngu) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_nngu });
            }
        })
    });
}