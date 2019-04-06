module.exports = app => {
    const schedule = require('node-schedule');

    app.scheduleJobs = [];

    app.schedule = (time, task) => {
        schedule.scheduleJob(time, task);
    };

    // Hourly
    // schedule.scheduleJob('0 * * * *', () => { });

    // Daily
    // schedule.scheduleJob('59 23 * * *', () => { });
};