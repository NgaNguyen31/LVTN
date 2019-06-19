module.exports = app => {
    app.data = {
        email: app.email.from,
        emailPassword: app.email.password,
        TSKH: app.cbcnv,
    };

    // Count views --------------------------------------------------------------------------------
    // app.model.setting.init(app.data, () =>
    //     app.model.setting.get(['logo'], result => {
    //         app.data.logo = result.logo;
    //     }));

    app.model.user.count((error, numberOfUser) => {
        app.data.numberOfUser = error ? 0 : numberOfUser;
                    app.model.cbcnv.count({PHAI: 'Nam'}, (error, numberOfCBCNVNam) => {
                        app.data.numberOfCBCNVNam = error ? 0 : numberOfCBCNVNam;
                        app.model.cbcnv.count({PHAI: 'Nữ'}, (error, numberOfCBCNVNu) => {
                            app.data.numberOfCBCNVNu = error ? 0 : numberOfCBCNVNu;
                            app.model.cbcnv.count({IS_NNGOAI: 'Đúng'},(error, numberOfCBNN) => {
                                app.data.numberOfCBNN = error ? 0 : numberOfCBNN;
                                app.model.cb_nngoai.count((error, numberOfCBNN1) => {
                                    app.data.numberOfCBNN1 = error ? 0 : numberOfCBNN1;
                                    app.model.dk_klgd.count((error, numberOfDKKLGD) => {
                                        app.data.numberOfDKKLGD = error ? 0 : numberOfDKKLGD;
                                        app.model.cbcnv_hd_dv_tu_tra.count((error, numberOfCBNNHĐVTT) => {
                                            app.data.numberOfCBNNHĐVTT = error ? 0 : numberOfCBNNHĐVTT;
                                            app.model.cbcnv_hd_khoa.count((error, numberOfCBCNVHDK) => {
                                                app.data.numberOfCBCNVHDK = error ? 0 : numberOfCBCNVHDK;
                                                app.model.cbcnv.count({TSKH: "0"}, (error, numberOfTSKH) => {
                                                    app.data.numberOfTSKH = error ? 0 : numberOfTSKH;
                                                    app.model.cbcnv.count({CH: "0"}, (error, numberOfCH) => {
                                                        app.data.numberOfCH = error ? 0 : numberOfCH;
                                                        app.model.cbcnv.count({CD: "0"}, (error, numberOfCD) => {
                                                            app.data.numberOfCD = error ? 0 : numberOfCD;
                                                            app.model.cbcnv.count({KS: "0"}, (error, numberOfKS) => {
                                                                app.data.numberOfKS = error ? 0 : numberOfKS;
                                                                app.model.cbcnv.count({KHAC: "0"}, (error, numberOfKHAC) => {
                                                                    app.data.numberOfKHAC = error ? 0 : numberOfKHAC;
                                                                    app.model.cbcnv.count({TC: "0"}, (error, numberOfTC) => {
                                                                        app.data.numberOfTC = error ? 0 : numberOfTC;
                                                                        app.model.cbcnv.count({TS: "0"}, (error, numberOfTS) => {
                                                                            app.data.numberOfTS = error ? 0 : numberOfTS;
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
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