module.exports = app => {
    ['/admin', '/admin/settings', '/admin/email',
        '/admin/profile', '/admin/user',
        '/admin/news/category', '/admin/news/list', '/admin/news/edit/:newsId',
        '/admin/event/category', '/admin/event/list', '/admin/event/edit/:eventId',
        '/admin/job/category', '/admin/job/list', '/admin/job/edit/:jobId',
        '/admin/contact', '/admin/contact/read/:contactId', '/admin/chau', '/admin/tinh',
        '/admin/benhvien', '/admin/bomon', '/admin/cb_nngoai', '/admin/cbcnv_hd_dv_tu_tra', '/admin/cbcnv_hd_khoa', '/admin/cbcnv',
        '/admin/chinhsach', '/admin/chucdanh', '/admin/chucvu', '/admin/cv_klgd', '/admin/dantoc', '/admin/dk_klgd', 
        '/admin/heso', '/admin/khoa', '/admin/khoi_luong_gd_caohoc', '/admin/khuvuc', '/admin/kiemnhiem', '/admin/kihieu_tang_giam_bhxh', 
        '/admin/loai', '/admin/mucdich', '/admin/ngach', '/admin/nghi_ctac', '/admin/ngoaingu', '/admin/nuoc',
        '/admin/nuocngoai', '/admin/pctn_nghe_2018', '/admin/phanloai', '/admin/qt_bbao', '/admin/qt_boiduong', '/admin/qt_cac_con', 
        '/admin/qt_ctac', '/admin/qt_cvu', '/admin/qt_dtai', '/admin/qt_dtao', '/admin/qt_gtrinh', '/admin/qt_khen', '/admin/qt_ky_luat',
        '/admin/qt_luong','/admin/qt_nngoai','/admin/qt_nngu','/admin/qt_tnghiem','/admin/tinh','/admin/tongiao', '/admin/trinhdo',
    ].forEach(route => app.get(route, app.role.isAdmin, (req, res) => app.createResponse(req, res, '/main.template')));

    // Editor ---------------------------------------------------------------------------------------------------------------------------------------
    ['/editor', '/editor/profile',
        '/editor/news/list', '/editor/news/edit/:newsId',
        '/editor/event/list', '/editor/event/edit/:eventId',
        '/editor/job/list', '/editor/job/edit/:jobId'
    ].forEach(route => app.get(route, app.role.isEditor, (req, res) => app.createResponse(req, res, '/main.template')));


    // Home -----------------------------------------------------------------------------------------------------------------------------------------
    ['/', '/index.htm(l)?', '/404.htm(l)?',
    ].forEach(route => app.get(route, (req, res) => app.createResponse(req, res, '/main.template')));

    app.get('/home/state', (req, res) => {
        const data = app.clone(app.data, {
            emailPassword: '',
            user: req.session.user ? app.clone(req.session.user, { password: '', token: '', tokenDate: '' }) : null,
        });

        const role = req.session.user ? req.session.user.role.toString().trim().toLowerCase() : '';
        if (role == 'admin') {
            res.send(data);
        } else if (role == 'editor') {
            res.send(data);
        } else {
            res.send(app.clone(data, {
                numberOfUser: 0,
                numberOfNews: 0,
                numberOfEvent: 0,
                numberOfJob: 0,
                user: req.session.user,
            }));
        }
    });

    app.redirectToWebpackServer();
};