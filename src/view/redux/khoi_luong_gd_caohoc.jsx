import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_KHOI_LUONG_GD_CAOHOC = 'khoi_luong_gd_caohoc:getKhoi_luong_gd_caohoc';
const GET_KHOI_LUONG_GD_CAOHOC_IN_PAGE = 'khoi_luong_gd_caohoc:getKhoi_luong_gd_caohocInPage';
const UPDATE_KHOI_LUONG_GD_CAOHOC = 'khoi_luong_gd_caohoc:UpdateKhoi_luong_gd_caohoc';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_KHOI_LUONG_GD_CAOHOC:
            return Object.assign({}, state, { items: data.items });

        case GET_KHOI_LUONG_GD_CAOHOC_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_KHOI_LUONG_GD_CAOHOC:
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
T.initCookiePage('adminKhoi_luong_gd_caohoc');
export function getAllKhoi_luong_gd_caohoc(done) {
    return dispatch => {
        const url = '/admin/khoi_luong_gd_caohoc/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_KHOI_LUONG_GD_CAOHOC, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getKhoi_luong_gd_caohocInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminKhoi_luong_gd_caohoc', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/khoi_luong_gd_caohoc/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_KHOI_LUONG_GD_CAOHOC_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getKhoi_luong_gd_caohoc(khoi_luong_gd_caohocId, done) {
    return dispatch => {
        const url = '/admin/khoi_luong_gd_caohoc/' + khoi_luong_gd_caohocId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.item);
                // dispatch({ type: GET_USERS, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createKhoi_luong_gd_caohoc(khoi_luong_gd_caohoc, done) {
    return dispatch => {
        const url = '/admin/khoi_luong_gd_caohoc';
        T.post(url, { khoi_luong_gd_caohoc }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getKhoi_luong_gd_caohocInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateKhoi_luong_gd_caohoc(_id, changes, done) {
    return dispatch => {
        const url = '/admin/khoi_luong_gd_caohoc';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getKhoi_luong_gd_caohocInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteKhoi_luong_gd_caohoc(_id) {
    return dispatch => {
        const url = '/admin/khoi_luong_gd_caohoc';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getKhoi_luong_gd_caohocInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeKhoi_luong_gd_caohoc(khoi_luong_gd_caohoc) {
    return { type: UPDATE_KHOI_LUONG_GD_CAOHOC, item: khoi_luong_gd_caohoc };
}