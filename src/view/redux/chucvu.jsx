import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_CHUCVU = 'chucvu:getChucvu';
const GET_ALL = 'chucvu:getAllChucvu';
const GET_CHUCVU_IN_PAGE = 'chucvu:getChucvuInPage';
const UPDATE_CHUCVU = 'chucvu:UpdateChucvu';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_CHUCVU:
            return Object.assign({}, state, { items: data.items });

        case GET_CHUCVU_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_CHUCVU:
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
T.initCookiePage('adminChucvu');
export function getAllChucvu(done) {
    return dispatch => {
        const url = '/admin/chucvu/all';
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

export function getChucvuInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminChucvu', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/chucvu/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_CHUCVU_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getChucvu(chucvuId, done) {
    return dispatch => {
        const url = '/admin/chucvu/' + chucvuId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_CHUCVU, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createChucvu(chucvu, done) {
    return dispatch => {
        const url = '/admin/chucvu';
        T.post(url, { chucvu }, data => {
            if (data.error == 'Exist') {
                T.notify('Chức vụ này đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getChucvuInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateChucvu(_id, changes, done) {
    return dispatch => {
        const url = '/admin/chucvu';
        T.put(url, { _id, changes }, data => {
            if (data.error == 'Exist') {
                T.notify('Chức vụ đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getChucvuInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteChucvu(_id) {
    return dispatch => {
        const url = '/admin/chucvu';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getChucvuInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeChucvu(chucvu) {
    return { type: UPDATE_CHUCVU, item: chucvu };
}