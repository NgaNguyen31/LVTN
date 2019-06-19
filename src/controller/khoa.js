module.exports = app => {
    app.get('/admin/khoa/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.khoa.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });
    app.get('/admin/khoa/all', app.role.isAdmin, (req, res) => {
        app.model.khoa.getAll((error, khoa) => {
            if (error) {
                res.send({ error });
            } else {                
                res.send({khoa});
            }
        })
    })

    app.delete('/admin/khoa', app.role.isAdmin, (req, res) => app.model.khoa.delete(req.body._id, error => res.send({ error })));

    app.put('/admin/khoa', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        data.ten_khoa && data.ten_khoa != '' && (changes.ten_khoa = data.ten_khoa);
        data.ten_tieng_anh && data.ten_tieng_anh != '' && (changes.ten_tieng_anh = data.ten_tieng_anh);
        data.ten_khoa_tat && data.ten_khoa_tat != '' && (changes.ten_khoa_tat = data.ten_khoa_tat);
        app.model.khoa.update(req.body._id, changes, (error, khoa) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, khoa });
            }
        })
    });

    app.post('/admin/khoa', app.role.isAdmin, (req, res) => {
        app.model.khoa.create(req.body.khoa, (error, khoa) => {
            res.send({ error, khoa })
        });
    });
}