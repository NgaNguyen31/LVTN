import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_NGOAINGU = 'ngoaingu:getNgoaingu';
const GET_ALL = 'ngoaingu:getAllNgoaingu';
const GET_NGOAINGU_IN_PAGE = 'ngoaingu:getNgoainguInPage';
const UPDATE_NGOAINGU = 'ngoaingu:UpdateNgoaingu';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_NGOAINGU:
            return Object.assign({}, state, { items: data.items });

        case GET_NGOAINGU_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_NGOAINGU:
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
T.initCookiePage('adminNgoaingu');
export function getAllNgoaingu(done) {
    return dispatch => {
        const url = '/admin/ngoaingu/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_NGOAINGU, items: data.items });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getNgoainguInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminNgoaingu', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/ngoaingu/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_NGOAINGU_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getNgoaingu(ngoainguId, done) {
    return dispatch => {
        const url = '/admin/ngoaingu/' + ngoainguId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_NGOAINGU, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createNgoaingu(ngoaingu, done) {
    return dispatch => {
        const url = '/admin/ngoaingu';
        T.post(url, { ngoaingu }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getNgoainguInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateNgoaingu(_id, changes, done) {
    return dispatch => {
        const url = '/admin/ngoaingu';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getNgoainguInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteNgoaingu(_id) {
    return dispatch => {
        const url = '/admin/ngoaingu';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getNgoainguInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeNgoaingu(ngoaingu) {
    return { type: UPDATE_NGOAINGU, item: ngoaingu };
}