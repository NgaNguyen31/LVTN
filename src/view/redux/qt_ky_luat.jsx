import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_QT_KY_LUAT = 'qt_ky_luat:getQt_ky_luat';
const GET_QT_KY_LUAT_IN_PAGE = 'qt_ky_luat:getQt_ky_luatInPage';
const UPDATE_QT_KY_LUAT = 'qt_ky_luat:UpdateQt_ky_luat';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_QT_KY_LUAT:
            return Object.assign({}, state, { items: data.items });

        case GET_QT_KY_LUAT_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_QT_KY_LUAT:
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
T.initCookiePage('adminQt_ky_luat');
export function getAllQt_ky_luat(done) {
    return dispatch => {
        const url = '/admin/qt_ky_luat/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_QT_KY_LUAT, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_ky_luatInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminQt_ky_luat', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/qt_ky_luat/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_QT_KY_LUAT_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_ky_luat(qt_ky_luatId, done) {
    return dispatch => {
        const url = '/admin/qt_ky_luat/' + qt_ky_luatId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
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

export function createQt_ky_luat(qt_ky_luat, done) {
    return dispatch => {
        const url = '/admin/qt_ky_luat';
        T.post(url, { qt_ky_luat }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getQt_ky_luatInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateQt_ky_luat(_id, changes, done) {
    return dispatch => {
        const url = '/admin/qt_ky_luat';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getQt_ky_luatInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteQt_ky_luat(_id) {
    return dispatch => {
        const url = '/admin/qt_ky_luat';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getQt_ky_luatInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeQt_ky_luat(qt_ky_luat) {
    return { type: UPDATE_QT_KY_LUAT, item: qt_ky_luat };
}