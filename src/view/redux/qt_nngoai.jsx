import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_QT_NNGOAI = 'qt_nngoai:getQt_nngoai';
const GET_QT_NNGOAI_IN_PAGE = 'qt_nngoai:getQt_nngoaiInPage';
const GET_ALL = 'qt_nngoai:getAllQt_nngoai';
const UPDATE_QT_NNGOAI = 'qt_nngoai:UpdateQt_nngoai';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_QT_NNGOAI:
            return Object.assign({}, state, { items: data.items });

        case GET_QT_NNGOAI_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_QT_NNGOAI:
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
T.initCookiePage('adminQt_nngoai');
export function getAllQt_nngoai(done) {
    return dispatch => {
        const url = '/admin/qt_nngoai/all';
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

export function getQt_nngoaiInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminQt_nngoai', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/qt_nngoai/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_QT_NNGOAI_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getQt_nngoai(qt_nngoaiId, done) {
    return dispatch => {
        const url = '/admin/qt_nngoai/' + qt_nngoaiId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_QT_NNGOAI, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createQt_nngoai(qt_nngoai, done) {
    return dispatch => {
        const url = '/admin/qt_nngoai';
        T.post(url, { qt_nngoai }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getQt_nngoaiInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateQt_nngoai(_id, changes, done) {
    return dispatch => {
        const url = '/admin/qt_nngoai';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getQt_nngoaiInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteQt_nngoai(_id) {
    return dispatch => {
        const url = '/admin/qt_nngoai';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getQt_nngoaiInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeQt_nngoai(qt_nngoai) {
    return { type: UPDATE_QT_NNGOAI, item: qt_nngoai };
}