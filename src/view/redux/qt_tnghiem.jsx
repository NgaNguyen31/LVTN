import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_QT_TNGHIEM = 'qt_tnghiem:getQt_tnghiem';
const GET_QT_TNGHIEM_IN_PAGE = 'qt_tnghiem:getQt_tnghiemInPage';
const GET_ALL = 'qt_tnghiem:getAllQt_tnghiem';
const UPDATE_QT_TNGHIEM = 'qt_tnghiem:UpdateQt_tnghiem';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_QT_TNGHIEM:
            return Object.assign({}, state, { items: data.items });

        case GET_QT_TNGHIEM_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_QT_TNGHIEM:
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
T.initCookiePage('adminQt_tnghiem');
export function getAllQt_tnghiem(done) {
    return dispatch => {
        const url = '/admin/qt_tnghiem/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_QT_TNGHIEM, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_tnghiemInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminQt_tnghiem', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/qt_tnghiem/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_QT_TNGHIEM_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_tnghiem(qt_tnghiemId, done) {
    return dispatch => {
        const url = '/admin/qt_tnghiem/' + qt_tnghiemId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_QT_TNGHIEM, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createQt_tnghiem(qt_tnghiem, done) {
    return dispatch => {
        const url = '/admin/qt_tnghiem';
        T.post(url, { qt_tnghiem }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getQt_tnghiemInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateQt_tnghiem(_id, changes, done) {
    return dispatch => {
        const url = '/admin/qt_tnghiem';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getQt_tnghiemInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteQt_tnghiem(_id) {
    return dispatch => {
        const url = '/admin/qt_tnghiem';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getQt_tnghiemInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeQt_tnghiem(qt_tnghiem) {
    return { type: UPDATE_QT_TNGHIEM, item: qt_tnghiem };
}