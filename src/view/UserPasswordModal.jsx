import React from 'react';

export default class UserPasswordModal extends React.Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);

        this.modal = React.createRef();
        this.btnSave = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#userPassword1').focus());
        }, 250);
    }

    show(item) {
        $('#userPassword1').val('');
        $('#userPassword2').val('');
        $(this.btnSave.current).data('id', item._id);

        $(this.modal.current).modal('show');
    }

    save(event) {
        const _id = $(event.target).data('id'),
            password1 = $('#userPassword1').val().trim(),
            password2 = $('#userPassword2').val().trim();
        if (password1 == '') {
            T.notify('New password is empty!', 'danger');
            $('#userPassword1').focus();
        } else if (password2 == '') {
            T.notify('Please retype new password!', 'danger');
            $('#userPassword2').focus();
        } else if (password1 != password2) {
            T.notify('Two passwords do not match!', 'danger');
            $('#userPassword2').focus();
        } else {
            this.props.updateUser(_id, { password: password1 }, error => {
                if (error == undefined || error == null) {
                    $(this.modal.current).modal('hide');
                }
            });
        }
    }

    render() {
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <form className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Change password of user</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='userPassword1'>New password</label>
                                <input className='form-control' id='userPassword1' type='password' placeholder='New password' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='userPassword2'>Retype password</label>
                                <input className='form-control' id='userPassword2' type='password' placeholder='Retype password' />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                            <button type='submit' className='btn btn-primary' ref={this.btnSave} onClick={this.save}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}