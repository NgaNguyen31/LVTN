import T from '../js/common';

const UPDATE_SYSTEM_STATE = 'system:updateSystemState';

export default function systemReducer(state = null, data) {
    switch (data.type) {
        case UPDATE_SYSTEM_STATE:
            return Object.assign({}, state, data.state);

        default:
            return state;
    }
}

// Action -------------------------------------------------------------------------------------------------------------
export function saveSystemState(changes, done) {
    return dispatch => {
        const url = '/admin/system';
        T.put(url, changes, data => {
            if (data.error) {
                T.notify(data.error, 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                if (done) done(data);
                T.notify('Lưu thông tin hệ thống thành công!', 'info');
                dispatch({ type: UPDATE_SYSTEM_STATE, state: data });
            }
        }, error => T.notify('Lưu thông tin hệ thống bị lỗi!', 'danger'));
    }
}

export function getSystemState(done) {
    return dispatch => {
        const url = '/home/state';
        T.get(url, data => {
            if (data) {
                dispatch({ type: UPDATE_SYSTEM_STATE, state: data });
            }
            if (done) done(deta);
        }, error => {
            T.notify('Lấy thông tin hệ thống bị lỗi!', 'danger');
            if (done) done();
        });
    }
}

export function login(data, done) {
    return dispatch => {
        T.post('/login', data, res => {
            if (res.error) {
                done({ error: res.error ? res.error : '' });
            } else {
                done({ user: res.user });
                if (res.user) {
                    dispatch({ type: UPDATE_SYSTEM_STATE, state: { user: res.user } });
                }
            }
        }, error => {
            done({ error: 'Đăng nhập gặp lỗi!' });
        });
    };
}

export function logout(config) {
    if (config == undefined) config = {};
    if (config.title == undefined) config.title = 'Đăng xuất';
    if (config.message == undefined) config.message = 'Ban có muốn đăng xuất?';
    if (config.errorMessage == undefined) config.errorMessage = 'Lỗi khi đăng xuất!';

    return dispatch => {
        T.confirm(config.title, config.message, true, isConfirm => {
            isConfirm && T.post('/logout', {},
                data => {
                    dispatch({ type: UPDATE_SYSTEM_STATE, state: { user: null } });
                    if (config.done) config.done();
                },
                error => T.notify(config.errorMessage, 'danger'));
        });
    };
}

export function updateProfile(changes) {
    return dispatch => {
        const url = '/admin/profile';
        T.put(url, { changes }, res => {
            if (res.error) {
                T.notify('Cập nhật thông tin cá nhân của bạn bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', res.error);
            } else {
                T.notify('Cập nhật thông tin cá nhân của bạn thành công!', 'info');
                dispatch({ type: UPDATE_SYSTEM_STATE, state: { user: res.user } });
            }
        }, error => T.notify('Cập nhật thông tin cá nhân của bạn bị lỗi!', 'danger'));
    };
}

export function getSystemEmails(done) {
    T.get('/admin/email/all', done, error => T.notify('Lấy thông tin email bị lỗi!', 'danger'));
}

export function saveSystemEmails(type, email) {
    const url = '/admin/email';
    T.put(url, { type, email }, data => {
        if (data.error) {
            console.error('PUT: ' + url + '.', data.error);
            T.notify('Lưu thông tin email bị lỗi!', 'danger');
        } else {
            T.notify('Lưu thông tin email thành công!', 'info');
        }
    }, error => T.notify('Lưu thông tin email bị lỗi!', 'danger'));
}

export function updateSystemState(state) {
    return { type: UPDATE_SYSTEM_STATE, state };
}