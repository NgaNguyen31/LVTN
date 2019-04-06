module.exports = app => {
    app.get('/admin/contact/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.contact.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/contact/unread', app.role.isAdmin, (req, res) => app.model.contact.getUnread((error, items) => res.send({ error, items })));

    app.get('/admin/contact/item/:_id', app.role.isAdmin, (req, res) => app.model.contact.read(req.params._id, (error, item) => {
        if (item) app.io.emit('contact-changed', item);
        res.send({ error, item });
    }));

    app.delete('/admin/contact', app.role.isAdmin, (req, res) => app.model.contact.delete(req.body._id, error => res.send({ error })));


    // Home -----------------------------------------------------------------------------------------------------------------------------------------
    app.post('/app/contact', (req, res) => app.model.contact.create(req.body.contact, (error, item) => {
        if (item) {
            app.io.emit('contact-added', item);
            //TODO: send email
        }

        res.send({ error, item });
    }));
};