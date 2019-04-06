module.exports = app => {
    const privateKey = app.fs.readFileSync(app.assetPath + '/private.key', 'utf8');
    const publicKey = app.fs.readFileSync(app.assetPath + '/public.key', 'utf8');
    const jwt = require('jsonwebtoken');
    app.tokenAuth = {
        sign: data => jwt.sign(data, privateKey, { expiresIn: '168h', algorithm: 'RS256' }), //// RSASSA [ "RS256", "RS384", "RS512" ]
        verify: (token, done) => jwt.verify(token, publicKey, done),
    }


    app.role = {
        list: ['admin', 'editor', 'user'],
        debugUser: {
            admin: {
                firstname: 'Admin',
                lastname: 'Admin',
                email: app.defaultAdminEmail,
                password: app.defaultAdminPassword,
                active: true
            },
            editor: {
                firstname: 'Editor',
                lastname: 'Editor',
                email: 'editor@hcmut.edu.vn',
                password: '123456',
                active: true
            },
            user: {
                firstname: 'User',
                lastname: 'User',
                email: 'hithanhtung@gmail.com',
                password: '123456',
                active: true
            },
        }
    };

    const debugAsUser = (req, next, role, error) => {
        if (app.isDebug && app.autoLogin) {
            const email = app.role.debugUser[role].email;
            app.model.user.getByEmail(email, (error, user) => {
                if (error || user == null) {
                    console.error('Debug as ' + email + ' has errors!');
                } else {
                    req.session.user = user;
                    console.log('Debug as ' + req.session.user.role + '!');
                }
                next();
            });
        } else {
            error && error();
        }
    };
    app.role.list.forEach(role => app.role['is' + role.upFirstChar()] = (req, res, next) => {
        const isGetMethod = req.method.toLowerCase() === 'get';
        if (req.session.user == null) {
            debugAsUser(req, next, role, () => {
                if (isGetMethod) {
                    res.redirect('/request-login/' + role);
                } else {
                    res.send({ error: 'You must login as ' + role + '!' });
                }
            });
        } else if (req.session.user.role === role) {
            next();
        } else {
            debugAsUser(req, next, role, () => {
                if (isGetMethod) {
                    res.redirect('/request-permissions/' + role);
                } else {
                    res.send({ error: 'Insufficient user permissions!' });
                }
            });
        }
    });

    app.isLoginedUser = (req, res, next) => {
        if (req.session.user != null) {
            next();
        } else if (req.method.toLowerCase() === 'get') {
            res.redirect('/');
        } else {
            res.send({ error: 'You must login first!' });
        }
    };
    app.isGuest = (req, res, next) => {
        if (req.session.user == null) {
            next();
        } else if (req.method.toLowerCase() === 'get') {
            res.redirect('/');
        } else {
            res.send({ error: 'You has logged in!' });
        }
    };


    app.createDebugUser = () => {
        if (app.isDebug) {
            Object.keys(app.role.debugUser).forEach(role => {
                const user = app.role.debugUser[role];
                user.role = role;
                app.model.user.create(user, () => { });
            });
        } else {
            const user = app.clone({}, app.role.debugUser.admin, { role: 'admin' });
            app.model.user.create(user, () => { });
        }
    };

    app.registerUser = (req, res, role) => {
        if (req.session.user != null) {
            res.send({ error: 'You are logged in!' });
        } else {
            let data = {
                name: req.body.name.trim(),
                email: req.body.email.trim(),
                password: req.body.password,
                role: role,
                active: req.body.active !== undefined && req.body.active != null ? req.body.active : false
            };
            app.model.user.create(data, (error, user) => {
                if (error) {
                    res.send({ error });
                } else if (user == null) {
                    res.send({ error: 'The registration process has some errors! Please try later. Thank you.' });
                } else {
                    res.send({ error: null, user: app.clone({}, user, { password: null }) });

                    app.model.setting.get(['emailRegisterMemberTitle', 'emailRegisterMemberText', 'emailRegisterMemberHtml'], result => {
                        let url = (app.isDebug ? app.debugUrl : app.rootUrl) + '/active-user/' + user._id,
                            mailTitle = result.emailRegisterMemberTitle,
                            mailText = result.emailRegisterMemberText.replaceAll('{name}', user.name).replaceAll('{url}', url),
                            mailHtml = result.emailRegisterMemberHtml.replaceAll('{name}', user.name).replaceAll('{url}', url);
                        app.email.sendEmail(data.email, app.mailCc, mailTitle, mailText, mailHtml, null);
                    });
                }
            });
        }
    };
    app.loginUser = (req, res) => {
        if (req.session.user != null) {
            res.send({ error: 'You are logged in!' });
        } else {
            let email = req.body.email.trim(),
                password = req.body.password;
            app.model.user.auth(email, password, user => {
                if (user == null) {
                    res.send({ error: 'Invalid email or password!' });
                } else if (user.active && user.role.trim().toLowerCase() != 'user') {
                    req.session.user = user;
                    res.send({ user: app.clone({}, user, { password: null }) });
                } else {
                    res.send({ error: 'Your account is inactive!' });
                }
            });
        }
    };
    app.logoutUser = (req, res) => {
        req.session.user = null;
        res.send({ error: null });
    };

    const basicAuth = require('basic-auth');
    app.loginUserOnMobile = (req, res) => {
        const credentials = basicAuth(req);
        if (credentials) {
            app.model.user.auth(credentials.name, credentials.pass, user => {
                if (user == null) {
                    res.send({ error: 'Invalid email or password!' });
                } else if (user.active) {
                    app.createFolder(app.path.join(app.photoPath, user._id.toString()));
                    res.send({
                        userId: user._id,
                        email: user.email,
                        token: app.tokenAuth.sign({ _id: user._id, email: user.email }),
                    });
                } else {
                    res.send({ error: 'Your account is inactive!' });
                }
            });
        } else {
            res.send({ error: 'Invalid parameters!' });
        }
    };
    app.logoutUserOnMobile = (req, res) => {
    };
    app.getUserOnMobile = (req, res) => {
        const credentials = basicAuth(req);
        if (credentials) {
            app.tokenAuth.verify(credentials.pass, (error, decoded) => {
                if (error || decoded == null || credentials.name != decoded.email) {
                    res.send({ error: 'Invalid token!' });
                } else {
                    app.model.user.getByEmail(credentials.name, (error, user) => {
                        if (error || user == null || user._id != decoded._id) {
                            res.send({ error: 'Invalid token!' });
                        } else {
                            app.createFolder(app.path.join(app.photoPath, decoded._id));
                            res.send({
                                userId: decoded._id,
                                email: decoded.email,
                            });
                        }
                    });
                }
            });
        } else {
            res.send({ error: 'Invalid parameters!' });
        }
    }
};