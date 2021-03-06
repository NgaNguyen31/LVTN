import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_TRINHDO = 'trinhdo:getTrinhdo';
const GET_ALL = 'trinhdo:getAllTrinhdo';
const GET_TRINHDO_IN_PAGE = 'trinhdo:getTrinhdoInPage';
const UPDATE_TRINHDO = 'trinhdo:UpdateTrinhdo';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_TRINHDO:
            return Object.assign({}, state, { items: data.items, trinhdos: data.trinhdos });

        case GET_TRINHDO_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_TRINHDO:
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
T.initCookiePage('adminTrinhdo');
export function getAllTrinhdo(done) {
    return dispatch => {
        const url = '/admin/trinhdo/all';
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

export function getTrinhdoInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminTrinhdo', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/trinhdo/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_TRINHDO_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getTrinhdo(trinhdoId, done) {
    return dispatch => {
        const url = '/admin/trinhdo/' + trinhdoId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_TRINHDO, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createTrinhdo(trinhdo, done) {
    return dispatch => {
        const url = '/admin/trinhdo';
        T.post(url, { trinhdo }, data => {
            if (data.error == 'Exist') {
                T.notify('Đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getTrinhdoInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateTrinhdo(_id, changes, done) {
    return dispatch => {
        const url = '/admin/trinhdo';
        T.put(url, { _id, changes }, data => {
            if (data.error == 'Exist') {
                T.notify('Đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getTrinhdoInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteTrinhdo(_id) {
    return dispatch => {
        const url = '/admin/trinhdo';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getTrinhdoInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeTrinhdo(trinhdo) {
    return { type: UPDATE_TRINHDO, item: trinhdo };
}