import React from 'react';
import { connect } from 'react-redux';
import { updateJob, getJob, checkLink } from './redux/job.jsx'
import { Link } from 'react-router-dom';
import ImageBox from './ImageBox.jsx';
import Editor from './CkEditor4.jsx';

class JobEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.checkLink = this.checkLink.bind(this);
        this.jobLinkChange = this.jobLinkChange.bind(this);
        this.save = this.save.bind(this);

        this.jobLink = React.createRef();
        this.imageBox = React.createRef();
        this.editor = React.createRef();

        this.state = { item: null };
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(7, 1);
            this.getData();

            setTimeout(() => {
                $('#jbJobTitle').focus();

                $('#jbJobCategories').select2();

                $('#jbJobStartPost').datetimepicker(T.dateFormat);
                $('#jbJobStopPost').datetimepicker(T.dateFormat);
            }, 250);
        });
    }

    getData() {
        const route = T.routeMatcher('/admin/job/edit/:jobId'),
            params = route.parse(window.location.pathname);

        this.props.getJob(params.jobId, data => {
            if (data.error) {
                T.notify('Lấy việc làm bị lỗi!', 'danger');
                this.props.history.push('/admin/job/list');
            } else if (data.categories && data.item) {
                $('#jbJobCategories').select2({ data: data.categories }).val(data.item.categories);

                const jbJobStartPost = $('#jbJobStartPost').datetimepicker(T.dateFormat);
                const jbJobStopPost = $('#jbJobStopPost').datetimepicker(T.dateFormat);
                if (data.item.startPost)
                    jbJobStartPost.val(T.dateToText(data.item.startPost, 'dd/mm/yyyy HH:MM')).datetimepicker('update');
                if (data.item.stopPost)
                    jbJobStopPost.val(T.dateToText(data.item.stopPost, 'dd/mm/yyyy HH:MM')).datetimepicker('update');

                if (data.item.link) {
                    $(this.jobLink.current).html('http://cse.hcmut.edu.vn/vieclam/' + data.item.link)
                        .attr('href', '/vieclam/' + data.item.link);
                } else {
                    $(this.jobLink.current).html('').attr('href', '#');
                }

                data.image = data.item.image ? data.item.image : '/image/avatar.jpg';
                this.imageBox.current.setData('job:' + (data.item._id ? data.item._id : 'new'));

                $('#jbJobAbstract').val(data.item.abstract ? data.item.abstract : '');
                this.editor.current.html(data.item.content ? data.item.content : '');

                this.setState(data);
            } else {
                this.props.history.push('/admin/job/list');
            }
        });
    }

    changeActive(job) {
        this.setState({ item: Object.assign({}, this.state.item, { active: job.target.checked }) });
    }

    checkLink(item) {
        this.props.checkLink(item._id, $('#jbJobLink').val().trim());
    }

    jobLinkChange(e) {
        if (e.target.value) {
            $(this.jobLink.current).html('http://cse.hcmut.edu.vn/vieclam/' + e.target.value)
                .attr('href', '/vieclam/' + e.target.value);
        } else {
            $(this.jobLink.current).html('').attr('href', '#');
        }
    }

    save() {
        const changes = {
            categories: $('#jbJobCategories').val(),
            title: $('#jbJobTitle').val(),
            link: $('#jbJobLink').val().trim(),
            active: this.state.item.active,
            abstract: $('#jbJobAbstract').val(),
            content: this.editor.current.html(),
            startPost: T.formatDate($('#jbJobStartPost').val()),
            stopPost: T.formatDate($('#jbJobStopPost').val()),
        };

        this.props.updateJob(this.state.item._id, changes, () => $('#jbJobLink').val(changes.link));
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
            linkDefaultJob = 'http://cse.hcmut.edu.vn/job/item/' + item._id;
        let categories = this.state.categories ? this.state.categories.map(
            (item, index) => <option key={index} value={item._id}>{item.title}</option>) : null;

        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-edit' /> Edit Job</h1>
                        <p dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        &nbsp;/&nbsp;
                        <Link to='/admin/job/list'>Job Category</Link>
                        &nbsp;/&nbsp;Edit
                    </ul>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='tile'>
                            <h3 className='tile-title'>Common Information</h3>
                            <div className='tile-body'>
                                <div className='form-group'>
                                    <label className='control-label'>Title</label>
                                    <input className='form-control' type='text' placeholder='Title' id='jbJobTitle' defaultValue={item.title} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Avatar</label>
                                    <ImageBox ref={this.imageBox} postUrl='/admin/upload' uploadType='JobImage' userData='job' image={this.state.image} />
                                </div>
                                <div className='form-group row'>
                                    <label className='control-label col-3 col-sm-3'>Active</label>
                                    <div className='col-8 col-sm-8 toggle'>
                                        <label>
                                            <input type='checkbox' checked={item.active} onChange={this.changeActive} /><span className='button-indecator' />
                                        </label>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='control-label col-3 col-sm-3'>View</label>
                                    <div className='col-8 col-sm-8'>{item.view}</div>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Job category</label>
                                    <select className='form-control' id='jbJobCategories' multiple={true} defaultValue={[]}>
                                        <optgroup label='Job category' />
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
                                    <a href={linkDefaultJob} style={{ fontWeight: 'bold' }} target='_blank'>{linkDefaultJob}</a>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Link truyền thông</label><br />
                                    <a href='#' ref={this.jobLink} style={{ fontWeight: 'bold' }} target='_blank' />
                                    <input className='form-control' id='jbJobLink' type='text' placeholder='Link truyền thông' defaultValue={item.link} onChange={this.jobLinkChange} />
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
                                    <input className='form-control' id='jbJobStartPost' type='text' placeholder='Ngày bắt đầu đăng bài viết' defaultValue={item.startPost} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Ngày kết thúc đăng bài viết</label>
                                    <input className='form-control' id='jbJobStopPost' type='text' placeholder='Ngày kết thúc đăng bài viết' defaultValue={item.stopPost} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='tile'>
                            <h3 className='tile-title'>Tóm tắt bài viết</h3>
                            <div className='tile-body'>
                                <textarea defaultValue='' id='jbJobAbstract' style={{ border: 'solid 1px #eee', width: '100%', minHeight: '100px', padding: '0 3px' }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='tile'>
                            <h3 className='tile-title'>Nội dung việc làm</h3>
                            <div className='tile-body'>
                                <Editor ref={this.editor} placeholder='Nội dung việc làm' />
                            </div>
                        </div>
                    </div>
                </div>

                <Link to='/admin/job/list' className='btn btn-secondary btn-circle' style={{ position: 'fixed', lefft: '10px', bottom: '10px' }}>
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

const mapStateToProps = state => ({ job: state.job });
const mapActionsToProps = { updateJob, getJob, checkLink };
export default connect(mapStateToProps, mapActionsToProps)(JobEditPage);