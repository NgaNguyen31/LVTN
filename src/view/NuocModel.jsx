import React from 'react';

export default class NuocModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#MS_NUOC').focus());
        }, 250));
    }

    show(item) {
        const { _id, TEN_NUOC } = item ?
            item : { _id: null, TEN_NUOC: '' };
        $('#TEN_NUOC').val(TEN_NUOC);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            MS_NUOC: this.state.text.MS_NUOC,
            TEN_NUOC: this.state.text.TEN_NUOC,
        };
        if (this.state.text =='') {
            T.notify('Bạn phải điền giá trị!', 'danger');
            $('#NGHI').focus();
        } else if (!changes.MS_NUOC) {
            T.notify('Mã số nước đang trống!', 'danger');
            $('#MS_NUOC').focus();
        } else if (!changes.TEN_NUOC) {
            T.notify('Tên nước đang trống!', 'danger');
            $('#MS_NUOC').focus();
        } else if (this.state._id) {
            this.props.updateNuoc(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createNuoc(changes, data => {
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
                            <h5 className='modal-title'>Thông tin nước</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                        <div className='form-group'>
                                <label htmlFor='MS_NUOC'>Mã số nước</label>
                                <input className='form-control' id='Masonuoc' type='text' placeholder='Mã số nước' onChange={this.handleInput('text', 'MS_NUOC')} value={this.state.text.MS_NUOC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TEN_NUOC'>Tên nước</label>
                                <input className='form-control' id='Tennuoc' type='text' placeholder='Tên nước' onChange={this.handleInput('text', 'TEN_NUOC')} value={this.state.text.TEN_NUOC}/>
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