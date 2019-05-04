import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_CHINH_SACH = 'chinhsach:getChinhsach';
const GET_ALL = 'chinhsach:getAllChinhsach';
const GET_CHINH_SACH_IN_PAGE = 'chinhsach:getChinhsachInPage';
const UPDATE_CHINH_SACH = 'chinhsach:UpdateChinhsach';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_CHINH_SACH:
            return Object.assign({}, state, { items: data.items });

        case GET_CHINH_SACH_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_CHINH_SACH:
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
T.initCookiePage('adminChinhsach');
export function getAllChinhsach(done) {
    return dispatch => {
        const url = '/admin/chinhsach/all';
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

export function getChinhsachInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminChinhsach', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/chinhsach/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_CHINH_SACH_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getChinhsach(chinhsachId, done) {
    return dispatch => {
        const url = '/admin/chinhsach/' + chauId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_CHINH_SACH, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createChinhsach(chinhsach, done) {
    return dispatch => {
        const url = '/admin/chinhsach';
        T.post(url, { chinhsach }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getChinhsachInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateChinhsach(_id, changes, done) {
    return dispatch => {
        const url = '/admin/chinhsach';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getChinhsachInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteChinhsach(_id) {
    return dispatch => {
        const url = '/admin/chinhsach';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getChinhsachInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeChinhsach(chinhsach) {
    return { type: UPDATE_CHINH_SACH, item: chinhsach };
}