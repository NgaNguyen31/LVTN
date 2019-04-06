import React from 'react';

export default class ChauModal extends React.Component {
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
        const {MS_CHAU, TEN_CHAU } = this.state;
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin châu</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <label>Mã số châu: <b>{MS_CHAU}</b></label><br />
                            <label>Tên châu: <b>{TEN_CHAU}</b></label><br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}