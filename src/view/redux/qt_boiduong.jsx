import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_QT_BOIDUONG = 'qt_boiduong:getQt_boiduong';
const GET_ALL = 'qt_boiduong:getAllQt_boiduong';
const GET_QT_BOIDUONG_IN_PAGE = 'qt_boiduong:getQt_boiduongInPage';
const UPDATE_QT_BOIDUONG = 'qt_boiduong:UpdateQt_boiduong';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_QT_BOIDUONG:
            return Object.assign({}, state, { items: data.items });

        case GET_QT_BOIDUONG_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_QT_BOIDUONG:
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
T.initCookiePage('adminQt_boiduong');
export function getAllQt_boiduong(done) {
    return dispatch => {
        const url = '/admin/qt_boiduong/all';
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

export function getQt_boiduongInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminQt_boiduong', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/qt_boiduong/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_QT_BOIDUONG_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_boiduong(qt_boiduongId, done) {
    return dispatch => {
        const url = '/admin/qt_boiduong/' + qt_boiduongId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_QT_BOIDUONG, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createQt_boiduong(qt_boiduong, done) {
    return dispatch => {
        const url = '/admin/qt_boiduong';
        T.post(url, { qt_boiduong }, data => {            
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getQt_boiduongInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateQt_boiduong(_id, changes, done) {
    return dispatch => {
        const url = '/admin/qt_boiduong';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getQt_boiduongInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteQt_boiduong(_id) {
    return dispatch => {
        const url = '/admin/qt_boiduong';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getQt_boiduongInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeQt_boiduong(qt_boiduong) {
    return { type: UPDATE_QT_BOIDUONG, item: qt_boiduong };
}