import React from 'react';

export default class ContactModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
    }

    show(item) {
        this.setState(item);
        $(this.modal.current).modal('show');
    }

    render() {
        const { name, subject, email, message } = this.state;
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin liên hệ</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <label>Tên người dùng: <b>{name}</b></label><br />
                            <label>Subject: <b>{subject}</b></label><br />
                            <label>Email: <b>{email}</b></label><br />
                            <p>{message}</p>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}