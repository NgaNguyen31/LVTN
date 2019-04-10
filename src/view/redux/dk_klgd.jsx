import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_DK_KLGD = 'dk_klgd:getDk_klgd';
const GET_DK_KLGD_IN_PAGE = 'dk_klgd:getDk_klgdInPage';
const UPDATE_DK_KLGD = 'dk_klgd:UpdateDk_klgd';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_DK_KLGD:
            return Object.assign({}, state, { items: data.items });

        case GET_DK_KLGD_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_DK_KLGD:
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
T.initCookiePage('adminDk_klgd');
export function getAllDk_klgd(done) {
    return dispatch => {
        const url = '/admin/dk_klgd/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_DK_KLGD, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getDk_klgdInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminDk_klgd', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/dk_klgd/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_DK_KLGD_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getDk_klgd(dk_klgdId, done) {
    return dispatch => {
        const url = '/admin/dk_klgd/' + dk_klgdId;
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

export function createDk_klgd(dk_klgd, done) {
    return dispatch => {
        const url = '/admin/dk_klgd';
        T.post(url, { dk_klgd }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getDk_klgdInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateDk_klgd(_id, changes, done) {
    return dispatch => {
        const url = '/admin/dk_klgd';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getDk_klgdInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteDk_klgd(_id) {
    return dispatch => {
        const url = '/admin/dk_klgd';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getDk_klgdInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeDk_klgd(dk_klgd) {
    return { type: UPDATE_DK_KLGD, item: dk_klgd };
}