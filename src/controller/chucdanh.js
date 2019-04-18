module.exports = app => {
    app.get('/admin/chucdanh/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.chucdanh.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.post('/admin/chucdanh', app.role.isAdmin, (req, res) => {
        app.model.chucdanh.create(req.body.chucdanh, (error, chucdanh) => {
            res.send({ error, chucdanh })
        });
    });

    app.put('/admin/chucdanh', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        data.chuc_danh && data.chuc_danh != '' && (changes.chuc_danh = data.chuc_danh);
        data.ten_day_du & data.ten_day_du != '' && (changes.ten_day_du = data.ten_day_du);
        
        app.model.chucdanh.update(req.body._id, changes, (error, chucdanh) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, chucdanh });
            }
        })
    });

    app.delete('/admin/chucdanh', app.role.isAdmin, (req, res) => {
        app.model.chucdanh.delete(req.body._id, error => res.send({ error }))
    }
    );
};