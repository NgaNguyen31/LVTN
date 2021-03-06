import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_TINH = 'tinh:getTinh';
const GET_TINH_IN_PAGE = 'tinh:getTinhInPage';
const GET_ALL = 'tinh:getAllTinh';
const UPDATE_TINH = 'tinh:UpdateTinh';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_TINH:
            return Object.assign({}, state, { items: data.items });

        case GET_TINH_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_TINH:
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
T.initCookiePage('adminTinh');
export function getAllTinh(done) {
    return dispatch => {
        const url = '/admin/tinh/all';
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

export function getTinhInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminTinh', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/tinh/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_TINH_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getTinh(tinhId, done) {
    return dispatch => {
        const url = '/admin/tinh/' + tinhId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_TINH, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createTinh(tinh, done) {
    return dispatch => {
        const url = '/admin/tinh';
        T.post(url, { tinh }, data => {
            if (data.error == 'Exist') {
                T.notify('Đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getTinhInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateTinh(_id, changes, done) {
    return dispatch => {
        const url = '/admin/tinh';
        T.put(url, { _id, changes }, data => {
            if (data.error == 'Exist') {
                T.notify('Đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getTinhInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteTinh(_id) {
    return dispatch => {
        const url = '/admin/tinh';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getTinhInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeTinh(tinh) {
    return { type: UPDATE_TINH, item: tinh };
}