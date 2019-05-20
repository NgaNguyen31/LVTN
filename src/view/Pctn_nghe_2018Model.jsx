import React from 'react';

export default class Pctn_nghe_2018Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: ''}
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
                case 'date' :
                    state.date ? (state.date[field] = e.target.value)
                    : (state.date = {}) && (state.date[field] = e.target.value)
            }

            this.setState(state);
            e.preventDefault();
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#SHCC').focus());
        }, 250));
    }

    show(item) {
        const { _id, SHCC , HO, TEN, NGAY_SINH, MS_CDNN, NGAY_PCTN_OLD, PT_PCTN_OLD, NGAY_PCTN_NEW, PT_PCTN_NEW, DON_VI } = item ?
            item : { _id: null, SHCC: '', HO: '', TEN: '', NGAY_SINH: '', MS_CDNN, NGAY_PCTN_OLD: '', PT_PCTN_OLD: '', NGAY_PCTN_NEW: '', PT_PCTN_NEW: '', DON_VI: '' };
        $('#SHCC').val(SHCC);
        $('#HO').val(HO);
        $('#TEN').val(TEN);
        $('#NGAY_SINH').val(NGAY_SINH);
        $('#MS_CDNN').val(MS_CDNN);
        $('#NGAY_PCTN_OLD').val(NGAY_PCTN_OLD);
        $('#PT_PCTN_OLD').val(PT_PCTN_OLD);
        $('#NGAY_PCTN_NEW').val(NGAY_PCTN_NEW);
        $('#PT_PCTN_NEW').val(PT_PCTN_NEW);
        $('#DON_VI').val(DON_VI);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            SHCC: this.state.number.SHCC,
            HO: this.state.text.HO,
            TEN: this.state.text.TEN,
            NGAY_SINH: this.state.date.NGAY_SINH,
            MS_CDNN: this.state.text.MS_CDNN,
            NGAY_PCTN_OLD: this.state.date.NGAY_PCTN_OLD,
            PT_PCTN_OLD: this.state.number.PT_PCTN_OLD,
            NGAY_PCTN_NEW: this.state.date.NGAY_PCTN_NEW,
            PT_PCTN_NEW: this.state.number.PT_PCTN_NEW,
            DON_VI: this.state.text.DON_VI,
        };
        
        if (this.state.text == '')  {
            T.notify('Bạn phải điền dữ liệu!', 'danger');
            $('#TEN_KHOA').focus();
        } else if (!changes.SHCC) {
            T.notify('SHCC đang trống!', 'danger');
            $('#SHCC').focus();
        } else if (!changes.HO) {
            T.notify('Họ đang trống!', 'danger');
            $('#HO').focus();
        } else if (!changes.TEN ) {
            T.notify('TEN đang trống!', 'danger');
            $('#TEN').focus();
        } else if (!changes.NGAY_SINH) {
            T.notify('Ngày sinh đang trống!', 'danger');
            $('#NGAY_SINH').focus();
        } else if (!changes.MS_CDNN ) {
            T.notify('MS CDNN đang trống!', 'danger');
            $('#MS_CDNN').focus();
        } else if (!changes.NGAY_PCTN_OLD) {
            T.notify('Ngày PCTN cũ đang trống!', 'danger');
            $('#NGAY_PCTN_OLD').focus();
        } else if (!changes.PT_PCTN_OLD) {
            T.notify('Phần trăm PCTN cũ đang trống!', 'danger');
            $('#PT_PCTN_OLD').focus();
        } else if (!changes.NGAY_PCTN_NEW) {
            T.notify('Ngày PCTN mới đang trống!', 'danger');
            $('#NGAY_PCTN_NEW').focus();
        } else if (!changes.PT_PCTN_NEW) {
            T.notify('Phần trăm PCTN mới đang trống!', 'danger');
            $('#PT_PCTN_NEW').focus();
        } else if (!changes.DON_VI) {
            T.notify('Đơn vị đang trống!', 'danger');
            $('#DON_VI').focus();
        } else if (this.state._id) {
            this.props.updatePctn_nghe_2018(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createPctn_nghe_2018(changes, data => {
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
                            <h5 className='modal-title'>PCTN nghe 2018</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>SHCC</label>
                                <input className='form-control' id='SHCC' type='number' placeholder='SHCC' onChange={this.handleInput('number', 'SHCC')} value={this.state.number.SHCC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='diengiai'>Họ</label>
                                <input className='form-control' id='ho' type='text' placeholder='Họ' onChange={this.handleInput('text', 'HO')} value={this.state.text.HO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>Tên</label>
                                <input className='form-control' id='ten' type='text' placeholder='Tên' onChange={this.handleInput('text', 'TEN')} value={this.state.text.TEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>Ngày sinh</label>
                                <input className='form-control' id='ngaysinh' type='date' placeholder='Ngày sinh' onChange={this.handleInput('date', 'NGAY_SINH')} value={this.state.date.NGAY_SINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>MS CDNN</label>
                                <input className='form-control' id='MS_CDNN' type='text' placeholder='MS CDNN' onChange={this.handleInput('text', 'MS_CDNN')} value={this.state.text.MS_CDNN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>Ngày PCTN cũ</label>
                                <input className='form-control' id='NGAY_PCTN_OLD' type='date' placeholder='Ngày PCTN cũ' onChange={this.handleInput('date', 'NGAY_PCTN_OLD')} value={this.state.date.NGAY_PCTN_OLD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>PT PCTN cũ</label>
                                <input className='form-control' id='PT_PCTN_OLD' type='number' placeholder='PT PCTN cũ' onChange={this.handleInput('number', 'PT_PCTN_OLD')} value={this.state.number.PT_PCTN_OLD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>Ngày PCTN mới</label>
                                <input className='form-control' id='NGAY_PCTN_NEW' type='date' placeholder='Ngày PCTN mới' onChange={this.handleInput('date', 'NGAY_PCTN_NEW')} value={this.state.date.NGAY_PCTN_NEW}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>PT PCTN mới</label>
                                <input className='form-control' id='PT_PCTN_NEW' type='number' placeholder='PT PCTN mới' onChange={this.handleInput('number', 'PT_PCTN_NEW')} value={this.state.number.PT_PCTN_NEW}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>Đơn vị</label>
                                <input className='form-control' id='DON_VI' type='text' placeholder='Đơn vị' onChange={this.handleInput('text', 'DON_VI')} value={this.state.text.DON_VI}/>
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