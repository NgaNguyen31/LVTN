import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_PHANLOAI = 'phanloai:getPhanloai';
const GET_ALL = 'phanloai:getAllPhanloai';
const GET_PHANLOAI_IN_PAGE = 'phanloai:getPhanloaiInPage';
const UPDATE_PHANLOAI = 'phanloai:UpdatePhanloai';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL: 
            return { ...state,data};

        case GET_PHANLOAI:
            return Object.assign({}, state, { items: data.items });

        case GET_PHANLOAI_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_PHANLOAI:
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
T.initCookiePage('adminPhanloai');
export function getAllPhanloai(done) {
    return dispatch => {
        const url = '/admin/phanloai/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_ALL, items: data });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getPhanloaiInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminPhanloai', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/phanloai/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_PHANLOAI_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getPhanloai(phanloaiId, done) {
    return dispatch => {
        const url = '/admin/phanloai/' + phanloaiId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_PHANLOAI, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createPhanloai(phanloai, done) {
    return dispatch => {
        const url = '/admin/phanloai';
        T.post(url, { phanloai }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getPhanloaiInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updatePhanloai(_id, changes, done) {
    return dispatch => {
        const url = '/admin/phanloai';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getPhanloaiInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deletePhanloai(_id) {
    return dispatch => {
        const url = '/admin/phanloai';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getPhanloaiInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changePhanloai(phanloai) {
    return { type: UPDATE_PHANLOAI, item: phanloai };
}