import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_PCTN_NGHE_2018 = 'pctn_nghe_2018:getPctn_nghe_2018';
const GET_ALL = 'pctn_nghe_2018:getAllPctn_nghe_2018';
const GET_PCTN_NGHE_2018_IN_PAGE = 'pctn_nghe_2018:getPctn_nghe_2018InPage';
const UPDATE_PCTN_NGHE_2018 = 'pctn_nghe_2018:UpdatePctn_nghe_2018';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_PCTN_NGHE_2018:
            return Object.assign({}, state, { items: data.items });

        case GET_PCTN_NGHE_2018_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_PCTN_NGHE_2018:
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
T.initCookiePage('adminPctn_nghe_2018');
export function getAllPctn_nghe_2018(done) {
    return dispatch => {
        const url = '/admin/pctn_nghe_2018/all';
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

export function getPctn_nghe_2018InPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminPctn_nghe_2018', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/pctn_nghe_2018/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_PCTN_NGHE_2018_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getPctn_nghe_2018(pctn_nghe_2018Id, done) {
    return dispatch => {
        const url = '/admin/pctn_nghe_2018/' + pctn_nghe_2018Id;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_PCTN_NGHE_2018, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createPctn_nghe_2018(pctn_nghe_2018, done) {
    return dispatch => {
        const url = '/admin/pctn_nghe_2018';
        T.post(url, { pctn_nghe_2018 }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getPctn_nghe_2018InPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updatePctn_nghe_2018(_id, changes, done) {
    return dispatch => {
        const url = '/admin/pctn_nghe_2018';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getPctn_nghe_2018InPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deletePctn_nghe_2018(_id) {
    return dispatch => {
        const url = '/admin/pctn_nghe_2018';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getPctn_nghe_2018InPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changePctn_nghe_2018(pctn_nghe_2018) {
    return { type: UPDATE_PCTN_NGHE_2018, item: pctn_nghe_2018 };
}