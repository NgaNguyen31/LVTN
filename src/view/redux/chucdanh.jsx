import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_CHUCDANH = 'chucdanh:getChucdanh';
const GET_CHUCDANH_IN_PAGE = 'chucdanh:getChucdanhInPage';
const GET_ALL = 'chucdanh:getAllChucdanh';
const UPDATE_CHUCDANH = 'chucdanh:UpdateChucdanh';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_CHUCDANH:
            return Object.assign({}, state, { items: data.items, chucdanhs: data.chucdanhs});

        case GET_CHUCDANH_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_CHUCDANH:
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
T.initCookiePage('adminChucdanh');
export function getAllChucdanh(done) {
    return dispatch => {
        const url = '/admin/chucdanh/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data);
                dispatch({ type: GET_ALL, items: data.items});
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getChucdanhInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminChucdanh', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/chucdanh/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_CHUCDANH_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getChucdanh(chucdanhId, done) {
    return dispatch => {
        const url = '/admin/chucdanh/' + chucdanhId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_CHUCDANH, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createChucdanh(chucdanh, done) {
    return dispatch => {
        const url = '/admin/chucdanh';
        T.post(url, { chucdanh }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getChucdanhInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateChucdanh(_id, changes, done) {
    return dispatch => {
        const url = '/admin/chucdanh';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getChucdanhInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteChucdanh(_id) {
    return dispatch => {
        const url = '/admin/chucdanh';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getChucdanhInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeChucdanh(chucdanh) {
    return { type: UPDATE_CHUCDANH, item: chucdanh };
}