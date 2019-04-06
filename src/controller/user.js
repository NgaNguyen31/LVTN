module.exports = app => {
    app.get('/admin/user/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.user.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.post('/admin/user', app.role.isAdmin, (req, res) => {
        const password = req.body.user.password;
        app.model.user.create(req.body.user, (error, user) => {
            //TODO: send email
            // app.model.setting.get(['emailCreateMemberByAdminTitle', 'emailCreateMemberByAdminText', 'emailCreateMemberByAdminHtml'], result => {
            //     let url = req.protocol + '://' + req.get('host') + '/active-user/' + user._id,
            //         mailTitle = result.emailCreateMemberByAdminTitle,
            //         mailText = result.emailCreateMemberByAdminText.replaceAll('{name}', user.firstname + ' ' + user.lastname)
            //             .replaceAll('{firstname}', user.firstname).replaceAll('{lastname}', data.lastname)
            //             .replaceAll('{email}', user.email).replaceAll('{password}', user.password).replaceAll('{url}', url),
            //         mailHtml = result.emailCreateMemberByAdminHtml.replaceAll('{name}', user.firstname + ' ' + user.lastname)
            //             .replaceAll('{firstname}', user.firstname).replaceAll('{lastname}', data.lastname)
            //             .replaceAll('{email}', user.email).replaceAll('{password}', user.password).replaceAll('{url}', url);
            //     app.email.sendEmail(user.email, [], mailTitle, mailText, mailHtml, null);
            // });
            res.send({ error, user })
        });
    });

    app.put('/admin/user', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.firstname && data.firstname != '') changes.firstname = data.firstname;
        if (data.lastname && data.lastname != '') changes.lastname = data.lastname;
        if (data.email && data.email != '') changes.email = data.email;
        if (data.role) changes.role = data.role;
        if (data.password) changes.password = data.password;
        if (data.phoneNumber || data.phoneNumber == '') changes.phoneNumber = data.phoneNumber;
        if (data.active != null) changes.active = data.active;

        app.model.user.update(req.body._id, changes, (error, user) => {
            if (error) {
                res.send({ error });
            } else {
                //TODO: send email
                // if (changes.password) {
                //     app.model.setting.get(['emailNewPasswordTitle', 'emailNewPasswordText', 'emailNewPasswordHtml'], result => {
                //         let mailTitle = result.emailNewPasswordTitle,
                //             mailText = result.emailNewPasswordText.replaceAll('{name}', user.firstname + ' ' + user.lastname)
                //                 .replaceAll('{firstname}', user.firstname).replaceAll('{lastname}', data.lastname)
                //                 .replaceAll('{email}', user.email).replaceAll('{password}', data.password),
                //             mailHtml = result.emailNewPasswordHtml.replaceAll('{name}', user.firstname + ' ' + user.lastname)
                //                 .replaceAll('{firstname}', user.firstname).replaceAll('{lastname}', data.lastname)
                //                 .replaceAll('{email}', user.email).replaceAll('{password}', data.password);
                //         app.email.sendEmail(user.email, [], mailTitle, mailText, mailHtml, null);
                //     });
                // }

                user.password = '';
                res.send({ error, user });
            }
        })
    });

    app.delete('/admin/user', app.role.isAdmin, (req, res) => app.model.user.delete(req.body._id, error => res.send({ error })));

    app.put('/admin/profile', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.firstname && data.firstname != '') changes.firstname = data.firstname;
        if (data.lastname && data.lastname != '') changes.lastname = data.lastname;
        if (data.email && data.email != '') changes.email = data.email;
        if (data.password) changes.password = data.password;
        if (data.phoneNumber || data.phoneNumber == '') changes.phoneNumber = data.phoneNumber;

        app.model.user.update(req.session.user._id, changes, (error, user) => {
            if (user) {
                req.session.user = user;
                user = app.clone({}, user, { password: null });
            }
            res.send({ error, user });
        })
    });


    // Home -----------------------------------------------------------------------------------------------------------------------------------------
    app.post('/register', (req, res) => app.registerUser(req, res, 'user'));
    app.post('/login', app.loginUser);
    app.post('/logout', app.logoutUser);

    app.post('/active-user/:userId', (req, res) => app.model.user.get(req.params.userId, (error, user) => {
        if (error || user == null) {
            res.send({
                message: 'Địa chỉ kích hoạt tài khoản không đúng!'
            });
        } else if (user.active) {
            res.send({
                message: 'Bạn kích hoạt tài khoản đã được kích hoạt!'
            });
        } else if (user.token !== 'new') {
            res.send({
                message: 'Bạn kích hoạt tài khoản đã được kích hoạt!'
            });
        } else {
            user.active = true;
            user.token = '';
            user.save(error => res.send({
                message: error ? 'Quá trình kích hoạt tài khoản đã lỗi!' : 'Bạn đã kích hoạt tài khoản thành công!'
            }));
        }
    }));

    app.put('/forgot-password', app.isGuest, (req, res) => app.model.user.getByEmail(req.body.email, (error, user) => {
        if (error || user === null) {
            res.send({ error: 'Email không tồn tại!' });
        } else {
            user.token = app.getToken(8);
            user.tokenDate = new Date().getTime() + 24 * 60 * 60 * 1000;
            user.save(error => {
                if (error) {
                    res.send({ error })
                } else {
                    //TODO: send email
                    // app.model.setting.get(['emailForgotPasswordTitle', 'emailForgotPasswordText', 'emailForgotPasswordHtml'], result => {
                    //     let a = '';
                    //     let url = (app.isDebug ? app.debugUrl : app.rootUrl) + '/forgot-password/' + user._id + '/' + user.token,
                    //         mailTitle = result.emailForgotPasswordTitle,
                    //         mailText = result.emailForgotPasswordText.replaceAll('{name}', user.name).replaceAll('{email}', user.email).replaceAll('{url}', url),
                    //         mailHtml = result.emailForgotPasswordHtml.replaceAll('{name}', user.name).replaceAll('{email}', user.email).replaceAll('{url}', url);
                    //     app.email.sendEmail(user.email, [], mailTitle, mailText, mailHtml, null);
                    // });

                    res.send({ error: null });
                }
            });
        }
    }));

    app.post('/forgot-password/:userId/:userToken', (req, res) => app.model.user.get(req.params.userId, (error, user) => {
        if (error || user == null) {
            res.send({ error: 'Link không hợp lệ!' });
        } else {
            if (user.token === req.params.userToken) {
                if (new Date().getTime() <= new Date(user.tokenDate).getTime()) {
                    res.send({});
                } else {
                    res.send({ error: 'Sau 24 giờ, đường link đã mất hiệu lực!' });
                }
            } else {
                res.send({ error: 'Link không hợp lệ!' });
            }
        }
    }));

    app.put('/forgot-password/new-password', app.isGuest, (req, res) => app.model.user.get(req.body.userId, (error, user) => {
        if (error || user == null) {
            res.send({ error: 'Mã số người dùng không hợp lệ!' });
        } else {
            if (user.token === req.body.token) {
                user.password = app.model.user.hashPassword(req.body.password);
                user.save(error => res.send({ error: error ? 'Doi mat khau bi loi!' : null }));
            } else {
                res.send({ error: 'Đường link không hợp lệ!' });
            }
        }
    }));

    app.put('/user/profile', app.role.isUser, (req, res) => app.model.user.update(req.session.user._id, req.body.changes, (error, user) => {
        if (user) req.session.user = user;
        res.send({ error, user });
    }));

    app.put('/user/profile/password', app.role.isUser, (req, res) => app.model.user.auth(req.session.user.email, req.body.currentPassword, user => {
        if (user) {
            user.password = app.model.user.hashPassword(req.body.newPassword);
            user.save(error => res.send({ error: error ? 'Error when you change password!' : null }));
        } else {
            res.send({ error: 'Invalid current password!' });
        }
    }));
};