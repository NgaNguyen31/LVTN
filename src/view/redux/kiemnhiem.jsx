import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_KIEMNHIEM = 'kiemnhiem:getKiemnhiem';
const GET_KIEMNHIEM_IN_PAGE = 'kiemnhiem:getKiemnhiemInPage';
const UPDATE_KIEMNHIEM = 'kiemnhiem:UpdateKiemnhiem';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_KIEMNHIEM:
            return Object.assign({}, state, { items: data.items });

        case GET_KIEMNHIEM_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_KIEMNHIEM:
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
T.initCookiePage('adminKiemnhiem');
export function getAllKiemnhiem(done) {
    return dispatch => {
        const url = '/admin/kiemnhiem/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_KIEMNHIEM, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getKiemnhiemInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminKiemnhiem', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/kiemnhiem/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_KIEMNHIEM_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getKiemnhiem(kiemnhiemId, done) {
    return dispatch => {
        const url = '/admin/kiemnhiem/' + kiemnhiemId;
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

export function createKiemnhiem(kiemnhiem, done) {
    return dispatch => {
        const url = '/admin/kiemnhiem';
        T.post(url, { kiemnhiem }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getKiemnhiemInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateKiemnhiem(_id, changes, done) {
    return dispatch => {
        const url = '/admin/kiemnhiem';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getKiemnhiemInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteKiemnhiem(_id) {
    return dispatch => {
        const url = '/admin/kiemnhiem';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getKiemnhiemInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeKiemnhiem(kiemnhiem) {
    return { type: UPDATE_KIEMNHIEM, item: kiemnhiem };
}