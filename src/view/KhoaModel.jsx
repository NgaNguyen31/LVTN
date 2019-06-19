import React from 'react';

export default class KhoaModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#ten_khoa').focus());
        }, 250));
    }

    show(item) {
        const { _id, ten_khoa, ten_tieng_anh, ten_khoa_tat } = item ?
            item : { _id: null, ten_khoa: null, ten_tieng_anh: null, ten_khoa_tat: null };
        $('#ten_khoa').val(ten_khoa);
        $('#ten_tieng_anh').val(ten_tieng_anh);
        $('#ten_khoa_tat').val(ten_khoa_tat);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            ten_khoa: this.state.text.ten_khoa,
            ten_tieng_anh: this.state.text.ten_tieng_anh,
            ten_khoa_tat: this.state.text.ten_khoa_tat,
        };
        if (changes.ten_khoa == null) {
            T.notify('Tên khoa đang trống!', 'danger');
            $('#ten_khoa').focus();
        } else if (changes.ten_tieng_anh == null) {
            T.notify('Tên tiếng anh đang trống!', 'danger');
            $('#ten_tieng_anh').focus();
        } else if (changes.ten_khoa_tat == null) {
            T.notify('Tên khoa tắt đang trống!', 'danger');
            $('#ten_khoa_tat').focus();
        } else if (this.state._id) {
            this.props.updateKhoa(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createKhoa(changes, data => {
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
                            <h5 className='modal-title'>Thông tin khoa</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='tenkhoa'>Tên khoa</label>
                                <input className='form-control' id='ten_khoa' type='text' onChange={this.handleInput('text', 'ten_khoa')} value={this.state.text.ten_khoa}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenkhoa'>Tên tiếng anh</label>
                                <input className='form-control' id='ten_tieng_anh' type='text' onChange={this.handleInput('text', 'ten_tieng_anh')} value={this.state.text.ten_tieng_anh}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenkhoa'>Tên khoa tắt</label>
                                <input className='form-control' id='ten_khoa_tat' type='text' onChange={this.handleInput('text', 'ten_khoa_tat')} value={this.state.text.ten_khoa_tat}/>
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