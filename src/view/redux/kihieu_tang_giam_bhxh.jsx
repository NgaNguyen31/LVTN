import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_KIHIEU_TANG_GIAM_BHXH = 'kihieu_tang_giam_bhxh:getKihieu_tang_giam_bhxh';
const GET_ALL = 'kihieu_tang_giam_bhxh:getAllKihieu_tang_giam_bhxh';
const GET_KIHIEU_TANG_GIAM_BHXH_IN_PAGE = 'kihieu_tang_giam_bhxh:getKihieu_tang_giam_bhxhInPage';
const UPDATE_KIHIEU_TANG_GIAM_BHXH = 'kihieu_tang_giam_bhxh:UpdateKihieu_tang_giam_bhxh';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_KIHIEU_TANG_GIAM_BHXH:
            return Object.assign({}, state, { items: data.items });

        case GET_KIHIEU_TANG_GIAM_BHXH_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_KIHIEU_TANG_GIAM_BHXH:
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
T.initCookiePage('adminKihieu_tang_giam_bhxh');
export function getAllKihieu_tang_giam_bhxh(done) {
    return dispatch => {
        const url = '/admin/kihieu_tang_giam_bhxh/all';
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

export function getKihieu_tang_giam_bhxhInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminKihieu_tang_giam_bhxh', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/kihieu_tang_giam_bhxh/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_KIHIEU_TANG_GIAM_BHXH_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getKihieu_tang_giam_bhxh(kihieu_tang_giam_bhxhId, done) {
    return dispatch => {
        const url = '/admin/kihieu_tang_giam_bhxh/' + kihieu_tang_giam_bhxhId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_KIHIEU_TANG_GIAM_BHXH, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createKihieu_tang_giam_bhxh(kihieu_tang_giam_bhxh, done) {
    return dispatch => {
        const url = '/admin/kihieu_tang_giam_bhxh';
        T.post(url, { kihieu_tang_giam_bhxh }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getKihieu_tang_giam_bhxhInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateKihieu_tang_giam_bhxh(_id, changes, done) {
    return dispatch => {
        const url = '/admin/kihieu_tang_giam_bhxh';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getKihieu_tang_giam_bhxhInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteKihieu_tang_giam_bhxh(_id) {
    return dispatch => {
        const url = '/admin/kihieu_tang_giam_bhxh';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getKihieu_tang_giam_bhxhInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeKihieu_tang_giam_bhxh(kihieu_tang_giam_bhxh) {
    return { type: UPDATE_KIHIEU_TANG_GIAM_BHXH, item: kihieu_tang_giam_bhxh };
}