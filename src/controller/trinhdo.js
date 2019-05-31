module.exports = app => {
    app.get('/admin/trinhdo/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.trinhdo.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/trinhdo/all', app.role.isAdmin, (req, res) => {
        app.model.trinhdo.getAll((error, trinhdo) => {
            if (error) {
                res.send({error});
            }
            else res.send({trinhdo});        
        });
    });

    app.delete('/admin/trinhdo', app.role.isAdmin, (req, res) => app.model.trinhdo.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/trinhdo', (req, res) => {
        app.model.trinhdo.create(req.body.trinhdo, (error, trinhdo) => {
            res.send({ error, trinhdo})
        })
    });

    app.put('/admin/trinhdo', (req, res) => {
        let data = req.body.changes,
            changes = {};
            if (data.trinh_do && data.trinh_do != '') changes.trinh_do = data.trinh_do;
            if (data.Ten_day_du && data.Ten_day_du != '') changes.Ten_day_du = data.Ten_day_du;
            if (data.ord && data.ord != '') changes.ord = data.ord;

        app.model.trinhdo.update(req.body._id, changes, (error, trinhdo) =>{
        if (error) {
            res.send(error);
        }
        else res.send(trinhdo);
        });
    })
}