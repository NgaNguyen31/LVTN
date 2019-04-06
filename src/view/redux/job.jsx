import T from '../js/common';
T.initCookiePage('pageJob');
T.initCookiePage('pageDraftJob');

// Reducer -------------------------------------------------------------------------------------------------------------
const GET_JOB_IN_PAGE = 'job:getJobInPage';
const GET_DRAFT_JOB_IN_PAGE = 'job:getDraftJobInPage';
const GET_JOB = 'job:GetJob';
const GET_JOB_IN_PAGE_BY_USER = 'job:GetJobInPageByUser';
const GET_JOB_BY_USER = 'job:GetJobByUser';
const GET_JOB_NEWS_FEED = 'job:GetJobNewsFeed';

export default function jobReducer(state = null, data) {
    switch (data.type) {
        case GET_JOB_IN_PAGE:
            return Object.assign({}, state, { page: data.page });
        case GET_DRAFT_JOB_IN_PAGE:
            return Object.assign({}, state, { draft: data.page });
        case GET_JOB:
            return Object.assign({}, state, { job: data.item, categories: data.categories });

        case GET_JOB_IN_PAGE_BY_USER:
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

        case GET_JOB_BY_USER:
            return Object.assign({}, state, { userJob: data.item });

        case GET_JOB_NEWS_FEED:
            return Object.assign({}, state, { newsFeed: data.list });

        default:
            return state;
    }
}

// Actions (admin) ----------------------------------------------------------------------------------------------------
export function getJobInPage(pageNumber, pageSize, done) {
    const page = T.updatePage('pageJob', pageNumber, pageSize);
    return dispatch => {
        const url = '/admin/job/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách việc làm bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_JOB_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách việc làm bị lỗi!', 'danger'));
    };
}

export function createJob(done) {
    return dispatch => {
        const url = '/admin/job/default';
        T.post(url, data => {
            if (data.error) {
                T.notify('Tạo việc làm bị lỗi!', 'danger');
                console.error('POST: ' + url + '.', data.error);
            } else {
                dispatch(getJobInPage());
                if (done) done(data);
            }
        }, error => T.notify('Tạo việc làm bị lỗi!', 'danger'));
    }
}

export function updateJob(_id, changes, done) {
    return dispatch => {
        const url = '/admin/job';
        T.put(url, { _id, changes }, data => {
            if (data.error) {
                T.notify('Cập nhật thông tin việc làm bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
                done && done(data.error);
            } else {
                T.notify('Cập nhật thông tin việc làm thành công!', 'info');
                dispatch(getJobInPage());
                done && done();
            }
        }, error => T.notify('Cập nhật thông tin việc làm bị lỗi!', 'danger'));
    }
}

export function swapJob(_id, isMoveUp) {
    return dispatch => {
        const url = '/admin/job/swap/';
        T.put(url, { _id, isMoveUp }, data => {
            if (data.error) {
                T.notify('Thay đổi thứ tự việc làm bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                T.notify('Thay đổi thứ tự việc làm thành công!', 'info');
                dispatch(getJobInPage());
            }
        }, error => T.notify('Thay đổi thứ tự việc làm bị lỗi!', 'danger'));
    }
}

export function deleteJob(_id) {
    return dispatch => {
        const url = '/admin/job';
        T.delete(url, { _id }, data => {
            if (data.error) {
                T.notify('Xóa việc làm bị lỗi!', 'danger');
                console.error('DELETE: ' + url + '.', data.error);
            } else {
                T.alert('Người dùng được xóa thành công!', 'error', false, 800);
                dispatch(getJobInPage());
            }
        }, error => T.notify('Xóa việc làm bị lỗi!', 'danger'));
    }
}

export function getJob(_id, done) {
    return dispatch => {
        const url = '/admin/job/item/' + _id;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy việc làm bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data);
                dispatch({ type: GET_JOB, item: data.item, categories: data.categories });
            }
        }, error => done({ error }));
    }
}

// Actions (editor) ---------------------------------------------------------------------------------------------------
export function getJobInPageByEditor(pageNumber, pageSize, done) {
    const page = T.updatePage('pageJob', pageNumber, pageSize);
    return dispatch => {
        const url = '/editor/job/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách việc làm bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_JOB_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách việc làm bị lỗi!', 'danger'));
    };
}
export function getDraftJobInPageByEditor(pageNumber, pageSize, done) {
    const page = T.updatePage('pageDraftJob', pageNumber, pageSize);
    return dispatch => {
        const url = '/editor/draft/job/page/' + page.pageNumber + '/' + page.pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách việc làm bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data.page.pageNumber, data.page.pageSize, data.page.pageTotal, data.page.totalItem);
                dispatch({ type: GET_DRAFT_JOB_IN_PAGE, page: data.page });
            }
        }, error => T.notify('Lấy danh sách việc làm bị lỗi!', 'danger'));
    };
}

export function getJobByEditor(_id, done) {
    return dispatch => {
        const url = '/editor/job/item/' + _id;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy việc làm bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                if (done) done(data);
                dispatch({ type: GET_JOB, item: data.item, categories: data.categories });
            }
        }, error => done({ error }));
    }
}

export function swapJobByEditor(_id, isMoveUp) {
    return dispatch => {
        const url = '/editor/job/swap/';
        T.put(url, { _id, isMoveUp }, data => {
            if (data.error) {
                T.notify('Thay đổi thứ tự việc làm bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                T.notify('Thay đổi thứ tự việc làm thành công!', 'info');
                dispatch(getJobInPageByEditor());
            }
        }, error => T.notify('Thay đổi thứ tự việc làm bị lỗi!', 'danger'));
    }
}

export function changeJobActiveByEditor(_id, active) {
    return dispatch => {
        const url = '/editor/job/active/';
        T.put(url, { _id, active }, data => {
            if (data.error) {
                T.notify('Thay đổi trạng thái việc làm bị lỗi!', 'danger');
                console.error('PUT: ' + url + '.', data.error);
            } else {
                T.notify('Thay đổi trạng thái việc làm thành công!', 'info');
                dispatch(getJobInPageByEditor());
            }
        }, error => T.notify('Thay đổi trạng thái việc làm bị lỗi!', 'danger'));
    }
}

// Actions (user) -----------------------------------------------------------------------------------------------------
export function getJobInPageByUser(pageNumber, pageSize) {
    return dispatch => {
        const url = '/job/page/' + pageNumber + '/' + pageSize;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy danh sách việc làm bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_JOB_IN_PAGE_BY_USER, page: data.page });
            }
        }, error => T.notify('Lấy danh sách việc làm bị lỗi!', 'danger'));
    }
}

export function getJobByUser(jobId, jobLink) {
    return dispatch => {
        const url = jobId ? '/job/item/id/' + jobId : '/job/item/link/' + jobLink;
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy việc làm bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_JOB_BY_USER, item: data.item });
            }
        }, error => T.notify('Lấy việc làm bị lỗi!', 'danger'));
    }
}

export function getJobFeed() {
    return dispatch => {
        const url = '/job/page/1/' + T.newsFeedPageSize
        T.get(url, data => {
            if (data.error) {
                T.notify('Lấy job feed bị lỗi!', 'danger');
                console.error('GET: ' + url + '.', data.error);
            } else {
                dispatch({ type: GET_JOB_NEWS_FEED, list: data.page.list });
            }
        }, error => T.notify('Lấy jobs feed bị lỗi!', 'danger'));
    }
}

export function checkLink(_id, link) {
    return dispatch => {
        const url = '/job/item/check-link';
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