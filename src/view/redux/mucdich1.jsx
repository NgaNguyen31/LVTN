import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_MUCDICH1 = 'mucdich1:getMucdich1';
const GET_MUCDICH1_IN_PAGE = 'mucdich1:getMucdich1InPage';
const UPDATE_MUCDICH1 = 'mucdich1:UpdateMucdich1';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_MUCDICH1:
            return Object.assign({}, state, { items: data.items });

        case GET_MUCDICH1_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_MUCDICH1:
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
T.initCookiePage('adminMucdich1');
export function getAllMucdich1(done) {
    return dispatch => {
        const url = '/admin/mucdich1/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_MUCDICH1, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getMucdich1InPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminMucdich1', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/mucdich1/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_MUCDICH1_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getMucdich1(mucdich1Id, done) {
    return dispatch => {
        const url = '/admin/mucdich1/' + mucdich1Id;
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

export function createMucdich1(mucdich1, done) {
    return dispatch => {
        const url = '/admin/mucdich1';
        T.post(url, { mucdich1 }, data => {
            if (data.error) {
                T.notify('Error when created!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Create successfully!', 'info');
                dispatch(getMucdich1InPage());
            }
            done && done(data);
        }, error => T.notify('Error when created!', 'danger'));
    }
}

export function updateMucdich1(_id, changes, done) {
    return dispatch => {
        const url = '/admin/mucdich1';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Error when updated!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Update successfully!', 'info');
                dispatch(getMucdich1InPage());
            }
            done && done(data);
        }, error => T.notify('Error when updated!', 'danger'));
    }
}

export function deleteMucdich1(_id) {
    return dispatch => {
        const url = '/admin/mucdich1';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getMucdich1InPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeMucdich1(mucdich1) {
    return { type: UPDATE_MUCDICH1, item: mucdich1 };
}