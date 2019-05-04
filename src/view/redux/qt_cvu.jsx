import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_QT_CVU = 'qt_cvu:getQt_cvu';
const GET_ALL = 'qt_cvu:getAllQt_cvu';
const GET_QT_CVU_IN_PAGE = 'qt_cvu:getQt_cvuInPage';
const UPDATE_QT_CVU = 'qt_cvu:UpdateQt_cvu';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_QT_CVU:
            return Object.assign({}, state, { items: data.items });

        case GET_QT_CVU_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_QT_CVU:
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
T.initCookiePage('adminQt_cvu');
export function getAllQt_cvu(done) {
    return dispatch => {
        const url = '/admin/qt_cvu/all';
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

export function getQt_cvuInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminQt_cvu', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/qt_cvu/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_QT_CVU_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_cvu(qt_cvuId, done) {
    return dispatch => {
        const url = '/admin/qt_cvu/' + qt_cvuId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_QT_CVU, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createQt_cvu(qt_cvu, done) {
    return dispatch => {
        const url = '/admin/qt_cvu';
        T.post(url, { qt_cvu }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getQt_cvuInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateQt_cvu(_id, changes, done) {
    return dispatch => {
        const url = '/admin/qt_cvu';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getQt_cvuInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteQt_cvu(_id) {
    return dispatch => {
        const url = '/admin/qt_cvu';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getQt_cvuInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeQt_cvu(qt_cvu) {
    return { type: UPDATE_QT_CVU, item: qt_cvu };
}