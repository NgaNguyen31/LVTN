import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_QT_GTRINH = 'qt_gtrinh:getQt_gtrinh';
const GET_QT_GTRINH_IN_PAGE = 'qt_gtrinh:getQt_gtrinhInPage';
const UPDATE_QT_GTRINH = 'qt_gtrinh:UpdateQt_gtrinh';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_QT_GTRINH:
            return Object.assign({}, state, { items: data.items });

        case GET_QT_GTRINH_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_QT_GTRINH:
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
T.initCookiePage('adminQt_gtrinh');
export function getAllQt_gtrinh(done) {
    return dispatch => {
        const url = '/admin/qt_gtrinh/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_QT_GTRINH, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_gtrinhInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminQt_gtrinh', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/qt_gtrinh/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_QT_GTRINH_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_gtrinh(qt_gtrinhId, done) {
    return dispatch => {
        const url = '/admin/qt_gtrinh/' + qt_gtrinhId;
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

export function createQt_gtrinh(qt_gtrinh, done) {
    return dispatch => {
        const url = '/admin/qt_gtrinh';
        T.post(url, { qt_gtrinh }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getQt_gtrinhInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateQt_gtrinh(_id, changes, done) {
    return dispatch => {
        const url = '/admin/qt_gtrinh';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getQt_gtrinhInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteQt_gtrinh(_id) {
    return dispatch => {
        const url = '/admin/qt_gtrinh';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getQt_gtrinhInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeQt_gtrinh(qt_gtrinh) {
    return { type: UPDATE_QT_GTRINH, item: qt_gtrinh };
}