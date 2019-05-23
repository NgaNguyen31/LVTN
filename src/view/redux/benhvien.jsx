import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_BENHVIEN = 'benhvien:getBenhvien';
const GET_BENHVIEN_IN_PAGE = 'benhvien:getBenhvienInPage';
const UPDATE_BENHVIEN = 'benhvien:UpdateBenhvien';
const GET_ALL = 'benhvien:getAllBenhvien';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_BENHVIEN:
            return Object.assign({}, state, { items: data.items });

        case GET_ALL:
            return {...state,data};

        case GET_BENHVIEN_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_BENHVIEN:
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
T.initCookiePage('adminBenhvien');
export function getAllBenhvien(done) {
    return dispatch => {
        const url = '/admin/benhvien/all';
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

export function getBenhvienInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminBenhvien', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/benhvien/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_BENHVIEN_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getBenhvien(benhvienId, done) {
    return dispatch => {
        const url = '/admin/benhvien/' + benhvienId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_BENHVIEN, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createBenhvien(benhvien, done) {
    return dispatch => {
        const url = '/admin/benhvien';
        T.post(url, { benhvien }, data => {
            if (data.error == 'Exist') {
                T.notify('Tên bệnh viện đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công', 'info');
                dispatch(getBenhvienInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra', 'danger'));
    }
}

export function updateBenhvien(_id, changes, done) {
    return dispatch => {
        const url = '/admin/benhvien';
        T.put(url, { _id, changes }, data => {
            if (data.error == 'Exist') {
                T.notify('Tên bệnh viện đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getBenhvienInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteBenhvien(_id) {
    return dispatch => {
        const url = '/admin/benhvien';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getBenhvienInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeBenhvien(benhvien) {
    return { type: UPDATE_BENHVIEN, item: benhvien };
}