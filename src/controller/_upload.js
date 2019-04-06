module.exports = (app) => {
    app.createFolder([
        app.path.join(app.publicPath, '/img/temp'),
        app.path.join(app.publicPath, '/img/temp/news'),
        app.path.join(app.publicPath, '/img/temp/event'),
        app.path.join(app.publicPath, '/img/temp/job'),
        app.path.join(app.publicPath, '/img/job'),
        app.path.join(app.publicPath, '/img/jobCategory'),
        app.path.join(app.publicPath, '/img/event'),
        app.path.join(app.publicPath, '/img/eventCategory'),
        app.path.join(app.publicPath, '/img/news'),
        app.path.join(app.publicPath, '/img/newsCategory'),
        app.path.join(app.publicPath, '/img/user'),
    ]);

    app.adminUploadImage = (dataName, getItem, dataId, srcPath, req, res) => {
        if (dataId == 'new') {
            let imageLink = app.path.join('/img/temp', app.path.basename(srcPath)),
                sessionPath = app.path.join(app.publicPath, imageLink);
            app.fs.rename(srcPath, sessionPath, error => {
                if (error == null) req.session[dataName + 'Image'] = sessionPath;
                res.send({ error, image: imageLink });
            });
        } else {
            req.session[dataName + 'Image'] = null;
            getItem(dataId, (error, dataItem) => {
                if (error || dataItem == null) {
                    res.send({ error: 'Invalid Id!' });
                } else {
                    app.deleteImage(dataItem.image);

                    dataItem.image = '/img/' + dataName + '/' + dataItem._id + app.path.extname(srcPath);
                    app.fs.rename(srcPath, app.path.join(app.publicPath, dataItem.image), error => {
                        if (error) {
                            res.send({ error });
                        } else {
                            dataItem.image += '?t=' + (new Date().getTime()).toString().slice(-8);
                            dataItem.save(error => {
                                if (dataName == 'user') {
                                    dataItem = app.clone(dataItem, { password: '' });
                                    if (req.session.user && req.session.user._id == dataItem._id) {
                                        req.session.user = dataItem;
                                    }
                                }

                                if (error == null) app.io.emit(dataName + '-changed', dataItem);
                                res.send({
                                    error,
                                    item: dataItem,
                                    image: dataItem.image,
                                });
                            });
                        }
                    });
                }
            });
        }
    };

    const adminBase64ImageUpload = (srcPath, req, res) => {
        app.jimp.read(srcPath).then(image => image.getBuffer(app.jimp.MIME_PNG, (error, buffer) => {
            app.fs.unlinkSync(srcPath);

            res.send({
                uploaded: error == null,
                url: 'data:image/png;base64, ' + buffer.toString('base64'),
                error: { message: error ? 'Đăng hình bị lỗi!' : '' }
            });
        }));
    };

    // ============================================================================================
    app.post('/admin/upload', app.role.isAdmin, (req, res) => {
        app.getUploadForm().parse(req, (error, fields, files) => {
            console.log('Upload', fields, files);
            if (error) {
                res.send({ error });
            } else if (fields.userData && fields.userData[0] == 'profile' && files.ProfileImage && files.ProfileImage.length > 0) {
                app.adminUploadImage('user', app.model.user.get, req.session.user._id, files.ProfileImage[0].path, req, res);
            } else if (fields.userData && fields.userData[0].startsWith('user:') && files.UserImage && files.UserImage.length > 0) {
                app.adminUploadImage('user', app.model.user.get, fields.userData[0].substring(5), files.UserImage[0].path, req, res);
            } else if (fields.userData && fields.userData[0].startsWith('carouselItem:') && files.CarouselItemImage && files.CarouselItemImage.length > 0) {
                app.adminUploadImage('carouselItem', app.model.carouselItem.get, fields.userData[0].substring(13), files.CarouselItemImage[0].path, req, res);

            } else if (fields.userData && fields.userData[0].startsWith('news:') && files.NewsImage && files.NewsImage.length > 0) {
                app.adminUploadImage('news', app.model.news.get, fields.userData[0].substring(5), files.NewsImage[0].path, req, res);
            } else if (fields.userData && fields.userData[0].startsWith('event:') && files.EventImage && files.EventImage.length > 0) {
                app.adminUploadImage('event', app.model.event.get, fields.userData[0].substring(6), files.EventImage[0].path, req, res);
            } else if (fields.userData && fields.userData[0].startsWith('job:') && files.JobImage && files.JobImage.length > 0) {
                app.adminUploadImage('job', app.model.job.get, fields.userData[0].substring(4), files.JobImage[0].path, req, res);
            } else if (fields.userData && fields.userData[0].startsWith('division:') && files.DivisionImage && files.DivisionImage.length > 0) {
                app.adminUploadImage('division', app.model.division.get, fields.userData[0].substring(9), files.DivisionImage[0].path, req, res);

            } else if (fields.userData && fields.userData[0].startsWith('newsCategoryImage:') && files.CategoryImage && files.CategoryImage.length > 0) {
                app.adminUploadImage('newsCategory', app.model.category.get, fields.userData[0].substring(18), files.CategoryImage[0].path, req, res);
            } else if (fields.userData && fields.userData[0].startsWith('eventCategoryImage:') && files.CategoryImage && files.CategoryImage.length > 0) {
                app.adminUploadImage('eventCategory', app.model.category.get, fields.userData[0].substring(19), files.CategoryImage[0].path, req, res);
            } else if (fields.userData && fields.userData[0].startsWith('jobCategoryImage:') && files.CategoryImage && files.CategoryImage.length > 0) {
                app.adminUploadImage('jobCategory', app.model.category.get, fields.userData[0].substring(17), files.CategoryImage[0].path, req, res);

            } else if (fields.userData && fields.userData[0] == 'slogan' && files.SloganImage && files.SloganImage.length > 0) {
                adminBase64ImageUpload(files.SloganImage[0].path, req, res);
            } else if (fields.userData && fields.userData[0] == 'testimony' && files.TestimonyImage && files.TestimonyImage.length > 0) {
                adminBase64ImageUpload(files.TestimonyImage[0].path, req, res);
            }
            // else if (fields.userData && fields.userData[0] == 'division' && files.DivisionImage && files.DivisionImage.length > 0) {
            //     adminBase64ImageUpload(files.DivisionImage[0].path, req, res);
            // }
            else if (fields.userData && fields.userData[0] == 'statistic' && files.StatisticImage && files.StatisticImage.length > 0) {
                adminBase64ImageUpload(files.StatisticImage[0].path, req, res);

            } else if (fields.userData && fields.userData[0].startsWith('staff:') && files.StaffImage && files.StaffImage.length > 0) {
                app.adminUploadImage('staff', app.model.staff.get, fields.userData[0].substring(6), files.StaffImage[0].path, req, res);

            } else if (fields.userData && fields.userData[0].startsWith('video:') && files.VideoImage && files.VideoImage.length > 0) {
                app.adminUploadImage('video', app.model.video.get, fields.userData[0].substring(6), files.VideoImage[0].path, req, res);
            } else if (fields.ckCsrfToken && files.upload && files.upload.length > 0) {
                adminBase64ImageUpload(files.upload[0].path, req, res);

            } else {
                res.send({ error: 'Error' });
            }
        });
    });

    app.post('/editor/upload', app.role.isEditor, (req, res) => {
        app.getUploadForm().parse(req, (error, fields, files) => {
            console.log('Editor Upload:', fields, files);
            if (error) {
                res.send({ error });
            } else if (fields.userData && fields.userData[0] == 'profile' && files.ProfileImage && files.ProfileImage.length > 0) {
                app.adminUploadImage('user', app.model.user.get, req.session.user._id, files.ProfileImage[0].path, req, res);
            } else {
                res.send({ error: 'Error' });
            }
        });
    });

    app.post('/user/upload', app.role.isUser, (req, res) => {
        app.getUploadForm().parse(req, (error, fields, files) => {
            console.log('User Upload:', fields, files);
            if (error) {
                res.send({ error });
            } else if (fields.userData && fields.userData[0] == 'profile' && files.ProfileImage && files.ProfileImage.length > 0) {
                app.adminUploadImage('user', app.model.user.get, req.session.user._id, files.ProfileImage[0].path, req, res);
            } else {
                res.send({ error: 'Error' });
            }
        });
    });
};