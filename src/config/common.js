module.exports = app => {
    // Generate default options in order to render view
    app.defaultOptions = req => {
        return {
            title: app.title,
            version: app.version,
            keywords: app.keywords,
            description: app.description,
            user: req.session.user,
            token: req.session.id,
            isDebug: app.isDebug,
            timestamp: Date.now() + 6 * 60 * 60 * 1000
        };
    };

    // Redirect to webpack server
    app.redirectToWebpackServer = () => {
        if (app.isDebug) {
            app.get('/*.js', (req, res) => {
                if (req.originalUrl.endsWith('.min.js')) {
                    res.next();
                } else {
                    //res.redirect('http://localhost:' + (app.port + 1) + '/js/' + app.path.basename(req.originalUrl));
                    const http = require('http');
                    http.get('http://localhost:' + (app.port + 1) + req.originalUrl, response => {
                        let data = '';
                        response.on('data', chunk => data += chunk);
                        response.on('end', () => res.send(data));
                    });
                }
            });
        }
    };

    // Response html file
    app.createResponse = (req, res, path) => {
        if (app.isDebug) {
            const http = require('http');
            http.get('http://localhost:' + (app.port + 1) + path, response => {
                let data = '';
                response.on('data', chunk => data += chunk);
                response.on('end', () => res.send(data));
            });
        } else {
            console.log('Create response!', path)
            app.fs.readFile(app.publicPath + path, 'utf8', (error, data) => res.send(data));
        }
    };


    // Load models & controllers
    const loadFiles = (loadPath, loadText) => {
        let names = '';
        app.fs.readdirSync(loadPath).forEach((filename) => {
            const filepath = app.path.join(loadPath, filename);
            if (app.fs.existsSync(filepath) && app.fs.statSync(filepath).isFile() && filepath.endsWith('.js')) {
                require(filepath)(app);
                names += ', ' + filename.substring(0, filename.lastIndexOf('.'));
            }
        });

        if (names.length > 0) console.log(loadText + names.substring(2) + '.');
    };
    app.loadModels = () => loadFiles(app.modelPath, ' - Load model: ');
    app.loadControllers = () => loadFiles(app.controllerPath, ' - Load controller: ');

    // Download file (http / https)
    app.downloadFile = (url, path) => {
        let network = require(url.startsWith('http') ? 'http' : 'https'),
            file = app.fs.createWriteStream(path);
        network.get(url, response => response.pipe(file));
    };

    app.createFolder = dirs => {
        if (!Array.isArray(dirs)) dirs = [dirs];
        dirs.forEach(dir => !app.fs.existsSync(dir) && app.fs.mkdirSync(dir));
    };
    app.deleteFolder = path => {
        if (app.fs.existsSync(path)) {
            app.fs.readdirSync(path).forEach(file => {
                const curPath = path + '/' + file;
                if (app.fs.lstatSync(curPath).isDirectory()) {
                    app.deleteFolder(curPath);
                } else {
                    app.fs.unlinkSync(curPath);
                }
            });
            app.fs.rmdirSync(path);
        }
    };

    app.deleteImage = (image, done) => {
        if (image && image !== '') {
            let imagePath = app.path.join(app.publicPath, image),
                imageIndex = imagePath.indexOf('?t=');
            if (imageIndex != -1) {
                imagePath = imagePath.substring(0, imageIndex);
            }

            if (app.fs.existsSync(imagePath)) {
                app.fs.unlinkSync(imagePath);
            }
        }
        if (done) done();
    };

    app.deleteFile = (path, done) => {
        if (path && path !== '') {
            const index = path.indexOf('?t=');
            if (index != -1) path = path.substring(0, index);
            if (app.fs.existsSync(path)) app.fs.unlinkSync(path);
        }
        if (done) done();
    };

    app.clone = function () {
        let result = {};
        for (let i = 0, length = arguments.length; i < length; i++) {
            const obj = JSON.parse(JSON.stringify(arguments[i]));
            Object.keys(obj).forEach(key => result[key] = obj[key]);
        }
        return result;
    }
};