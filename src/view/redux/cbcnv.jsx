import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_CBCNV = 'cbcnv:getCbcnv';
const GET_ALL = 'cbcnv:getAllCbcnv';
const GET_CBCNV_IN_PAGE = 'cbcnv:getCbcnvInPage';
const UPDATE_CBCNV = 'cbcnv:UpdateCbcnv';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {... state,data};

        case GET_CBCNV:
            return Object.assign({}, state, { items: data.items });

        case GET_CBCNV_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_CBCNV:
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
T.initCookiePage('adminCbcnv');
export function getAllCbcnv(done) {
    return dispatch => {
        const url = '/admin/cbcnv/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_ALL, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getCbcnvInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminCbcnv', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/cbcnv/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_CBCNV_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getCbcnv(cbcnvId, done) {
    return dispatch => {
        const url = '/admin/cbcnv/' + cbcnvId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_CBCNV, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createCbcnv(cbcnv, done) {
    return dispatch => {
        const url = '/admin/cbcnv';
        T.post(url, { cbcnv }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getCbcnvInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateCbcnv(_id, changes, done) {
    return dispatch => {
        const url = '/admin/cbcnv';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getCbcnvInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteCbcnv(_id) {
    return dispatch => {
        const url = '/admin/cbcnv';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getCbcnvInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeCbcnv(cbcnv) {
    return { type: UPDATE_CBCNV, item: cbcnv };
}