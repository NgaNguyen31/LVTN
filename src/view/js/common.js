import PropTypes from 'prop-types';
import io from 'socket.io-client';
import dateformat from 'dateformat';
import routeMatcherLib from './routematcher.js';
import './sweetalert.min.js';

const getCookiePageName = (cookieName) => {
    cookieName = cookieName.toLowerCase();
    let upperFirst = cookieName.charAt(0).toUpperCase() + cookieName.substring(1);
    return {
        pageNumber: cookieName + ':cookie' + upperFirst + 'PageNumber',
        pageSize: cookieName + ':cookie' + upperFirst + 'PageSize'
    }
};

let T = {
    PropTypes,
    roles: ['admin', 'editor', 'user'],
    chaus: ['Châu Á', 'Châu Âu', 'Châu Mỹ', 'Châu Phi', 'Châu Úc'],
    phais: ['Nam', 'Nữ'],
    nopccs: ['Chưa', 'Rồi'],
    defaultPageSize: 50,
    defaultUserPageSize: 21,
    newsFeedPageSize: 3,

    isMobile: ('ontouchstart' in document.documentElement),
    randomPassword: length => Math.random().toString(36).slice(-length),

    debug: (location.hostname === 'localhost' || location.hostname === '127.0.0.1'),

    selectMenu: (menuIndex, submenuIndex, submenuText) => {
        const menu = $('ul.app-menu > li').removeClass('is-expanded');
        $('ul.app-menu a.active').removeClass('active');

        if (submenuIndex != undefined && submenuIndex != null) {
            menu.eq(menuIndex).addClass('is-expanded');
            $('ul.app-menu > li:nth-child(' + (menuIndex + 1) + ') > ul > li:nth-child(' + (submenuIndex + 1) + ') > a').addClass('active');
        } else if (submenuText != undefined && submenuText != null) {
            const submenus = menu.eq(menuIndex).addClass('is-expanded').children().eq(1).children();
            for (let i = 1; i < submenus.length; i++) {
                let linkElement = submenus.eq(i).children().eq(0),
                    shortName = linkElement.html(),
                    index = shortName.indexOf('</i>');
                if (index >= 0) shortName = shortName.substring(index + 4);
                if (shortName == submenuText) {
                    linkElement.addClass('active');
                    break;
                }
            }
        } else {
            $('ul.app-menu > li:nth-child(' + (menuIndex + 1) + ') > a').addClass('active');
        }
    },

    url: (url) => url + (url.indexOf('?') === -1 ? '?t=' : '&t=') + new Date().getTime(),
    download: (url, name) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.download = name;
        link.href = url;
        link.click();
    },

    cookie: (cname, cvalue, exdays) => {
        if (cvalue === undefined) {
            const name = cname + '=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        } else {
            let d = new Date();
            d.setTime(d.getTime() + ((exdays === undefined ? 60 : exdays) * 24 * 60 * 60 * 1000));
            document.cookie = cname + '=' + cvalue + ';expires=' + d.toUTCString() + ';path=/';
        }
    },

    initCookiePage: (cookieName) => {
        const cookiePage = getCookiePageName(cookieName);
        if (T.cookie(cookiePage.pageNumber) == '') T.cookie(cookiePage.pageNumber, 1);
        if (T.cookie(cookiePage.pageSize) == '') T.cookie(cookiePage.pageSize, 50);
    },
    updatePage: (cookieName, pageNumber, pageSize) => {
        const cookiePage = getCookiePageName(cookieName),
            parse = (cookieValue, cookieName) => {
                if (cookieValue == undefined || cookieValue == null) {
                    cookieValue = T.cookie(cookieName);
                } else if (cookieValue != T.cookie(cookieName)) {
                    T.cookie(cookieName, cookieValue);
                }
                return parseInt(cookieValue);
            };

        return {
            pageNumber: parse(pageNumber, cookiePage.pageNumber),
            pageSize: parse(pageSize, cookiePage.pageSize)
        }
    },

    onResize: () => {
        const marginTop = 6 + $('header').height(),
            marginBottom = 6 + $('footer').height();
        $('.site-content').css('margin', marginTop + 'px 0 ' + marginBottom + 'px 0');
    },

    validateEmail: email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase()),

    dateToText: (date, format) => dateformat(date, format ? format : 'dd/mm/yyyy HH:MM:ss'),
    numberDisplay: number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),

    // Libraries ----------------------------------------------------------------------------------
    socket: io(),
    routeMatcher: routeMatcherLib.routeMatcher,

    notify: (message, type) => $.notify({ message }, { type, placement: { from: 'bottom' } }),

    alert: (text, icon, button, timer) => {
        let options = {};
        if (icon) {
            if (typeof icon == 'boolean') {
                options.button = icon;
                options.icon = 'success';
                if (timer) options.timer = timer;
            } else if (typeof icon == 'number') {
                options.timer = icon;
                options.icon = 'success';
            } else {
                options.icon = icon;
            }

            if (button != undefined) {
                if (typeof button == 'number') {
                    options.timer = options.button;
                    options.button = true;
                } else {
                    options.button = button;
                    if (timer) options.timer = timer;
                }
            } else {
                options.button = true;
            }
        } else {
            options.icon = 'success';
            options.button = true;
        }
        options.text = text;
        swal(options);
    },

    confirm: (title, text, icon, dangerMode, done) => {
        if (typeof icon == 'function') {
            done = icon;
            icon = 'warning';
            dangerMode = false;
        } else if (typeof icon == 'boolean') {
            done = dangerMode;
            dangerMode = icon;
            icon = 'warning';
        } else if (typeof dangerMode == 'function') {
            done = dangerMode;
            dangerMode = false;
        }
        swal({ icon, title, text, dangerMode, buttons: { cancel: true, confirm: true }, }).then(done);
    },

    dateFormat: { format: 'dd/mm/yyyy hh:ii', autoclose: true, todayBtn: true },
    formatDate: str => {
        try {
            let [strDate, strTime] = str.split(' '),
                [date, month, year] = strDate.split('/'),
                [hours, minutes] = strTime.split(':');
            return new Date(year, month - 1, date, hours, minutes);
        } catch (ex) {
            return null;
        }
    },
};

