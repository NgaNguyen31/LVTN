import React from 'react';

export default class TinhModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#TEN_TINH').focus());
        }, 250));
    }

    show(item) {
        const { _id, TEN_TINH, MS_VUNG} = item ?
            item : { _id: null, TEN_TINH: '', MS_VUNG: '' };
        $('#TEN_TINH').val(TEN_TINH);
        $('#MS_VUNG').val(MS_VUNG);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            TEN_TINH: this.state.text.TEN_TINH,
            MS_VUNG: this.state.text.MS_VUNG,
        };
        if (this.state.text == '')  {
            T.notify('Bạn phải điền dữ liệu!', 'danger');
            $('#TEN_Tinh').focus();
        } else if (changes.TEN_TINH == '') {
            T.notify('Tên tỉnh đang trống!', 'danger');
            $('#TEN_TINH').focus();
        } else if (changes.MS_VUNG == '') {
            T.notify('Mã số vùng đang trống!', 'danger');
            $('#MS_VUNG').focus();
        } else if (changes.MS_VUNG < 0) {
            T.notify('MS vùng không được là số âm', 'danger');
            $('#MS_VUNG').focus();
        } else if (this.state._id) {
            this.props.updateTinh(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createTinh(changes, data => {
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
                            <h5 className='modal-title'>Thông tin Tinh</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='tenTinh'>Tên Tinh</label>
                                <input className='form-control' id='TenTinh' type='text' placeholder='Tên Tinh' onChange={this.handleInput('text', 'TEN_TINH')} value={this.state.text.TEN_TINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenTinh'>Mã số vùng</label>
                                <input className='form-control' id='MS_VUNG' type='number' placeholder='Mã số vùng' onChange={this.handleInput('text', 'MS_VUNG')} value={this.state.text.MS_VUNG}/>
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