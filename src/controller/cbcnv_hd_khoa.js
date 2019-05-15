module.exports = app => {
    app.get('/admin/cbcnv_hd_khoa/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.cbcnv_hd_khoa.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/cbcnv_hd_khoa/all', app.role.isAdmin, (req, res) => {
        app.model.cbcnv_hd_khoa.getAll((error, cbcnv_hd_khoa) => {
            if (error) res.send({error});
            else res.send({cbcnv_hd_khoa});
        })
    })

    app.delete('/admin/cbcnv_hd_khoa', app.role.isAdmin, (req, res) => app.model.cbcnv_hd_khoa.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/cbcnv_hd_khoa', app.role.isAdmin, (req, res) => {        
        app.model.cbcnv_hd_khoa.create(req.body.cbcnv_hd_khoa, (error, cbcnv_hd_khoa) => {
            
            console.log('b',error, cbcnv_hd_khoa);
            res.send({ error, cbcnv_hd_khoa })
        });
    });

    app.put('/admin/cbcnv_hd_khoa', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MSBM) changes.MSBM = data.MSBM;
        if (data.HO && data.HO != '') changes.HO = data.HO;
        if (data.TEN && data.TEN != '') changes.TEN = data.TEN;
        if (data.PHAI && data.PHAI != '') changes.PHAI = data.PHAI;
        if (data.NAM_SINH && data.NAM_SINH != '') changes.NAM_SINH = data.NAM_SINH;
        if (data.The_BHYT && data.The_BHYT != '') changes.The_BHYT = data.The_BHYT;
        if (data.Noi_kham && data.Noi_kham != '') changes.Noi_kham = data.Noi_kham;
        if (data.LCB && data.LCB != '') changes.LCB = data.LCB;
        if (data.PC && data.PC != '') changes.PC = data.PC;
        if (data.Xoa != null) changes.Xoa = data.Xoa;

    
        app.model.cbcnv_hd_khoa.update(req.body._id, changes, (error, cbcnv_hd_khoa) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, cbcnv_hd_khoa });
            }
        })
    });
}