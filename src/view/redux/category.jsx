import T from '../js/common';

const GET_ALL = 'category:getAll';
const CREATE_ITEM = 'category:createItem';
const UPDATE_ITEM = 'category:updateItem';
const DELETE_ITEM = 'category:deleteItem';

export default function categoryReducer(state = [], data) {
    switch (data.type) {
        case GET_ALL:
            return data.items;

        case CREATE_ITEM:
            return [data.item].concat(state);

        case UPDATE_ITEM:
            let updateItemState = state.slice();
            for (let i = 0; i < updateItemState.length; i++) {
                if (updateItemState[i]._id == data.item._id) {
                    updateItemState[i] = data.item;
                    break;
                }
            }
            return updateItemState;

        case DELETE_ITEM:
            let deleteItemState = state.slice();
            for (let i = 0; i < deleteItemState.length; i++) {
                if (deleteItemState[i]._id == data._id) {
                    deleteItemState.splice(i, 1);
                    break;
                }
            }
            return deleteItemState;

        default:
            return state;
    }
}

// Actions ------------------------------------------------------------------------------------------------------------
export function getAll(type) {
    return dispatch => {
        const url = '/category/' + type;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh mục bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_ALL, items: data.items });
            }
        }, error => T.notify('Lấy danh mục bị lỗi!', 'danger'));
    }
}

export function createCategory(data, done) {
    return dispatch => {
        const url = '/admin/category';
        T.post(url, { data }, data => {
            if (data.error) {
                T.notify('Tạo danh mục bị lỗi!', 'danger');
                console.error('POST: ' + url + '.', data.error);
            } else {
                dispatch({ type: CREATE_ITEM, item: data.item });
                if (done) done(data);
            }
        }, error => T.notify('Tạo danh mục bị lỗi!', 'danger'));
    }
}

export function updateCategory(_id, changes, done) {
    return dispatch => {
        const url = '/admin/category';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Cập nhật danh mục bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
                done && done(data.error);
            } else {
                T.notify('Cập nhật danh mục thành công!', 'success');
                dispatch({ type: UPDATE_ITEM, item: data.item });
                done && done();
            }
        }, error => T.notify('Cập nhật danh mục bị lỗi!', 'danger'));
    }
}

export function swapCategory(_id, isMoveUp, type) {
    return dispatch => {
        const url = '/admin/category/swap/';
        T.put(url, { _id, isMoveUp }, data => {
            if (data.error) {
                T.notify('Thay đổi vị trí danh mục bị lỗi!', 'danger')
                console.error('PUT: ' + url + '.', data.error);
            } else {
                dispatch(getAll(type));
            }
        }, error => T.notify('Thay đổi vị trí danh mục bị lỗi!', 'danger'));
    }
}

export function deleteCategory(_id) {
    return dispatch => {
        const url = '/admin/category';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa danh mục bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '.', data.error);
            } else {
                T.alert('Xóa danh mục thành công!', 'error', false, 800);
                dispatch({ type: DELETE_ITEM, _id });
            }
        }, error => T.notify('Xóa danh mục bị lỗi!', 'danger'));
    }
}

export function changeCategory(category) {
    return { type: UPDATE_ITEM, item: category };
}