T.get2 = x => ('0' + x).slice(-2);
T.socket.on('connect', () => {
    if (T.connected === 0) {
        T.connected = true;
    } else if (T.debug) {
        location.reload();
    }
});
if (T.debug) {
    T.connected = 0;
    T.socket.on('reconnect_attempt', attemptNumber => T.connected = -attemptNumber);
    T.socket.on('debug', type => (type === 'reload') && location.reload());
}

['get', 'post', 'put', 'delete'].forEach(method => T[method] = (url, data, success, error) => {
    if (typeof data === 'function') {
        error = success;
        success = data;
    }
    $.ajax({
        url: T.url(url),
        data,
        type: method.toUpperCase(),
        success: data => {
            if (success) success(data)
        },
        error: data => {
            console.error('Ajax (' + method + ' => ' + url + ') has error. Error:', data);
            if (error) error(data)
        }
    })
});


$(() => {
    $(window).resize(T.onResize);
    setTimeout(T.onResize, 100);
});

export default T;


Date.prototype.getText = function () {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this.getMonth()] + ' ' + T.get2(this.getDate()) + ', ' + this.getFullYear() + ' ' +
        T.get2(this.getHours()) + ':' + T.get2(this.getMinutes());
};
Date.prototype.getDateText = function () {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this.getMonth()] + ' ' + T.get2(this.getDate()) + ', ' + this.getFullYear();
};
Date.prototype.getTimeText = function () {
    return T.get2(this.getHours()) + ':' + T.get2(this.getMinutes());
};
Date.prototype.getShortText = function () {
    return this.getFullYear() + '/' + T.get2(this.getMonth() + 1) + '/' + T.get2(this.getDate()) + ' ' + T.get2(this.getHours()) + ':' + T.get2(this.getMinutes());
};

Date.prototype.getEnText = function () {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this.getMonth()] + ' ' + T.get2(this.getDate()) + ', ' + this.getFullYear() + ' ' +
        T.get2(this.getHours()) + ':' + T.get2(this.getMinutes());
};