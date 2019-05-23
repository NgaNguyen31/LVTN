import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_KHOA = 'khoa:getKhoa';
const GET_ALL = 'khoa:getAllKhoa';
const GET_KHOA_IN_PAGE = 'khoa:getKhoaInPage';
const UPDATE_KHOA = 'khoa:UpdateKhoa';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_KHOA:
            return Object.assign({}, state, { items: data.items });

        case GET_ALL:
            return {
                ...state,
                data
            }

        case GET_KHOA_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_KHOA:
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
T.initCookiePage('adminKhoa');
export function getAllKhoa(done) {
    return dispatch => {
        const url = '/admin/khoa/all';
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

export function getKhoaInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminKhoa', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/khoa/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_KHOA_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getKhoa(khoaId, done) {
    return dispatch => {
        const url = '/admin/khoa/' + khoaId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_KHOA, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createKhoa(khoa, done) {
    return dispatch => {
        const url = '/admin/khoa';
        T.post(url, { khoa }, data => {
            if (data.error == 'Exist') {
                T.notify('Khoa này đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else{
                T.notify('Tạo thành công', 'info');
                dispatch(getKhoaInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateKhoa(_id, changes, done) {
    return dispatch => {
        const url = '/admin/khoa';
        T.put(url, { _id, changes }, data => {
            if (data.error == 'Exist') {
                T.notify('Khoa đã tồn tại!', 'danger');                
            } else if (data.error) {                
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getKhoaInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteKhoa(_id) {
    return dispatch => {
        const url = '/admin/khoa';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getKhoaInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeKhoa(khoa) {
    return { type: UPDATE_KHOA, item: khoa };
}