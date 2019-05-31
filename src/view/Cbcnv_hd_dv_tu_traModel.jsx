import React from 'react';
import Dropdown from './Dropdown.jsx';
import Cbcnv_hd_dv_tu_traPage from './Cbcnv_hd_dv_tu_traPage.jsx';

export default class Cbcnv_hd_dv_tu_traModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', trinhdo: []}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.trinhdo = React.createRef();
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
            $(this.modal.current).on('shown.bs.modal', () => $('#MSNV').focus());
        }, 250));
    }

    show(item, trinhdo ) {      
        const { _id, MSNV, HO, TEN, NGAY_SINH, NOI_SINH, NGAY_VAO, NGAY_NGHI, TRINH_DO, DON_VI, DIA_CHI, GHI_CHU } = item ?
            item : { _id: null, MSNV: '', HO: '', TEN: '', NGAY_SINH: '', NOI_SINH:'', NGAY_VAO: '', NGAY_NGHI: '', TRINH_DO: '', DON_VI: '', DIA_CHI: '', GHI_CHU: '' };
        $('#MSNV').val(MSNV);
        $('#HO').val(HO);
        $('#TEN').val(TEN);
        $('#NGAY_SINH').val(NGAY_SINH);
        $('#NOI_SINH').val(NOI_SINH);
        $('#NGAY_VAO').val(NGAY_VAO);
        $('#NGAY_NGHI').val(NGAY_NGHI);
        $('#TRINH_DO').val(TRINH_DO);
        $('#DON_VI').val(DON_VI);
        $('#DIA_CHI').val(DIA_CHI);
        $('#GHI_CHU').val(GHI_CHU);
        
        this.setState({ _id, trinhdo: trinhdo? trinhdo: []});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const trinhdo = this.trinhdo.current.getSelectedItem(),
            TRINH_DO = trinhdo? trinhdo._id : null,
            changes = {
                MSNV: this.state.text.MSNV,
                HO: this.state.text.HO,
                TEN: this.state.text.TEN,
                NGAY_SINH: this.state.text.NGAY_SINH,                
                NOI_SINH: this.state.text.NOI_SINH,
                NGAY_VAO: this.state.text.NGAY_VAO,
                NGAY_NGHI: this.state.text.NGAY_NGHI,                
                TRINH_DO,
                DON_VI: this.state.text.DON_VI,
                DIA_CHI: this.state.text.DIA_CHI,
                GHI_CHU: this.state.text.GHI_CHU,
        };
        if (this.state.text == '') {
            T.notify('Bạn chưa điền thông tin!', 'danger');
            $('#MSNV').focus();
        } else if (changes.MSNV == '') {
            T.notify('MSNV đang trống!', 'danger');
            $('#MSNV').focus(); 
        } else if (changes.HO == '') {
            T.notify('Họ đang trống!', 'danger');
            $('#HO').focus();  
        } else if (changes.TEN == '') {
            T.notify('Tên đang trống!', 'danger');
            $('#TEN').focus();             
        } else if (changes.NGAY_SINH == '') {
            T.notify('Ngày sinh đang trống!', 'danger');
            $('#NGAY_SINH').focus();  
        } else if (changes.DON_VI == '') {
            T.notify('Đơn vị đang trống!', 'danger');
            $('#DON_VI').focus();            
        } else if (changes.TRINH_DO == '') {
            T.notify('Trình độ đang trống!', 'danger');
            $('#TRINH_DO').focus();            
        } else if (this.state._id) {
            this.props.updateCbcnv_hd_dv_tu_tra(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createCbcnv_hd_dv_tu_tra(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
    }

    render() {                
        const trinhdo = this.state && this.state.trinhdo && this.state.trinhdo.trinhdo ? this.state.trinhdo.trinhdo : [];

        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin CBCNV hợp đồng đơn vị tự trả</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='MSNV'>MSNV</label>
                                <input className='form-control' id='MSNV' type='number' onChange={this.handleInput('text', 'MSNV')} value={this.state.text.MSNV}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HO'>Họ</label>
                                <input className='form-control' id='HO' type='text' onChange={this.handleInput('text', 'HO')} value={this.state.text.HO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TEN'>Tên </label>
                                <input className='form-control' id='TEN' type='text' onChange={this.handleInput('text', 'TEN')} value={this.state.text.TEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_SINH'>Ngày sinh</label>
                                <input className='form-control' id='NGAY_SINH' type='date' placeholder='' onChange={this.handleInput('text', 'NGAY_SINH')} value={this.state.text.NGAY_SINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="NOI_SINH">Nơi sinh</label>
                                <input className='form-control' id='NOI_SINH' type='text' placeholder='' onChange={this.handleInput('text', 'NOI_SINH')} value={this.state.text.NOI_SINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="NGAY_VAO">Ngày vào</label>
                                <input className='form-control' id='NGAY_VAO' type='date' placeholder='' onChange={this.handleInput('text', 'NGAY_VAO')} value={this.state.text.NGAY_VAO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="NGAY_NGHI">Ngày nghỉ</label>
                                <input className='form-control' id='NGAY_NGHI' type='date' placeholder='' onChange={this.handleInput('text', 'NGAY_NGHI')} value={this.state.text.NGAY_NGHI}/>
                            </div>                            
                            <div className='form-group'>
                                <label htmlFor='TRINH_DO'>Trình độ</label>
                                <Dropdown ref={this.trinhdo} number='' items={trinhdo.map(e => Object.assign({}, e, {text: e.Ten_day_du}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="DON_VI">Đơn vị</label>
                                <input className='form-control' id='DON_VI' type='text' placeholder='' onChange={this.handleInput('text', 'DON_VI')} value={this.state.text.DON_VI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DIA_CHI'>Địa chỉ</label>
                                <input className='form-control' id='DIA_CHI' type='text' onChange={this.handleInput('text', 'DIA_CHI')} value={this.state.text.DIA_CHI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU'>Ghi chú </label>
                                <input className='form-control' id='GHI_CHU' type='text' onChange={this.handleInput('text', 'GHI_CHU')} value={this.state.text.GHI_CHU}/>
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