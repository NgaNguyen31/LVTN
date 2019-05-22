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
            $(this.modal.current).on('shown.bs.modal', () => $('#TEN_KHOA').focus());
        }, 250));
    }

    show(item) {
        const { _id, TEN_KHOA, TEN_TIENG_ANH, TEN_KHOA_TAT } = item ?
            item : { _id: null, TEN_KHOA: '', TEN_TIENG_ANH: '', TEN_KHOA_TAT: '' };
        $('#TEN_KHOA').val(TEN_KHOA);
        $('#TEN_TIENG_ANH').val(TEN_TIENG_ANH);
        $('#TEN_KHOA_TAT').val(TEN_KHOA_TAT);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            TEN_KHOA: this.state.text.TEN_KHOA,
            TEN_TIENG_ANH: this.state.text.TEN_TIENG_ANH,
            TEN_KHOA_TAT: this.state.text.TEN_KHOA_TAT,
        };
        if (this.state.text == '')  {
            T.notify('Bạn phải điền dữ liệu!', 'danger');
            $('#TEN_KHOA').focus();
        } else if (changes.TEN_KHOA == '') {
            T.notify('Tên khoa đang trống!', 'danger');
            $('#TEN_KHOA').focus();
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
                                <input className='form-control' id='Tenkhoa' type='text' placeholder='Tên khoa' onChange={this.handleInput('text', 'TEN_KHOA')} value={this.state.text.TEN_KHOA}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenkhoa'>Tên tiếng anh</label>
                                <input className='form-control' id='Tentienganh' type='text' placeholder='Tên tiếng anh' onChange={this.handleInput('text', 'TEN_TIENG_ANH')} value={this.state.text.TEN_TIENG_ANH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenkhoa'>Tên khoa tắt</label>
                                <input className='form-control' id='Tenkhoatat' type='text' placeholder='Tên khoa tắt' onChange={this.handleInput('text', 'TEN_KHOA_TAT')} value={this.state.text.TEN_KHOA_TAT}/>
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