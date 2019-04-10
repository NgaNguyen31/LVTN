import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_TONGIAO = 'tongiao:getTongiao';
const GET_TONGIAO_IN_PAGE = 'tongiao:getTongiaoInPage';
const UPDATE_TONGIAO = 'tongiao:UpdateTongiao';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_TONGIAO:
            return Object.assign({}, state, { items: data.items });

        case GET_TONGIAO_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_TONGIAO:
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
T.initCookiePage('adminTongiao');
export function getAllTongiao(done) {
    return dispatch => {
        const url = '/admin/tongiao/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_TONGIAO, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getTongiaoInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminTongiao', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/tongiao/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_TONGIAO_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getTongiao(tongiaoId, done) {
    return dispatch => {
        const url = '/admin/tongiao/' + tongiaoId;
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

export function createTongiao(tongiao, done) {
    return dispatch => {
        const url = '/admin/tongiao';
        T.post(url, { tongiao }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getTongiaoInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateTongiao(_id, changes, done) {
    return dispatch => {
        const url = '/admin/tongiao';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getTongiaoInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteTongiao(_id) {
    return dispatch => {
        const url = '/admin/tongiao';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getTongiaoInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeTongiao(tongiao) {
    return { type: UPDATE_TONGIAO, item: tongiao };
}