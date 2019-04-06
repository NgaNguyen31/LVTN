import T from '../js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_CONTACTS = 'contact:getContacts';
const GET_CONTACT_IN_PAGE = 'contact:getContactInPage';
const GET_UNREAD_CONTACTS = 'contact:getUnreadContacts';
const ADD_CONTACT = 'contact:AddContact';
const UPDATE_CONTACT = 'contact:UpdateContact';

export default function contactReducer(state = null, data) {
    switch (data.type) {
        case GET_CONTACTS:
            return Object.assign({}, state, { items: data.items });

        case GET_CONTACT_IN_PAGE:
            return Object.assign({}, state, { page: data.page });

        case GET_UNREAD_CONTACTS:
            return Object.assign({}, state, { unreads: data.items });

        case ADD_CONTACT:
            if (state) {
                let addedItems = Object.assign({}, state.items),
                    addedPage = Object.assign({}, state.page),
                    addedUnreads = Object.assign({}, state.unreads),
                    addedItem = data.item;
                if (addedItems) {
                    addedItems.splice(0, 0, addedItem);
                }
                if (addedPage && addedPage.pageNumber == 1) {
                    addedPage.list = addedPage.list.slice(0);
                    addedPage.list.splice(0, 0, addedItem);
                }
                if (updatedUnreads && addedItem.read == false) {
                    addedUnreads.splice(0, 0, addedItem);
                }
            } else {
                return state;
            }

        case UPDATE_CONTACT:
            if (state) {
                let updatedItems = Object.assign({}, state.items),
                    updatedPage = Object.assign({}, state.page),
                    updatedUnreads = Object.assign({}, state.unreads),
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
                if (updatedUnreads) {
                    if (updatedItem.read) {
                        for (let i = 0, n = updatedUnreads.length; i < n; i++) {
                            if (updatedUnreads[i]._id == updatedItem._id) {
                                updatedUnreads.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        updatedPage.list.splice(0, 1, updatedItem);
                    }
                }
                return Object.assign({}, state, { items: updatedItems, page: updatedPage, unreads: updatedUnreads });
            } else {
                return state;
            }

        default:
            return state;
    }
}

// Actions ------------------------------------------------------------------------------------------------------------
T.initCookiePage('adminContact');
export function getAllContacts(done) {
    return dispatch => {
        const url = '/admin/contact/all';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách thông tin liên hệ bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_CONTACTS, items: data.items });
            }
        }, error => T.notify('Lấy danh sách thông tin liên hệ bị lỗi!', 'danger'));
    }
}

export function getContactInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('adminContact', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/contact/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách liên hệ bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_CONTACT_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách liên hệ bị lỗi!', 'danger'));
    }
}

export function getContact(contactId, done) {
    return dispatch => {
        const url = '/admin/contact/item/' + contactId;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy thông tin liên hệ bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.item);
                dispatch({ type: UPDATE_CONTACT, item: data.item });
            }
        }, error => T.notify('Lấy thông tin liên hệ bị lỗi!', 'danger'));
    }
}

export function getUnreadContacts(done) {
    return dispatch => {
        const url = '/admin/contact/unread';
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách thông tin liên hệ bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            } else {
                if (done) done(data.items);
                dispatch({ type: GET_UNREAD_CONTACTS, items: data.items });
            }
        }, error => T.notify('Lấy danh sách thông tin liên hệ bị lỗi!', 'danger'));
    }
}

export function updateContact(_id, changes, done) {
    return dispatch => {
        const url = '/admin/contact';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Cập nhật thông tin liên hệ bị lỗi!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
                done && done(data.error);
            } else {
                T.notify('Cập nhật thông tin liên hệ thành công!', 'info');
                dispatch(getContactInPage());
                done && done();
            }
        }, error => T.notify('Cập nhật thông tin liên hệ bị lỗi!', 'danger'));
    }
}

export function deleteContact(_id) {
    return dispatch => {
        const url = '/admin/contact';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa thông tin liên hệ bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '. ' + data.error);
            } else {
                T.alert('Thông tin liên hệ được xóa thành công!', 'error', false, 800);
                dispatch(getContactInPage());
            }
        }, error => T.notify('Xóa thông tin liên hệ bị lỗi!', 'danger'));
    }
}

export function addContact(item) {
    return { type: ADD_CONTACT, item };
}
export function changeContact(item) {
    return { type: UPDATE_CONTACT, item };
}

export function createContact(contact, done) {
    return dispatch => {
        const url = '/home/contact';
        T.post(url, { contact }, data => {
            if (data.error) {
                T.notify('Gửi thông tin liên hệ bị lỗi!', 'danger');
                console.error('POST: ' + url + '. ' + data.error);
            } else {
                if (done) done(data);
            }
        }, error => T.notify('Gửi thông tin liên hệ bị lỗi!', 'danger'));
    }
}