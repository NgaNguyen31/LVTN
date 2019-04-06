import T from '../js/common';
T.initCookiePage('pageNews');
T.initCookiePage('pageDraftNews');

// Reducer ------------------------------------------------------------------------------------------------------------
const GET_NEWS_IN_PAGE = 'news:getNewsInPage';
const GET_DRAFT_NEWS_IN_PAGE = 'news:getDraftNewsInPage';
const GET_NEWS = 'news:GetNews';
const GET_NEWS_IN_PAGE_BY_USER = 'news:GetNewsInPageByUser';
const GET_NEWS_BY_USER = 'news:GetNewsByUser';
const GET_NEWS_FEED = 'news:GetNewsFeed';

export default function newsReducer(state = null, data) {
    switch (data.type) {
        case GET_NEWS_IN_PAGE:
            return Object.assign({}, state, { page: data.page });
        case GET_DRAFT_NEWS_IN_PAGE:
            return Object.assign({}, state, { draft: data.page });
        case GET_NEWS:
            return Object.assign({}, state, { news: data.item, categories: data.categories });

        case GET_NEWS_IN_PAGE_BY_USER:
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

        case GET_NEWS_BY_USER:
            return Object.assign({}, state, { userNews: data.item });

        case GET_NEWS_FEED:
            return Object.assign({}, state, { newsFeed: data.list });

        default:
            return state;
    }
}

// Actions (admin) ----------------------------------------------------------------------------------------------------
export function getNewsInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('pageNews', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/news/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách tin tức bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_NEWS_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách tin tức bị lỗi!', 'danger'));
    }
}

export function createNews(done) {
    return dispatch => {
        const url = '/admin/news/default';
        T.post(url, data => {
            if (data.error) {
                T.notify('Tạo tin tức bị lỗi!', 'danger');
                console.error('POST: ' + url + '.', data.error);
            } else {
                dispatch(getNewsInPage());
                if (done) done(data);
            }
        }, error => T.notify('Tạo tin tức bị lỗi!', 'danger'));
    }
}

export function updateNews(_id, changes, done) {
    return dispatch => {
        const url = '/admin/news';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Cập nhật thông tin tin tức bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
                done && done(data.error);
            } else {
                T.notify('Cập nhật thông tin tin tức thành công!', 'info');
                dispatch(getNewsInPage());
                done && done();
            }
        }, error => T.notify('Cập nhật thông tin tin tức bị lỗi!', 'danger'));
    }
}

export function swapNews(_id, isMoveUp) {
    return dispatch => {
        const url = '/admin/news/swap/';
        T.put(url, { _id, isMoveUp }, data => {
            if (data.error) {
                T.notify('Thay đổi thứ tự tin tức bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                T.notify('Thay đổi thứ tự tin tức thành công!', 'info');
                dispatch(getNewsInPage());
            }
        }, error => T.notify('Thay đổi thứ tự tin tức bị lỗi!', 'danger'));
    }
}

export function deleteNews(_id) {
    return dispatch => {
        const url = '/admin/news';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa tin tức bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '.', data.error);
            } else {
                T.alert('Người dùng được xóa thành công!', 'error', false, 800);
                dispatch(getNewsInPage());
            }
        }, error => T.notify('Xóa tin tức bị lỗi!', 'danger'));
    }
}

export function getNews(_id, done) {
    return dispatch => {
        const url = '/admin/news/item/' + _id;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy tin tức bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data);
                dispatch({ type: GET_NEWS, item: data.item, categories: data.categories });
            }
        }, error => done({ error }));
    }
}

// Actions (editor) ---------------------------------------------------------------------------------------------------
export function getNewsInPageByEditor(pageNumber, pageSize, done) {
    const page = T.updatePage('pageNews', pageNumber, pageSize);
    return dispatch => {
        const url = '/editor/news/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách tin tức bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_NEWS_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách tin tức bị lỗi!', 'danger'));
    }
}
export function getDraftNewsInPageByEditor(pageNumber, pageSize, done) {
    const page = T.updatePage('pageDraftNews', pageNumber, pageSize);
    return dispatch => {
        const url = '/editor/draft/news/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách tin tức bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_DRAFT_NEWS_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách tin tức bị lỗi!', 'danger'));
    }
}

export function getNewsByEditor(_id, done) {
    return dispatch => {
        const url = '/editor/news/item/' + _id;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy tin tức bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data);
                dispatch({ type: GET_NEWS, item: data.item, categories: data.categories });
            }
        }, error => done({ error }));
    }
}

export function swapNewsByEditor(_id, isMoveUp) {
    return dispatch => {
        const url = '/editor/news/swap/';
        T.put(url, { _id, isMoveUp }, data => {
            if (data.error) {
                T.notify('Thay đổi thứ tự tin tức bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                T.notify('Thay đổi thứ tự tin tức thành công!', 'info');
                dispatch(getNewsInPageByEditor());
            }
        }, error => T.notify('Thay đổi thứ tự tin tức bị lỗi!', 'danger'));
    }
}

export function changeNewsActiveByEditor(_id, active) {
    return dispatch => {
        const url = '/editor/news/active/';
        T.put(url, { _id, active }, data => {
            if (data.error) {
                T.notify('Thay đổi trạng thái tin tức bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                T.notify('Thay đổi trạng thái tin tức thành công!', 'info');
                dispatch(getNewsInPageByEditor());
            }
        }, error => T.notify('Thay đổi trạng thái tin tức bị lỗi!', 'danger'));
    }
}

// Actions (user) -----------------------------------------------------------------------------------------------------
export function getNewsInPageByUser(pageNumber, pageSize) {
    return dispatch => {
        const url = '/news/page/' + pageNumber + '/' + pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách tin tức bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_NEWS_IN_PAGE_BY_USER, page: data.page });
            }
        }, error => T.notify('Lấy danh sách tin tức bị lỗi!', 'danger'));
    }
}

export function getNewsByUser(newsId, newsLink) {
    return dispatch => {
        const url = newsId ? '/news/item/id/' + newsId : '/news/item/link/' + newsLink;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy tin tức bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_NEWS_BY_USER, item: data.item });
            }
        }, error => T.notify('Lấy tin tức bị lỗi!', 'danger'));
    }
}

export function getNewsFeed() {
    return dispatch => {
        const url = '/news/page/1/' + T.newsFeedPageSize
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy news feed bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_NEWS_FEED, list: data.page.list });
            }
        }, error => T.notify('Lấy news feed bị lỗi!', 'danger'));
    }
}

export function checkLink(_id, link) {
    return dispatch => {
        const url = '/news/item/check-link';
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