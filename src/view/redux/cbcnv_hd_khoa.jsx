import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_CBCNV_HD_KHOA = 'cbcnv_hd_khoa:getCbcnv_hd_khoa';
const GET_CBCNV_HD_KHOA_IN_PAGE = 'cbcnv_hd_khoa:getCbcnv_hd_khoaInPage';
const GET_ALL = 'cbcnv_hd_khoa:getAllCbcnv_hd_khoa';
const UPDATE_CBCNV_HD_KHOA = 'cbcnv_hd_khoa:UpdateCbcnv_hd_khoa';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_CBCNV_HD_KHOA:
            return Object.assign({}, state, { items: data.items });

        case GET_ALL:
            return {...state,data};

        case GET_CBCNV_HD_KHOA_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_CBCNV_HD_KHOA:
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
T.initCookiePage('adminCbcnv_hd_khoa');
export function getAllCbcnv_hd_khoa(done) {
    return dispatch => {
        const url = '/admin/cbcnv_hd_khoa/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data);
                dispatch({ type: GET_CBCNV_HD_KHOA, items: data });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getCbcnv_hd_khoaInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminCbcnv_hd_khoa', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/cbcnv_hd_khoa/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_CBCNV_HD_KHOA_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getCbcnv_hd_khoa(cbcnv_hd_khoaId, done) {
    return dispatch => {
        const url = '/admin/cbcnv_hd_khoa/' + cbcnv_hd_khoaId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_CBCNV_HD_KHOA, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createCbcnv_hd_khoa(cbcnv_hd_khoa, done) {
    return dispatch => {
        const url = '/admin/cbcnv_hd_khoa';
        T.post(url, { cbcnv_hd_khoa }, data => {
            if (data.error == 'Exist') {
                T.notify('Cán bộ đã tồn tại!', 'danger');                
            } else if (data.error) {
                console.log(data.error);
                
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getCbcnv_hd_khoaInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateCbcnv_hd_khoa(_id, changes, done) {
    return dispatch => {
        const url = '/admin/cbcnv_hd_khoa';
        T.put(url, { _id, changes }, data => {
            if (data.error == 'Exist') {
                T.notify('Cán bộ đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getCbcnv_hd_khoaInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteCbcnv_hd_khoa(_id) {
    return dispatch => {
        const url = '/admin/cbcnv_hd_khoa';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getCbcnv_hd_khoaInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeCbcnv_hd_khoa(cbcnv_hd_khoa) {
    return { type: UPDATE_CBCNV_HD_KHOA, item: cbcnv_hd_khoa };
}