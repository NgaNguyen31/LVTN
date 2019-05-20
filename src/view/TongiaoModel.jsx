import React from 'react';

export default class TongiaoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(type, field, args) {
        return e => {
            const state = this.state;
            switch (type) {
                case 'text':
                    state.text ? (state.text[field] = e.target.value)
                    : (state.text = {}) && (state.text[field] = e.target.value)
            }

            this.setState(state);
            e.preventDefault();
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#TON_GIAO').focus());
        }, 250));
    }

    show(item) {
        const { _id, TON_GIAO } = item ?
            item : { _id: null, TON_GIAO: '' };
        $('#TON_GIAO').val(TON_GIAO);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            TON_GIAO: this.state.text.TON_GIAO,
        };
        if (!changes.TON_GIAO) {
            T.notify('Tên tôn giáo đang trống!', 'danger');
            $('#TON_GIAO').focus();
        } else if (this.state._id) {
            this.props.updateTongiao(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createTongiao(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
    }

    render() {
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin tôn giáo</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='TON_GIAO'>Tên tôn giáo</label>
                                <input className='form-control' id='Tentongiao' type='text' placeholder='Tên tôn giáo' onChange={this.handleInput('text', 'TON_GIAO')} value={this.state.text.TON_GIAO}/>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Đóng</button>
                            <button type='button' className='btn btn-primary' ref={this.btnSave} onClick={this.save}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}