module.exports = app => {

    Date.prototype.yyyymmdd = function() {
        return this.toISOString().slice(0, 10).replace(/-/g, '')
    };
};