module.exports = app => {
    app.data = {
        email: app.email.from,
        emailPassword: app.email.password,
    };

    // Count views --------------------------------------------------------------------------------
    // app.model.setting.init(app.data, () =>
    //     app.model.setting.get(['logo'], result => {
    //         app.data.logo = result.logo;
    //     }));

    app.model.user.count((error, numberOfUser) => {
        app.data.numberOfUser = error ? 0 : numberOfUser;
        app.model.news.count((error, numberOfNews) => {
            app.data.numberOfNews = error ? 0 : numberOfNews;
            app.model.event.count((error, numberOfEvent) => {
                app.data.numberOfEvent = error ? 0 : numberOfEvent;
                app.model.job.count((error, numberOfJob) => {
                    app.data.numberOfJob = error ? 0 : numberOfJob;
                    app.model.cbcnv.count({PHAI: 'Nam'}, (error, numberOfCBCNVNam) => {
                        app.data.numberOfCBCNVNam = error ? 0 : numberOfCBCNVNam;
                        app.model.cbcnv.count({PHAI: 'Nữ'}, (error, numberOfCBCNVNu) => {
                            app.data.numberOfCBCNVNu = error ? 0 : numberOfCBCNVNu;
                            app.model.cb_nngoai.count((error, numberOfCBNN) => {
                                app.data.numberOfCBNN = error ? 0 : numberOfCBNN;
                                app.model.cb_nngoai.count((error, numberOfCBNN) => {
                                    app.data.numberOfCBNN = error ? 0 : numberOfCBNN;
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // Email --------------------------------------------------------------------------------------
    app.model.setting.init({
        emailContactTitle: 'IU App: Liên hệ',
        emailContactText: 'Chào bạn, IU App đã nhận tin nhắn của bạn. Cảm ơn bạn đã liên hệ với chúng tôi. Tiêu đề liên hệ là: "{subject}". Thông điệp của bạn là: "{message}". IU App sẽ trả lời bạn sớm nhất. Trân trọng, IU App admin.',
        emailContactHtml: 'Chào bạn,<br/><br/>IU App đã nhận tin nhắn của bạn. Cảm ơn bạn đã liên hệ với chúng tôi.<br/>Tiêu đề liên hệ là: "{subject}".<br/>Thông điệp của bạn là: "{message}".<br/>IU App sẽ trả lời bạn sớm nhất.<br/><br/>Trân trọng,<br/>IU App admin.',
    });
};