import React from 'react';
import { connect } from 'react-redux';
import { updateNews, getNews, checkLink } from './redux/news.jsx'
import { Link } from 'react-router-dom';
import ImageBox from './ImageBox.jsx';
import Editor from './CkEditor4.jsx';

class NewsEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.checkLink = this.checkLink.bind(this);
        this.newsLinkChange = this.newsLinkChange.bind(this);
        this.save = this.save.bind(this);

        this.newsLink = React.createRef();
        this.imageBox = React.createRef();
        this.editor = React.createRef();

        this.state = { item: null };
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(5, 1);
            this.getData();

            setTimeout(() => {
                $('#neNewsTitle').focus();

                $('#neNewsCategories').select2();

                $('#neNewsStartPost').datetimepicker(T.dateFormat);
                $('#neNewsStopPost').datetimepicker(T.dateFormat);
            }, 250);
        });
    }

    getData() {
        const route = T.routeMatcher('/admin/news/edit/:newsId'),
            params = route.parse(window.location.pathname);

        this.props.getNews(params.newsId, data => {
            if (data.error) {
                T.notify('Lấy tin tức bị lỗi!', 'danger');
                this.props.history.push('/admin/news/list');
            } else if (data.item) {
                $('#neNewsCategories').select2({ data: data.categories }).val(data.item.categories);

                const neNewsStartPost = $('#neNewsStartPost').datetimepicker(T.dateFormat);
                const neNewsStopPost = $('#neNewsStopPost').datetimepicker(T.dateFormat);
                if (data.item.startPost)
                    neNewsStartPost.val(T.dateToText(data.item.startPost, 'dd/mm/yyyy HH:MM')).datetimepicker('update');
                if (data.item.stopPost)
                    neNewsStopPost.val(T.dateToText(data.item.stopPost, 'dd/mm/yyyy HH:MM')).datetimepicker('update');

                if (data.item.link) {
                    $(this.newsLink.current).html('http://cse.hcmut.edu.vn/tintuc/' + data.item.link)
                        .attr('href', '/tintuc/' + data.item.link);
                } else {
                    $(this.newsLink.current).html('').attr('');
                }

                data.image = data.item.image ? data.item.image : '/image/avatar.jpg';
                this.imageBox.current.setData('news:' + (data.item._id ? data.item._id : 'new'));

                $('#neNewsAbstract').val(data.item.abstract ? data.item.abstract : '');
                this.editor.current.html(data.item.content ? data.item.content : '');

                this.setState(data);
            } else {
                this.props.history.push('/admin/news/list');
            }
        });
    }

    changeActive(event) {
        this.setState({ item: Object.assign({}, this.state.item, { active: event.target.checked }) });
    }

    checkLink(item) {
        this.props.checkLink(item._id, $('#neNewsLink').val().trim());
    }

    newsLinkChange(e) {
        if (e.target.value) {
            $(this.newsLink.current).html('http://cse.hcmut.edu.vn/tintuc/' + e.target.value)
                .attr('href', '/tintuc/' + e.target.value);
        } else {
            $(this.newsLink.current).html('').attr('href', '#');
        }
    }

    save() {
        const changes = {
            categories: $('#neNewsCategories').val(),
            title: $('#neNewsTitle').val(),
            link: $('#neNewsLink').val().trim(),
            active: this.state.item.active,
            abstract: $('#neNewsAbstract').val(),
            content: this.editor.current.html(),
            startPost: T.formatDate($('#neNewsStartPost').val()),
            stopPost: T.formatDate($('#neNewsStopPost').val()),
        };

        console.log(changes);
        this.props.updateNews(this.state.item._id, changes, () => $('#neNewsLink').val(changes.link));
    }

    render() {
        const item = this.state.item ? this.state.item : {
            priority: 1,
            categories: [],
            title: '',
            content: '',
            image: T.url('/image/avatar.jpg'),
            createdDate: new Date(),
            active: false,
            view: 0
        };
        const title = item.title != '' ? 'Tiêu đề: <b>' + item.title + '</b> - ' + T.dateToText(item.createdDate) : '',
            linkDefaultNews = 'http://cse.hcmut.edu.vn/news/item/' + item._id;

        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-file' /> Tin tức: Chỉnh sửa</h1>
                        <p dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        &nbsp;/&nbsp;
                        <Link to='/admin/news/list'>Danh sách tin tức</Link>
                        &nbsp;/&nbsp;Chỉnh sửa
                    </ul>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='tile'>
                            <h3 className='tile-title'>Thông tin chung</h3>
                            <div className='tile-body'>
                                <div className='form-group'>
                                    <label className='control-label'>Tên bài viết</label>
                                    <input className='form-control' type='text' placeholder='Tên bài viết' id='neNewsTitle' defaultValue={item.title} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Hình ảnh</label>
                                    <ImageBox ref={this.imageBox} postUrl='/admin/upload' uploadType='NewsImage' userData='news' image={this.state.image} />
                                </div>
                                <div className='form-group row'>
                                    <label className='control-label col-3 col-sm-3'>Kích hoạt</label>
                                    <div className='col-8 col-sm-8 toggle'>
                                        <label>
                                            <input type='checkbox' checked={item.active} onChange={this.changeActive} /><span className='button-indecator' />
                                        </label>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='control-label col-12'>Lược xem: {item.view}</label>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Danh mục bài viết</label>
                                    <select className='form-control' id='neNewsCategories' multiple={true} defaultValue={[]}>
                                        <optgroup label='Lựa chọn danh mục' />
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='tile'>
                            <h3 className='tile-title'>Link</h3>
                            <div className='tile-body'>
                                <div className='form-group'>
                                    <label className='control-label'>Link mặc định</label><br />
                                    <a href={linkDefaultNews} style={{ fontWeight: 'bold' }} target='_blank'>{linkDefaultNews}</a>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Link truyền thông</label><br />
                                    <a href='#' ref={this.newsLink} style={{ fontWeight: 'bold' }} target='_blank' />
                                    <input className='form-control' id='neNewsLink' type='text' placeholder='Link truyền thông' defaultValue={item.link} onChange={this.newsLinkChange} />
                                </div>
                            </div>
                            <div className='tile-footer'>
                                <button className='btn btn-danger' type='button' onClick={() => this.checkLink(item)}>
                                    <i className='fa fa-fw fa-lg fa-check-circle' />Kiểm tra link
                                </button>
                            </div>
                        </div>
                        <div className='tile'>
                            <h3 className='tile-title'>Ngày tháng</h3>
                            <div className='tile-body'>
                                <div className='form-group'>
                                    <label className='control-label'>Ngày tạo: {T.dateToText(item.createdDate)}</label>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Ngày bắt đầu đăng bài viết</label>
                                    <input className='form-control' id='neNewsStartPost' type='text' placeholder='Ngày bắt đầu đăng bài viết' defaultValue={item.startPost} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Ngày kết thúc đăng bài viết</label>
                                    <input className='form-control' id='neNewsStopPost' type='text' placeholder='Ngày kết thúc đăng bài viết' defaultValue={item.stopPost} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='tile'>
                            <h3 className='tile-title'>Tóm tắt bài viết</h3>
                            <div className='tile-body'>
                                <textarea defaultValue='' id='neNewsAbstract' style={{ border: 'solid 1px #eee', width: '100%', minHeight: '100px', padding: '0 3px' }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='tile'>
                            <h3 className='tile-title'>Nội dung bài viết</h3>
                            <div className='tile-body'>
                                <Editor ref={this.editor} placeholder='Nội dung bài biết' />
                            </div>
                        </div>
                    </div>
                </div>

                <Link to='/admin/news/list' className='btn btn-secondary btn-circle' style={{ position: 'fixed', bottom: '10px' }}>
                    <i className='fa fa-lg fa-reply' />
                </Link>
                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }}
                    onClick={this.save}>
                    <i className='fa fa-lg fa-save' />
                </button>
            </main>
        );
    }
}

const mapStateToProps = state => ({ news: state.news });
const mapActionsToProps = { updateNews, getNews, checkLink };
export default connect(mapStateToProps, mapActionsToProps)(NewsEditPage);