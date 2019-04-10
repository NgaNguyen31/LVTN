import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_CB_NNGOAI = 'cb_nngoai:getCb_nngoai';
const GET_CB_NNGOAI_IN_PAGE = 'cb_nngoai:getCb_nngoaiInPage';
const UPDATE_CB_NNGOAI = 'cb_nngoai:UpdateCb_nngoai';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_CB_NNGOAI:
            return Object.assign({}, state, { items: data.items });

        case GET_CB_NNGOAI_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_CB_NNGOAI:
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
T.initCookiePage('adminCb_nngoai');
export function getAllCb_nngoai(done) {
    return dispatch => {
        const url = '/admin/cb_nngoai/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_CB_NNGOAI, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getCb_nngoaiInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminCb_nngoai', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/cb_nngoai/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_CB_NNGOAI_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getCb_nngoai(cb_nngoaiId, done) {
    return dispatch => {
        const url = '/admin/cb_nngoai/' + cb_nngoaiId;
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

export function createCb_nngoai(cb_nngoai, done) {
    return dispatch => {
        const url = '/admin/cb_nngoai';
        T.post(url, { cb_nngoai }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getCb_nngoaiInPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateCb_nngoai(_id, changes, done) {
    return dispatch => {
        const url = '/admin/cb_nngoai';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getCb_nngoaiInPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteCb_nngoai(_id) {
    return dispatch => {
        const url = '/admin/cb_nngoai';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getCb_nngoaiInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeCb_nngoai(cb_nngoai) {
    return { type: UPDATE_CB_NNGOAI, item: cb_nngoai };
}