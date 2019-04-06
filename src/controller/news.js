module.exports = app => {
    app.get('/admin/news/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.news.getPage(pageNumber, pageSize, {}, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách tin tức không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.post('/admin/news/default', app.role.isAdmin, (req, res) => {
        app.model.news.create({ title: 'Bài viết', active: false }, (error, item) => res.send({ error, item }));
    });

    app.delete('/admin/news', app.role.isAdmin, (req, res) => {
        app.model.news.delete(req.body._id, error => res.send({ error }));
    });

    app.put('/admin/news/swap', app.role.isAdmin, (req, res) => {
        const isMoveUp = req.body.isMoveUp.toString() == 'true';
        app.model.news.swapPriority(req.body._id, isMoveUp, error => res.send({ error }));
    });

    app.put('/admin/news', app.role.isAdmin, (req, res) => {
        app.model.news.update(req.body._id, req.body.changes, (error, item) => res.send({ error, item }));
    });

    app.get('/admin/news/item/:newsId', app.role.isAdmin, (req, res) => {
        app.model.category.getAll('news', (error, categories) => {
            if (error || categories == null) {
                res.send({ error: 'Lỗi khi lấy danh mục!' });
            } else {
                app.model.news.get(req.params.newsId, (error, item) => {
                    res.send({
                        error,
                        categories: categories.map(item => ({ id: item._id, text: item.title })),
                        item
                    });
                });
            }
        });
    });


    // Editor ---------------------------------------------------------------------------------------------------------------------------------------
    app.get('/editor/news/page/:pageNumber/:pageSize', app.role.isEditor, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.news.getPage(pageNumber, pageSize, {}, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách tin tức không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    // app.post('/editor/news/default', app.role.isEditor, (req, res) => {
    //     app.model.news.create({ title: 'Bài viết', active: false }, (error, item) => res.send({ error, item }));
    // });

    app.put('/editor/news/swap', app.role.isEditor, (req, res) => {
        const isMoveUp = req.body.isMoveUp.toString() == 'true';
        app.model.news.swapPriority(req.body._id, isMoveUp, error => res.send({ error }));
    });

    app.put('/editor/news/active', app.role.isEditor, (req, res) => {
        const active = req.body.active.toString() == 'true';
        app.model.news.update(req.body._id, { active }, error => res.send({ error }));
    });

    // app.put('/editor/news', app.role.isEditor, (req, res) => {
    //     app.model.news.update(req.body._id, req.body.changes, (error, item) => res.send({ error, item }));
    // });

    app.get('/editor/news/item/:newsId', app.role.isEditor, (req, res) => {
        app.model.category.getAll('news', (error, categories) => {
            if (error || categories == null) {
                res.send({ error: 'Lỗi khi lấy danh mục!' });
            } else {
                app.model.news.get(req.params.newsId, (error, item) => {
                    res.send({
                        error,
                        categories: categories.map(item => ({ id: item._id, text: item.title })),
                        item
                    });
                });
            }
        });
    });

    // Home -----------------------------------------------------------------------------------------------------------------------------------------
    app.get('/news/page/:pageNumber/:pageSize', (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize),
            today = new Date(), yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const condition = {
            $or: [{ startPost: null }, { startPost: { $exists: false } }, { startPost: { $lte: today } },],
            $or: [{ stopPost: null }, { stopPost: { $exists: false } }, { stopPost: { $gte: yesterday } },],
            active: true
        };

        app.model.news.getPage(pageNumber, pageSize, condition, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách tin tức không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.get('/news/page/:pageNumber/:pageSize/:categoryType', (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize),
            today = new Date(), yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const condition = {
            categories: req.params.categoryType,
            $or: [{ startPost: null }, { startPost: { $exists: false } }, { startPost: { $lte: today } },],
            $or: [{ stopPost: null }, { stopPost: { $exists: false } }, { stopPost: { $gte: yesterday } },],
            active: true
        };

        app.model.news.getPage(pageNumber, pageSize, condition, (error, page) => {
            const respone = {};
            if (error || page == null) {
                respone.error = 'Danh sách tin tức không sẵn sàng!';
            } else {
                let list = page.list.map(item => app.clone(item, { content: null }));
                respone.page = app.clone(page, { list });
            }
            res.send(respone);
        });
    });

    app.get('/news/item/id/:newsId', (req, res) =>
        app.model.news.readById(req.params.newsId, (error, item) => res.send({ error, item })));
    app.get('/news/item/link/:newsLink', (req, res) =>
        app.model.news.readByLink(req.params.newsLink, (error, item) => res.send({ error, item })));

    app.put('/news/item/check-link', (req, res) => app.model.news.getByLink(req.body.link, (error, item) => {
        res.send({ error: error ? 'Lỗi hệ thống' : (item == null || item._id == req.body._id) ? null : 'Link không hợp lệ' });
    }));

    // API ------------------------------------------------------------------------------------------------------------------------------------------
    app.get('/api/home/news', (req, res) => app.model.category.getAll('news', (error, categories) => {
        if (error || categories == null) {
            res.send({ error: 'Error' })
        } else {
            const list = [];
            const getNews = index => {
                if (index < categories.length) {
                    const category = categories[index];
                    if (category.active) {
                        app.model.news.getByCategoryId(category._id, 3, (error, news) => {
                            news = news ? news.map(item => app.clone(item, { content: '' })) : null;
                            list.push({ _id: category._id, title: category.title, image: category.image, news });
                            getNews(index + 1);
                        });
                    } else {
                        getNews(index + 1);
                    }
                } else {
                    res.send({ list });
                }
            };
            getNews(0);
        }
    }));
};