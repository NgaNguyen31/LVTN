module.exports = app => {
    app.get('/admin/cbcnv_hd_dv_tu_tra/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.cbcnv_hd_dv_tu_tra.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/cbcnv_hd_dv_tu_tra/all', app.role.isAdmin, (req, res) =>{
        app.model.cbcnv_hd_dv_tu_tra.getAll((error, cbcnv_hd_dv_tu_tra)=> {
            if (error) res.send(error);
            else res.send(cbcnv_hd_dv_tu_tra);
        })
    })
    app.delete('/admin/cbcnv_hd_dv_tu_tra', app.role.isAdmin, (req, res) => app.model.cbcnv_hd_dv_tu_tra.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/cbcnv_hd_dv_tu_tra', (req, res) => app.model.cbcnv_hd_dv_tu_tra.create(req.body.cbcnv_hd_dv_tu_tra, (error, item) => {
        app.model.cbcnv_hd_dv_tu_tra.create(req.body.cbcnv_hd_dv_tu_tra, (error, cbcnv_hd_dv_tu_tra) =>{
            res.send({ error, cbcnv_hd_dv_tu_tra });
        })
        
    }));

    app.put('admin/cbcnv_hd_dv_tu_tra', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
        changes ={};
        if (data.MSNV && data.MSNV != '') changes.MSNV = data.MSNV;
        if (data.HO && data.HO != '') changes.HO = data.HO;
        if (data.TEN && data.TEN != '') changes.TEN = data.TEN;
        if (data.NGAY_SINH && data.NGAY_SINH != '') changes.NGAY_SINH = data.NGAY_SINH;
        if (data.NOI_SINH && data.NOI_SINH != '') changes.NOI_SINH = data.NOI_SINH;
        if (data.NGAY_VAO && data.NGAY_VAO != '') changes.NGAY_VAO = data.NGAY_VAO;
        if (data.NGAY_NGHI && data.NGAY_NGHI != '') changes.NGAY_NGHI = data.NGAY_NGHI;
        if (data.TRINH_DO && data.TRINH_DO != '') changes.TRINH_DO = data.TRINH_DO;
        if (data.DON_VI && data.DON_VI != '') changes.DON_VI = data.DON_VI;
        if (data.DIA_CHI && data.DIA_CHI != '') changes.DIA_CHI = data.DIA_CHI;
        if (data.GHI_CHU && data.GHI_CHU != '') changes.GHI_CHU = data.GHI_CHU;

        app.model.cbcnv_hd_dv_tu_tra.update(req.body._id, changes, (error, cbcnv_hd_dv_tu_tra) => {
            if (error) {
                res.send(error);
            }
            else res.send(cbcnv_hd_dv_tu_tra);
        })
    })
}