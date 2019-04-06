module.exports = app => {
    const EmailParams = [
        'emailContactTitle', 'emailContactText', 'emailContactHtml',
    ];

    app.get('/admin/email/all', app.role.isAdmin, (req, res) => app.model.setting.get(EmailParams, result => res.send(result)));

    app.put('/admin/email', app.role.isAdmin, (req, res) => {
        const title = req.body.type + 'Title',
            text = req.body.type + 'Text',
            html = req.body.type + 'Html',
            changes = {};

        if (EmailParams.indexOf(title) != -1) changes[title] = req.body.email.title;
        if (EmailParams.indexOf(text) != -1) changes[text] = req.body.email.text;
        if (EmailParams.indexOf(html) != -1) changes[html] = req.body.email.html;

        app.model.setting.set(changes, error => res.send({ error }));
    });
};