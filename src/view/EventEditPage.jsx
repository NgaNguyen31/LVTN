import React from 'react';
import { connect } from 'react-redux';
import { updateEvent, getEvent, checkLink } from './redux/event.jsx'
import { Link } from 'react-router-dom';
import ImageBox from './ImageBox.jsx';
import Editor from './CkEditor4.jsx';

class EventEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.checkLink = this.checkLink.bind(this);
        this.eventLinkChange = this.eventLinkChange.bind(this);
        this.save = this.save.bind(this);

        this.eventLink = React.createRef();
        this.imageBox = React.createRef();
        this.editor = React.createRef();

        this.state = { item: null };
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(6, 1);
            this.getData();

            setTimeout(() => {
                $('#evEventTitle').focus();

                $('#evEventCategories').select2();

                $('#evEventStartPost').datetimepicker(T.dateFormat);
                $('#evEventStopPost').datetimepicker(T.dateFormat);
                $('#evEventStartRegister').datetimepicker(T.dateFormat);
                $('#evEventStopRegister').datetimepicker(T.dateFormat);
                $('#evEventStartEvent').datetimepicker(T.dateFormat);
                $('#evEventStopEvent').datetimepicker(T.dateFormat);
            }, 250);
        });
    }

    getData() {
        const route = T.routeMatcher('/admin/event/edit/:eventId'),
            params = route.parse(window.location.pathname);

        this.props.getEvent(params.eventId, data => {
            if (data.error) {
                T.notify('Lấy sự kiện bị lỗi!', 'danger');
                this.props.history.push('/admin/event/list');
            } else if (data.categories && data.item) {
                $('#evEventCategories').select2({ data: data.categories }).val(data.item.categories);

                const evEventStartPost = $('#evEventStartPost').datetimepicker(T.dateFormat);
                const evEventStopPost = $('#evEventStopPost').datetimepicker(T.dateFormat);
                const evEventStartRegister = $('#evEventStartRegister').datetimepicker(T.dateFormat);
                const evEventStopRegister = $('#evEventStopRegister').datetimepicker(T.dateFormat);
                const evEventStartEvent = $('#evEventStartEvent').datetimepicker(T.dateFormat);
                const evEventStopEvent = $('#evEventStopEvent').datetimepicker(T.dateFormat);
                if (data.item.startPost) evEventStartPost.datetimepicker('update', new Date(data.item.startPost));
                if (data.item.stopPost) evEventStopPost.datetimepicker('update', new Date(data.item.stopPost));
                if (data.item.startRegister) evEventStartRegister.datetimepicker('update', new Date(data.item.startRegister));
                if (data.item.stopRegister) evEventStopRegister.datetimepicker('update', new Date(data.item.stopRegister));
                if (data.item.startEvent) evEventStartEvent.datetimepicker('update', new Date(data.item.startEvent));
                if (data.item.stopEvent) evEventStopEvent.datetimepicker('update', new Date(data.item.stopEvent));

                if (data.item.link) {
                    $(this.eventLink.current).html('http://cse.hcmut.edu.vn/sukien/' + data.item.link)
                        .attr('href', '/sukien/' + data.item.link);
                } else {
                    $(this.eventLink.current).html('').attr('href', '#');
                }

                data.image = data.item.image ? data.item.image : '/image/avatar.jpg';
                this.imageBox.current.setData('event:' + (data.item._id ? data.item._id : 'new'));

                $('#evMaxRegisterUsers').val(data.item.maxRegisterUsers);

                $('#evEventAbstract').val(data.item.abstract ? data.item.abstract : '');
                this.editor.current.html(data.item.content ? data.item.content : '');

                this.setState(data);
            } else {
                this.props.history.push('/admin/event/list');
            }
        });
    }

    changeActive(event) {
        this.setState({ item: Object.assign({}, this.state.item, { active: event.target.checked }) });
    }

    checkLink(item) {
        this.props.checkLink(item._id, $('#evEventLink').val().trim());
    }

    eventLinkChange(e) {
        if (e.target.value) {
            $(this.eventLink.current).html('http://cse.hcmut.edu.vn/sukien/' + e.target.value)
                .attr('href', '/sukien/' + e.target.value);
        } else {
            $(this.eventLink.current).html('').attr('href', '#');
        }
    }

    save() {
        const changes = {
            categories: $('#evEventCategories').val(),
            title: $('#evEventTitle').val(),
            location: $('#evEventLocation').val(),
            link: $('#evEventLink').val().trim(),
            active: this.state.item.active,
            abstract: $('#evEventAbstract').val(),
            content: this.editor.current.html(),
            maxRegisterUsers: $('#evMaxRegisterUsers').val(),
            startPost: T.formatDate($('#evEventStartPost').val()),
            stopPost: T.formatDate($('#evEventStopPost').val()),
            startRegister: T.formatDate($('#evEventStartRegister').val()),
            stopRegister: T.formatDate($('#evEventStopRegister').val()),
            startEvent: T.formatDate($('#evEventStartEvent').val()),
            stopEvent: T.formatDate($('#evEventStopEvent').val()),
        };

        this.props.updateEvent(this.state.item._id, changes, () => $('#evEventLink').val(changes.link));
    }

    render() {
        const item = this.state.item ? this.state.item : {
            priority: 1,
            categories: [],
            title: '',
            location: '',
            numOfRegisterUsers: 0, maxRegisterUsers: -1,
            image: T.url('/image/avatar.jpg'),
            createdDate: new Date(),
            startPost: '', stopPost: '',
            startRegister: '', stopRegister: '',
            startEvent: '', stopEvent: '',
            active: false,
            view: 0
        };
        const title = item.title != '' ? 'Tiêu đề: <b>' + item.title + '</b> - ' + T.dateToText(item.createdDate) : '',
            linkDefaultEvent = 'http://cse.hcmut.edu.vn/event/item/' + item._id;

        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-edit' /> Sự kiện: Chỉnh sửa</h1>
                        <p dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        &nbsp;/&nbsp;
                        <Link to='/admin/event/list'>Danh sách sự kiện</Link>
                        &nbsp;/&nbsp;Chỉnh sửa
                    </ul>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='tile'>
                            <h3 className='tile-title'>Thông tin chung</h3>
                            <div className='tile-body'>
                                <div className='form-group'>
                                    <label className='control-label'>Tên sự kiện</label>
                                    <input className='form-control' type='text' placeholder='Tên sự kiện' id='evEventTitle' defaultValue={item.title} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Địa điểm</label>
                                    <input className='form-control' type='text' placeholder='Địa điểm' id='evEventLocation' defaultValue={item.location} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Hình ảnh</label>
                                    <ImageBox ref={this.imageBox} postUrl='/admin/upload' uploadType='EventImage' userData='event' image={this.state.image} />
                                </div>
                                <div className='form-group row'>
                                    <label className='control-label col-3 col-sm-3'>Kích hoạt</label>
                                    <div className='col-8 col-sm-8 toggle'>
                                        <label>
                                            <input type='checkbox' checked={item.active} onChange={this.changeActive} /><span className='button-indecator' />
                                        </label>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Số lượng người đăng ký tối đa</label><br />
                                    <input className='form-control' id='evMaxRegisterUsers' type='number' placeholder='Số lượng người đăng ký tối đa' defaultValue={item.maxRegisterUsers} aria-describedby='evMaxRegisterUsersHelp' />
                                    <small className='form-text text-success' id='evMaxRegisterUsersHelp'>Điền -1 nếu không giới hạn số lượng người đăng ký tối đa.</small>
                                </div>
                                <div className='form-group row'>
                                    <label className='control-label col-12'>Số lượng người đăng ký tham gia: {item.numOfRegisterUsers}</label>
                                </div>
                                <div className='form-group row'>
                                    <label className='control-label col-12'>Lược xem: {item.view}</label>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Danh mục sự kiện</label>
                                    <select className='form-control' id='evEventCategories' multiple={true} defaultValue={[]}>
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
                                    <a href={linkDefaultEvent} style={{ fontWeight: 'bold' }} target='_blank'>{linkDefaultEvent}</a>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Link truyền thông</label><br />
                                    <a href='#' ref={this.eventLink} style={{ fontWeight: 'bold' }} target='_blank' />
                                    <input className='form-control' id='evEventLink' type='text' placeholder='Link truyền thông' defaultValue={item.link} onChange={this.eventLinkChange} />
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
                                    <label className='control-label'>Ngày bắt đầu đăng sự kiện</label>
                                    <input className='form-control' id='evEventStartPost' type='text' placeholder='Ngày bắt đầu đăng sự kiện' defaultValue={item.startPost} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Ngày kết thúc đăng sự kiện</label>
                                    <input className='form-control' id='evEventStopPost' type='text' placeholder='Ngày kết thúc đăng sự kiện' defaultValue={item.stopPost} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Ngày bắt đầu đăng ký tham gia sự kiện</label>
                                    <input className='form-control' id='evEventStartRegister' type='text' placeholder='Ngày bắt đầu đăng ký tham gia sự kiện' defaultValue={item.startRegister} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Ngày kết thúc đăng ký tham gia sự kiện</label>
                                    <input className='form-control' id='evEventStopRegister' type='text' placeholder='Ngày kết thúc đăng ký tham gia sự kiện' defaultValue={item.stopRegister} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Ngày bắt đầu sự kiện</label>
                                    <input className='form-control' id='evEventStartEvent' type='text' placeholder='Ngày bắt đầu sự kiện' defaultValue={item.startEvent} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Ngày kết thúc sự kiện</label>
                                    <input className='form-control' id='evEventStopEvent' type='text' placeholder='Ngày kết thúc sự kiện' defaultValue={item.stopEvent} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='tile'>
                            <h3 className='tile-title'>Tóm tắt sự kiện</h3>
                            <div className='tile-body'>
                                <textarea defaultValue='' id='evEventAbstract' style={{ border: 'solid 1px #eee', width: '100%', minHeight: '100px', padding: '0 3px' }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='tile'>
                            <h3 className='tile-title'>Nội dung sự kiện</h3>
                            <div className='tile-body'>
                                <Editor ref={this.editor} placeholder='Nội dung sự kiện' />
                            </div>
                        </div>
                    </div>
                </div>

                <Link to='/admin/event/list' className='btn btn-secondary btn-circle' style={{ position: 'fixed', bottom: '10px' }}>
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

const mapStateToProps = state => ({ event: state.event });
const mapActionsToProps = { updateEvent, getEvent, checkLink };
export default connect(mapStateToProps, mapActionsToProps)(EventEditPage);