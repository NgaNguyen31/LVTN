module.exports = app => {
    app.get('/admin/qt_gtrinh/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.qt_gtrinh.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/qt_gtrinh/all', app.role.isAdmin, (req, res) => {
        app.model.qt_gtrinh.getAll((error, qt_gtrinh) => {
            if (error) res.send({error});
            else res.send({qt_gtrinh});
        })
    })

    app.delete('/admin/qt_gtrinh', app.role.isAdmin, (req, res) => app.model.qt_gtrinh.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/qt_gtrinh', app.role.isAdmin, (req, res) => {                
        app.model.qt_gtrinh.create(req.body.qt_gtrinh, (error, qt_gtrinh) => {            
            res.send({ error, qt_gtrinh })
        });
    });

    app.put('/admin/qt_gtrinh', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MS_NV) changes.MS_NV = data.MS_NV;
        if (data.STT && data.STT != '' ) changes.STT = data.STT;        
        if (data.G_Trinh && data.G_Trinh != '' ) changes.G_Trinh = data.G_Trinh;        
        if (data.NamXB && data.NamXB != '' ) changes.NamXB = data.NamXB;        
        if (data.NhaXB && data.NhaXB != '' ) changes.NhaXB = data.NhaXB;         
              
        app.model.qt_gtrinh.update(req.body._id, changes, (error, qt_gtrinh) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, qt_gtrinh });
            }
        })
    });
}