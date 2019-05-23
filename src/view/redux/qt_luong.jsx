import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_QT_LUONG = 'qt_luong:getQt_luong';
const GET_ALL = 'qt_luong:getAllQt_luong';
const GET_QT_LUONG_IN_PAGE = 'qt_luong:getQt_luongInPage';
const UPDATE_QT_LUONG = 'qt_luong:UpdateQt_luong';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_QT_LUONG:
            return Object.assign({}, state, { items: data.items });

        case GET_QT_LUONG_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_QT_LUONG:
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
T.initCookiePage('adminQt_luong');
export function getAllQt_luong(done) {
    return dispatch => {
        const url = '/admin/qt_luong/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data);
                dispatch({ type: GET_ALL, items: data });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_luongInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminQt_luong', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/qt_luong/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_QT_LUONG_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_luong(qt_luongId, done) {
    return dispatch => {
        const url = '/admin/qt_luong/' + qt_luongId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_QT_LUONG, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createQt_luong(qt_luong, done) {
    return dispatch => {
        const url = '/admin/qt_luong';
        T.post(url, { qt_luong }, data => {
            if (data.error == 'Exist') {
                T.notify('Lương đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getQt_luongInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateQt_luong(_id, changes, done) {
    return dispatch => {
        const url = '/admin/qt_luong';
        T.put(url, { _id, changes }, data => {
            if (data.error == 'Exist') {
                T.notify('Lương đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getQt_luongInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteQt_luong(_id) {
    return dispatch => {
        const url = '/admin/qt_luong';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getQt_luongInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeQt_luong(qt_luong) {
    return { type: UPDATE_QT_LUONG, item: qt_luong };
}