import React from 'react';

export default class ChucvuModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: ''}
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
                case 'number':
                    state.number ? (state.number[field] = e.target.value) 
                    : (state.number = {}) && (state.number[field] = e.target.value)
            }

            this.setState(state);
            e.preventDefault();
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#CHUC_VU').focus());
        }, 250));
    }

    show(item) {
        const { _id, CHUC_VU, PC_CVU, Ghi_chu } = item ?
            item : { _id: null, CHUC_VU: '', PC_CVU: '', Ghi_chu: '' };
        $('#CHUC_VU').val(CHUC_VU);
        $('#PC_CVU').val(PC_CVU);
        $('#Ghi_chu').val(Ghi_chu);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {        
        const changes = {
            CHUC_VU: this.state.text.CHUC_VU,
            PC_CVU: this.state.number.PC_CVU,
            Ghi_chu: this.state.text.Ghi_chu,
        };
        if (this.state.text == "") {
            T.notify('Bạn phải điền giá trị!', 'danger');
            $('#CHUC_VU').focus();
        } else if (changes.PC_CVU == '') {
            T.notify('Phân cấp chức vụ đang trống!', 'danger');
            $('#PC_CVU').focus();
        } else if (changes.CHUC_VU == '') {
            T.notify('Chức vụ đang trống!', 'danger');
            $('#CHUC_VU').focus();
        } else if (changes.PC_CVU < 0) {
            T.notify('Phân cấp chức vụ không được là số âm', 'danger');
            $('#PC_CVU').focus();
        } else if (this.state._id) {
            this.props.updateChucvu(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createChucvu(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin chức vụ</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='chucvu'>Chức vụ</label>
                                <input className='form-control' id='chucvu' type='text' placeholder='Chức vụ' onChange={this.handleInput('text', 'CHUC_VU')} value={this.state.text.CHUC_VU}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PC_CVU'>Phân cấp chức vụ</label>
                                <input className='form-control' id='PC_CVU' type='number' placeholder='Phân cấp chức vụ' onChange={this.handleInput('number', 'PC_CVU')} value={this.state.number.PC_CVU}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Ghi_chu'>Ghi chú</label>
                                <input className='form-control' id='Ghi_chu' type='text' placeholder='Ghi chú' onChange={this.handleInput('text', 'Ghi_chu')} value={this.state.text.Ghi_chu}/>
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