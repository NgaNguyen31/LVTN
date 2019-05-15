module.exports = app => {
    app.get('/admin/dk_klgd/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.dk_klgd.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/dk_klgd/all', app.role.isAdmin, (req, res) => {
        app.model.dk_klgd.getAll((error, dk_klgd) => {
            if (error) res.send({error});
            else res.send({dk_klgd});
        })
    })

    app.post('/admin/dk_klgd', app.role.isAdmin, (req, res) => {
        app.model.dk_klgd.create(req.body.dk_klgd, (error, dk_klgd) => {
            res.send({ error, dk_klgd })
        });
    });

    app.put('/admin/dk_klgd', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        data.MS_NV && (changes.SHCC = data.SHCC);
        data.STT && data.STT != '' && (changes.STT = data.STT);
        data.HO && data.HO != '' && (changes.HO = data.HO);
        data.TEN && data.TEN != '' && (changes.TEN = data.TEN);        
        data.MS_BM && (changes.MS_BM = data.MS_BM);
        data.MS_CV && (changes.MS_CV = data.MS_CV);
        data.TU_DK && data.TU_DK != '' && (changes.TU_DK = data.TU_DK);
        data.NHOMLOP && data.NHOMLOP != '' && (changes.NHOMLOP = data.NHOMLOP);
        data.SO_SV && data.SO_SV != '' && (changes.SO_SV = data.SO_SV);
        data.SO_TIET_THUC && data.SO_TIET_THUC != ''&& (changes.SO_TIET_THUC = data.SO_TIET_THUC);
        data.SO_TIET_QUY_DOI && data.SO_TIET_QUY_DOI != '' && (changes.SO_TIET_QUY_DOI = data.SO_TIET_QUY_DOI);
        data.TU_NGAY && data.TU_NGAY != '' && (changes.TU_NGAY = data.TU_NGAY);
        data.DEN_NGAY && data.DEN_NGAY != '' && (changes.DEN_NGAY = data.DEN_NGAY);
        data.GHI_CHU && data.GHI_CHU != ''&& (changes.GHI_CHU = data.GHI_CHU);

        app.model.dk_klgd.update(req.body._id, changes, (error, dk_klgd) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, dk_klgd });
            }
        })
    });

    app.delete('/admin/dk_klgd', app.role.isAdmin, (req, res) => {
        app.model.dk_klgd.delete(req.body._id, error => res.send({ error }))
    }
    );
};