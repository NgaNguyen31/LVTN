import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_NGHI_CTAC = 'nghi_ctac:getNghi_ctac';
const GET_ALL = 'nghi_ctac:getAllNghi_ctac';
const GET_NGHI_CTAC_IN_PAGE = 'nghi_ctac:getNghi_ctacInPage';
const UPDATE_NGHI_CTAC = 'nghi_ctac:UpdateNghi_ctac';

export default function userReducer(state = null, data) {
    switch (data.type) {
        case GET_ALL:
            return {...state,data};

        case GET_NGHI_CTAC:
            return Object.assign({}, state, { items: data.items });

        case GET_NGHI_CTAC_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case UPDATE_NGHI_CTAC:
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
T.initCookiePage('adminNghi_ctac');
export function getAllNghi_ctac(done) {
    return dispatch => {
        const url = '/admin/nghi_ctac/all';
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

export function getNghi_ctacInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminNghi_ctac', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/nghi_ctac/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_NGHI_CTAC_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách bị lỗi!', 'danger'));
    }
}

export function getNghi_ctac(nghi_ctacId, done) {
    return dispatch => {
        const url = '/admin/nghi_ctac/' + nghi_ctacId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                
                if (done) done(data.items);
                dispatch({ type: GET_NGHI_CTAC, items: data.items });
            }
        }, error => {
            console.error('GET: ' + url + '. ' + error);
        });
    }
}

export function createNghi_ctac(nghi_ctac, done) {
    return dispatch => {
        const url = '/admin/nghi_ctac';
        T.post(url, { nghi_ctac }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                T.notify('Tạo thành công!', 'info');
                dispatch(getNghi_ctacInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function updateNghi_ctac(_id, changes, done) {
    return dispatch => {
        const url = '/admin/nghi_ctac';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Có lỗi xảy ra!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            } else {
                T.notify('Cập nhật thành công!', 'info');
                dispatch(getNghi_ctacInPage());
            }
            done && done(data);
        }, error => T.notify('Có lỗi xảy ra!', 'danger'));
    }
}

export function deleteNghi_ctac(_id) {
    return dispatch => {
        const url = '/admin/nghi_ctac';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Xóa thành công!', 'error', false, 800);
                dispatch(getNghi_ctacInPage());
            }
        }, error => T.notify('Xóa bị lỗi!', 'danger'));
    }
}

export function changeNghi_ctac(nghi_ctac) {
    return { type: UPDATE_NGHI_CTAC, item: nghi_ctac };
}