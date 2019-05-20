import React from 'react';
import ImageBox from './ImageBox.jsx';
import Dropdown from './Dropdown.jsx';

export default class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);

        this.modal = React.createRef();
        this.role = React.createRef();
        this.imageBox = React.createRef();
        this.btnSave = React.createRef();
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#userFirstname').focus());
        }, 250));
    }

    show(item) {
        const { _id, firstname, lastname, email, phoneNumber, role, active, image } = item ?
            item : { _id: null, firstname: '', lastname: '', email: '', phoneNumber: '', role: 'admin', active: false, image: '' };
        $('#userFirstname').val(firstname);
        $('#userLastname').val(lastname);
        $('#userEmail').val(email);
        $('#userPhoneNumber').val(phoneNumber);
        $('#userActive').prop('checked', true);
        this.role.current.setText(role);

        this.setState({ _id, image });
        this.imageBox.current.setData('admin:' + (_id ? _id : 'new'));

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const role = this.role.current.getSelectedItem().toLowerCase(),
            changes = {
                firstname: $('#userFirstname').val().trim(),
                lastname: $('#userLastname').val().trim(),
                email: $('#userEmail').val().trim(),
                phoneNumber: $('#userPhoneNumber').val().trim(),
                active: $('#userActive').prop('checked'),
            };
        if (T.roles.indexOf(role) != -1) {
            changes.role = role;
        }
        if (changes.firstname == '') {
            T.notify('Firstname is empty!', 'danger');
            $('#userFirstname').focus();
        } else if (changes.lastname == '') {
            T.notify('Lastname is empty!', 'danger');
            $('#userLastname').focus();
        } else if (changes.email == '') {
            T.notify('Email is empty!', 'danger');
            $('#userEmail').focus();
        } else if (this.state._id) {
            this.props.updateUser(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createUser(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
    }

    render() {
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <form className='modal-dialog modal-lg' role='document' onSubmit={this.save}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin người dùng</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='userFirstname'>Tên</label>
                                <input className='form-control' id='userFirstname' type='text' placeholder='Tên' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='userLastname'>Họ và tên đệm</label>
                                <input className='form-control' id='userLastname' type='text' placeholder='Họ và tên đệm' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='userEmail'>Email</label>
                                <input className='form-control' id='userEmail' type='email' placeholder='Email' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='userPhoneNumber'>Số điện thoại</label>
                                <input className='form-control' id='userPhoneNumber' type='text' placeholder='Số điện thoại' />
                            </div>
                            <div className='row'>
                                <div className='col-md-6 col-12' style={{ display: 'inline-flex' }}>
                                    <label>Vai trò: </label>&nbsp;&nbsp;
                                    <Dropdown ref={this.role} text='' items={T.roles} />
                                </div>
                                <div className='col-md-6 col-12' style={{ display: 'inline-flex' }}>
                                    <label htmlFor='userActive'>Active: </label>&nbsp;&nbsp;
                                    <div className='toggle'>
                                        <label>
                                            <input type='checkbox' id='userActive' onChange={() => { }} /><span className='button-indecator' />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group' style={{ display: this.state._id ? 'block' : 'none' }}>
                                <label>Avatar</label>
                                <ImageBox ref={this.imageBox} postUrl='/admin/upload' uploadType='UserImage' userData='user' image={this.state.image} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Đóng</button>
                            <button type='button' className='btn btn-primary' ref={this.btnSave} onClick={this.save}>Lưu</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}