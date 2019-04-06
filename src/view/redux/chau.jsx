import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_CHAU = 'chau:getChau';
const GET_CHAU_IN_PAGE = 'chau:getChauInPage';
const UPDATE_CHAU = 'chau:UpdateChau';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_CHAU:
            return Object.assign({}, state, { items: data.items });

        case GET_CHAU_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_CHAU:
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
T.initCookiePage('adminChau');
export function getAllChau(done) {
    return dispatch => {
        const url = '/admin/chau/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_CHAU, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getChauInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminChau', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/chau/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_CHAU_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getChau(chauId, done) {
    return dispatch => {
        const url = '/admin/chau/' + chauId;
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

export function createChau(chau, done) {
    return dispatch => {
        const url = '/admin/chau';
        T.post(url, { chau }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getChauInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateChau(_id, changes, done) {
    return dispatch => {
        const url = '/admin/chau';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getChauInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteChau(_id) {
    return dispatch => {
        const url = '/admin/chau';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getChauInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeChau(chau) {
    return { type: UPDATE_CHAU, item: chau };
}