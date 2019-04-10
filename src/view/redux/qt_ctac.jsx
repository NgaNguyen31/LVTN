import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_QT_CTAC = 'qt_ctac:getQt_ctac';
const GET_QT_CTAC_IN_PAGE = 'qt_ctac:getQt_ctacInPage';
const UPDATE_QT_CTAC = 'qt_ctac:UpdateQt_ctac';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_QT_CTAC:
            return Object.assign({}, state, { items: data.items });

        case GET_QT_CTAC_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_QT_CTAC:
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
T.initCookiePage('adminQt_ctac');
export function getAllQt_ctac(done) {
    return dispatch => {
        const url = '/admin/qt_ctac/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_QT_CTAC, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_ctacInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminQt_ctac', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/qt_ctac/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_QT_CTAC_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_ctac(qt_ctacId, done) {
    return dispatch => {
        const url = '/admin/qt_ctac/' + qt_ctacId;
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

export function createQt_ctac(qt_ctac, done) {
    return dispatch => {
        const url = '/admin/qt_ctac';
        T.post(url, { qt_ctac }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getQt_ctacInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateQt_ctac(_id, changes, done) {
    return dispatch => {
        const url = '/admin/qt_ctac';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getQt_ctacInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteQt_ctac(_id) {
    return dispatch => {
        const url = '/admin/qt_ctac';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getQt_ctacInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeQt_ctac(qt_ctac) {
    return { type: UPDATE_QT_CTAC, item: qt_ctac };
}