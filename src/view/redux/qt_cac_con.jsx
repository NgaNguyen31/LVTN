import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_QT_CAC_CON = 'qt_cac_con:getQt_cac_con';
const GET_ALL = 'qt_cac_con:getAllQt_cac_con';
const GET_QT_CAC_CON_IN_PAGE = 'qt_cac_con:getQt_cac_conInPage';
const UPDATE_QT_CAC_CON = 'qt_cac_con:UpdateQt_cac_con';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_QT_CAC_CON:
            return Object.assign({}, state, { items: data.items });

        case GET_QT_CAC_CON_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_QT_CAC_CON:
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
T.initCookiePage('adminQt_cac_con');
export function getAllQt_cac_con(done) {
    return dispatch => {
        const url = '/admin/qt_cac_con/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_QT_CAC_CON, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_cac_conInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminQt_cac_con', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/qt_cac_con/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_QT_CAC_CON_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_cac_con(qt_cac_conId, done) {
    return dispatch => {
        const url = '/admin/qt_cac_con/' + qt_cac_conId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_QT_CAC_CON, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createQt_cac_con(qt_cac_con, done) {
    return dispatch => {
        const url = '/admin/qt_cac_con';
        T.post(url, { qt_cac_con }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getQt_cac_conInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateQt_cac_con(_id, changes, done) {
    return dispatch => {
        const url = '/admin/qt_cac_con';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getQt_cac_conInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteQt_cac_con(_id) {
    return dispatch => {
        const url = '/admin/qt_cac_con';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getQt_cac_conInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeQt_cac_con(qt_cac_con) {
    return { type: UPDATE_QT_CAC_CON, item: qt_cac_con };
}