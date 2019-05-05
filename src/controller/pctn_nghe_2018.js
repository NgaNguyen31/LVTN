module.exports = app => {
    app.get('/admin/pctn_nghe_2018/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.pctn_nghe_2018.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/pctn_nghe_2018/all', app.role.isAdmin, (req, res) => {
        app.model.pctn_nghe_2018.getAll((error, pctn_nghe_2018) => {
            if (error) res.send(error);
            else res.send({pctn_nghe_2018});
        })
    })

    app.post('/admin/pctn_nghe_2018', app.role.isAdmin, (req, res) => {
        app.model.pctn_nghe_2018.create(req.body.pctn_nghe_2018, (error, pctn_nghe_2018) => {
            res.send({ error, pctn_nghe_2018 })
        });
    });

    app.put('/admin/pctn_nghe_2018', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        data.SHCC && data.SHCC != '' && (changes.SHCC = data.SHCC);
        data.HO && data.HO != '' && (changes.HO = data.HO);
        data.TEN && data.TEN != '' && (changes.TEN = data.TEN);
        data.NGAY_SINH && data.NGAY_SINH != '' && (changes.NGAY_SINH = data.NGAY_SINH);
        data.MS_CDNN && data.MS_CDNN != '' && (changes.MS_CDNN = data.MS_CDNN);
        data.NGAY_PCTN_OLD && data.NGAY_PCTN_OLD != '' && (changes.NGAY_PCTN_OLD = data.NGAY_PCTN_OLD);
        data.PT_PCTN_OLD && data.PT_PCTN_OLD != '' && (changes.PT_PCTN_OLD = data.PT_PCTN_OLD);
        data.NGAY_PCTN_NEW && data.NGAY_PCTN_NEW != '' && (changes.NGAY_PCTN_NEW = data.NGAY_PCTN_NEW);
        data.PT_PCTN_NEW && data.PT_PCTN_NEW != '' && (changes.PT_PCTN_NEW = data.NGAY_PCTN_NEW);
        data.DON_VI && data.DON_VI != ''&& (changes.DON_VI = data.DON_VI);

        app.model.pctn_nghe_2018.update(req.body._id, changes, (error, pctn_nghe_2018) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, pctn_nghe_2018 });
            }
        })
    });

    app.delete('/admin/pctn_nghe_2018', app.role.isAdmin, (req, res) => {
        app.model.pctn_nghe_2018.delete(req.body._id, error => res.send({ error }))
    }
    );
};