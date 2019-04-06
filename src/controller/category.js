module.exports = app => {
    app.get('/category/:type', (req, res) => ['news', 'event', 'job'].indexOf(req.params.type) == -1 ?
        res.send({ error: 'Invalid type' }) : app.model.category.getAll(req.params.type, (error, items) => res.send({ error, items })));

    app.post('/admin/category', app.role.isAdmin, (req, res) => app.model.category.create(req.body.data, (error, item) => {
        const categoryType = item.type + 'CategoryImage';
        if (item && req.session[categoryType]) {
            app.adminUploadImage(item.type + 'Category', app.model.category.get, item._id, req.session[categoryType], req, res);
        } else {
            res.send({ error, item });
        }
    }));

    app.put('/admin/category', app.role.isAdmin, (req, res) =>
        app.model.category.update(req.body._id, req.body.changes, (error, item) => res.send({ error, item })));

    app.put('/admin/category/swap', app.role.isAdmin, (req, res) => {
        const isMoveUp = req.body.isMoveUp.toString() == 'true';
        app.model.category.swapPriority(req.body._id, isMoveUp, error => res.send({ error }));
    });

    app.delete('/admin/category', app.role.isAdmin, (req, res) => app.model.category.delete({ _id: req.body._id }, error => res.send({ error })));
};