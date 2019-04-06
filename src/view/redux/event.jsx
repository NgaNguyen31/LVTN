import T from '../js/common';
T.initCookiePage('pageEvent');
T.initCookiePage('pageDraftEvent');

// Reducer -------------------------------------------------------------------------------------------------------------
const GET_EVENT_IN_PAGE = 'event:getEventInPage';
const GET_DRAFT_EVENT_IN_PAGE = 'event:getDraftEventInPage';
const GET_EVENT = 'event:GetEvent';
const GET_EVENT_IN_PAGE_BY_USER = 'event:GetEventInPageByUser';
const GET_EVENT_BY_USER = 'event:GetEventByUser';
const GET_EVENT_FEED = 'event:GetEventFeed';

export default function eventReducer(state = null, data) {
    switch (data.type) {
        case GET_EVENT_IN_PAGE:
            return Object.assign({}, state, { page: data.page });
        case GET_DRAFT_EVENT_IN_PAGE:
            return Object.assign({}, state, { draft: data.page });
        case GET_EVENT:
            return Object.assign({}, state, { event: data.item, categories: data.categories });

        case GET_EVENT_IN_PAGE_BY_USER:
            if (state == null || state.userCondition != data.condition) {
                return Object.assign({}, state, { userCondition: data.condition, userPage: data.page });
            } else {
                const userPage = Object.assign({}, data.page);
                userPage.list = state.userPage && state.userPage.list ? state.userPage.list.slice() : [];
                let _ids = userPage.list.map(item => item._id);
                if (data.page && data.page.list && data.page.list.length > 0) {
                    data.page.list.forEach(item => {
                        if (_ids.indexOf(item._id) == -1) {
                            _ids.push(item._id);
                            userPage.list.push(item);
                        }
                    });
                }
                return Object.assign({}, state, { userPage });
            }

        case GET_EVENT_BY_USER:
            return Object.assign({}, state, { userEvent: data.item });

        case GET_EVENT_FEED:
            return Object.assign({}, state, { newsFeed: data.list });

        default:
            return state;
    }
}

// Actions (admin) ----------------------------------------------------------------------------------------------------
export function getEventInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('pageEvent', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/event/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách sự kiện bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_EVENT_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách sự kiện bị lỗi!', 'danger'));
    };
}

export function createEvent(done) {
    return dispatch => {
        const url = '/admin/event/default';
        T.post(url, data => {
            if (data.error) {
                T.notify('Tạo sự kiện bị lỗi!', 'danger');
                console.error('POST: ' + url + '.', data.error);
            } else {
                dispatch(getEventInPage());
                if (done) done(data);
            }
        }, error => T.notify('Tạo sự kiện bị lỗi!', 'danger'));
    }
}

export function updateEvent(_id, changes, done) {
    return dispatch => {
        const url = '/admin/event';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Cập nhật thông tin sự kiện bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
                done && done(data.error);
            } else {
                T.notify('Cập nhật thông tin sự kiện thành công!', 'info');
                dispatch(getEventInPage());
                done && done();
            }
        }, error => T.notify('Cập nhật thông tin sự kiện bị lỗi!', 'danger'));
    }
}

export function swapEvent(_id, isMoveUp) {
    return dispatch => {
        const url = '/admin/event/swap/';
        T.put(url, { _id, isMoveUp }, data => {
            if (data.error) {
                T.notify('Thay đổi thứ tự sự kiện bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                T.notify('Thay đổi thứ tự sự kiện thành công!', 'info');
                dispatch(getEventInPage());
            }
        }, error => T.notify('Thay đổi thứ tự sự kiện bị lỗi!', 'danger'));
    }
}

export function deleteEvent(_id) {
    return dispatch => {
        const url = '/admin/event';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa sự kiện bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '.', data.error);
            } else {
                T.alert('Người dùng được xóa thành công!', 'error', false, 800);
                dispatch(getEventInPage());
            }
        }, error => T.notify('Xóa sự kiện bị lỗi!', 'danger'));
    }
}

export function getEvent(_id, done) {
    return dispatch => {
        const url = '/admin/event/item/' + _id;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy sự kiện bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data);
                dispatch({ type: GET_EVENT, item: data.item, categories: data.categories });
            }
        }, error => done({ error }));
    }
}

// Actions (editor) ---------------------------------------------------------------------------------------------------
export function getEventInPageByEditor(pageNumber, pageSize, done) {
    const page = T.updatePage('pageEvent', pageNumber, pageSize);
    return dispatch => {
        const url = '/editor/event/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách sự kiện bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_EVENT_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách sự kiện bị lỗi!', 'danger'));
    };
}
export function getDraftEventInPageByEditor(pageNumber, pageSize, done) {
    const page = T.updatePage('pageDraftEvent', pageNumber, pageSize);
    return dispatch => {
        const url = '/editor/draft/event/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách sự kiện bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_DRAFT_EVENT_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách sự kiện bị lỗi!', 'danger'));
    };
}

export function getEventByEditor(_id, done) {
    return dispatch => {
        const url = '/editor/event/item/' + _id;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy sự kiện bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data);
                dispatch({ type: GET_EVENT, item: data.item, categories: data.categories });
            }
        }, error => done({ error }));
    }
}

export function swapEventByEditor(_id, isMoveUp) {
    return dispatch => {
        const url = '/editor/event/swap/';
        T.put(url, { _id, isMoveUp }, data => {
            if (data.error) {
                T.notify('Thay đổi thứ tự sự kiện bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                T.notify('Thay đổi thứ tự sự kiện thành công!', 'info');
                dispatch(getEventInPageByEditor());
            }
        }, error => T.notify('Thay đổi thứ tự sự kiện bị lỗi!', 'danger'));
    }
}

export function changeEventActiveByEditor(_id, active) {
    return dispatch => {
        const url = '/editor/event/active/';
        T.put(url, { _id, active }, data => {
            if (data.error) {
                T.notify('Thay đổi trạng thái sự kiện bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                T.notify('Thay đổi trạng thái sự kiện thành công!', 'info');
                dispatch(getEventInPageByEditor());
            }
        }, error => T.notify('Thay đổi trạng thái sự kiện bị lỗi!', 'danger'));
    }
}

// Actions (user) -----------------------------------------------------------------------------------------------------
export function getEventInPageByUser(pageNumber, pageSize) {
    return dispatch => {
        const url = '/event/page/' + pageNumber + '/' + pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách sự kiện bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_EVENT_IN_PAGE_BY_USER, page: data.page });
            }
        }, error => T.notify('Lấy danh sách sự kiện bị lỗi!', 'danger'));
    }
}

export function getEventByUser(eventId, eventLink) {
    return dispatch => {
        const url = eventId ? '/event/item/id/' + eventId : '/event/item/link/' + eventLink;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy sự kiện bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_EVENT_BY_USER, item: data.item });
            }
        }, error => T.notify('Lấy sự kiện bị lỗi!', 'danger'));
    }
}

export function getEventFeed() {
    return dispatch => {
        const url = '/event/page/1/' + T.newsFeedPageSize
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy events feed bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_EVENT_FEED, list: data.page.list });
            }
        }, error => T.notify('Lấy events feed bị lỗi!', 'danger'));
    }
}

export function checkLink(_id, link) {
    return dispatch => {
        const url = '/event/item/check-link';
        T.put(url, { _id, link }, data => {
            if (data.error) {
                T.notify('Link không hợp lệ!', 'danger');
                console.error('PUT: ' + url + '.', error);
            } else {
                T.notify('Link hợp lệ!', 'success');
            }
        }, error => T.notify('Kiểm tra Link bị lỗi!', 'danger'));
    }
}