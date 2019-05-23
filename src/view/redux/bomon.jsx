import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_BOMON = 'bomon:getBomon';
const GET_BOMON_IN_PAGE = 'bomon:getBomonInPage';
const GET_ALL = 'bomon:getAllBomon';
const UPDATE_BOMON = 'bomon:UpdateBomon';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_BOMON:
            return Object.assign({}, state, { items: data.items, bomons: data.bomons});

        case GET_ALL:
            return { ... state,data};

        case GET_BOMON_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_BOMON:
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
T.initCookiePage('adminBomon');
export function getAllBomon(done) {
    return dispatch => {
        const url = '/admin/bomon/all';
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

export function getBomonInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminBomon', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/bomon/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_BOMON_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getBomon(bomonId, done) {
    return dispatch => {
        const url = '/admin/bomon/' + bomonId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_BOMON, items: data.items, bomon: data.bomon });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createBomon(bomon, done) {
    return dispatch => {        
        const url = '/admin/bomon';
        T.post(url, { bomon }, data => {
            if (data.error == 'Exist') {
                T.notify('Tên bộ môn hoặc tên tiếng anh đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {                
                T.notify('Tạo thành công!', 'info');
                dispatch(getBomonInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateBomon(_id, changes, done) {
    return dispatch => {
        const url = '/admin/bomon';
        T.put(url, { _id, changes }, data => {
            if (data.error == 'Exist') {
                T.notify('Tên bộ môn hoặc tên tiếng anh đã tồn tại!', 'danger');                
            } else if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getBomonInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteBomon(_id) {
    return dispatch => {
        const url = '/admin/bomon';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getBomonInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeBomon(bomon) {
    return { type: UPDATE_BOMON, item: bomon };
}