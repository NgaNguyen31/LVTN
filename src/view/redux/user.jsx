import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_USERS = 'user:getUsers';
const GET_USER_IN_PAGE = 'user:getUserInPage';
const UPDATE_USER = 'user:UpdateUser';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_USERS:
            return Object.assign({}, state, { items: data.items });

        case GET_USER_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_USER:
            if (state) {
                let updatedItems = Object.assign({}, state.items),
                    updatedPage = Object.assign({}, state.page),
                    updatedItem = data.item;
                if (updatedItems) {
                    for (let i = 0, n = updatedItems.length; i < n; i++) {
                        if (updatedItems[i]._id == updatedItem._id) {
                            updatedItems.splice(i, 1, updatedItem);
                            break;
                        }
                    }
                }
                if (updatedPage) {
                    for (let i = 0, n = updatedPage.list.length; i < n; i++) {
                        if (updatedPage.list[i]._id == updatedItem._id) {
                            updatedPage.list.splice(i, 1, updatedItem);
                            break;
                        }
                    }
                }
                return Object.assign({}, state, { items: updatedItems, page: updatedPage });
            } else {
                return null;
            }

        default:
            return state;
    }
}

// Actions ------------------------------------------------------------------------------------------------------------
T.initCookiePage('adminUser');
export function getAllUsers(done) {
    return dispatch => {
        const url = '/admin/user/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách người dùng bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_USERS, items: data.items });
            }
        }, error => T.notify('Lấy danh sách người dùng bị lỗi!', 'danger'));
    }
}

export function getUserInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminUser', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/user/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách người dùng bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_USER_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách người dùng bị lỗi!', 'danger'));
    }
}

export function getUser(userId, done) {
    return dispatch => {
        const url = '/admin/user/' + userId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin nhân viên bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.item);
                // dispatch({ type: GET_USERS, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createUser(user, done) {
    return dispatch => {
        const url = '/admin/user';
        T.post(url, { user }, data => {
            if (data.error) {
                T.notify('Error when created user!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create user successfully!', 'info');
                dispatch(getUserInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created user!', 'danger'));
    }
}

export function updateUser(_id, changes, done) {
    return dispatch => {
        const url = '/admin/user';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated user!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update user successfully!', 'info');
                dispatch(getUserInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated user!', 'danger'));
    }
}

export function deleteUser(_id) {
    return dispatch => {
        const url = '/admin/user';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa người dùng bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Người dùng được xóa thành công!', 'error', false, 800);
                dispatch(getUserInPage());
            }
        }, error => T.notify('Xóa người dùng bị lỗi!', 'danger'));
    }
}

export function changeUser(user) {
    return { type: UPDATE_USER, item: user };
}





export function userUpdateProfile(changes, done) {
    return dispatch => {
        const url = '/user/profile';
        T.put(url, { changes }, data => {
            if (data.error) {
                T.notify('Error when update profile!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update profile successfully!', 'info');
            }
            done && done(data);
        }, error => T.notify('Error when update profile!', 'danger'));
    }
}

export function userUpdatePassword(currentPassword, newPassword, done) {
    return dispatch => {
        const url = '/user/profile/password';
        T.put(url, { currentPassword, newPassword }, data => {
            if (data.error) {
                T.notify(data.error, 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Change password successfully!', 'info');
            }
            done && done(data);
        }, error => T.notify('Error when you change password!', 'danger'));
    }
}