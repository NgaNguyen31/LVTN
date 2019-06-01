import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_nngoaiPage from './Qt_nngoaiPage.jsx';

export default class Qt_nngoaiModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', cbcnv: [], mucdich: [], nuocngoai: [], nopcc: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.mucdich = React.createRef();
        this.nuocngoai = React.createRef();
        this.nopcc = React.createRef();
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
                case 'date':
                    state.date ? (state.date[field] = e.target.value) 
                    : (state.date = {}) && (state.date[field] = e.target.value)

            }

            this.setState(state);
            e.preventDefault();
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#MS_NV').focus());
        }, 250));
    }

    show(item, cbcnv, mucdich, nuocngoai) {      
        
        const { _id, MS_NV, HO, TEN, SO_QUYET_DINH, NGAY_QDINH,
            DON_VI, NGAY_DI, NGAY_VE, NGAY_VE_THUC, SO_QD_TIEP_NHAN,
            NGAY_QD_TIEP_NHAN, MUC_DICH, NOI_DUNG, NGANH_HOC, GIA_HAN,
            NUOC_DEN, NOI_DEN, CHI_PHI, GHI_CHU, HOAN_TRA_KP_BHXH,
            NGAY_NHAP, BHXH} = item ?
            item : { _id: null, MS_NV: '', HO: '', TEN: '', SO_QUYET_DINH: '',
            NGAY_QDINH: '', DON_VI: '', NGAY_DI: '', NGAY_VE: '', 
            NGAY_VE_THUC: '', SO_QD_TIEP_NHAN: '', NGAY_QD_TIEP_NHAN: '', 
            MUC_DICH: '', NOI_DUNG: '', NGANH_HOC: '', GIA_HAN: '', NUOC_DEN: '',
            NOI_DEN: '', CHI_PHI: '', GHI_CHU: '', HOAN_TRA_KP_BHXH: '', NGAY_NHAP: '', BHXH: ''};
        $('#MS_NV').val(MS_NV);
        $('#HO').val(HO);
        $('#TEN').val(TEN);
        $('#SO_QUYET_DINH').val(SO_QUYET_DINH);
        $('#NGAY_QDINH').val(NGAY_QDINH);
        $('#DON_VI').val(DON_VI);
        $('#NGAY_DI').val(NGAY_DI);
        $('#NGAY_VE').val(NGAY_VE);
        $('#NGAY_VE_THUC').val(NGAY_VE_THUC);
        $('#SO_QD_TIEP_NHAN').val(SO_QD_TIEP_NHAN);
        $('#NGAY_QD_TIEP_NHAN').val(NGAY_QD_TIEP_NHAN);
        $('#MUC_DICH').val(MUC_DICH);
        $('#NOI_DUNG').val(NOI_DUNG);
        $('#NGANH_HOC').val(NGANH_HOC);
        $('#GIA_HAN').val(GIA_HAN);
        $('#NUOC_DEN').val(NUOC_DEN);
        $('#NOI_DEN').val(NOI_DEN);
        $('#CHI_PHI').val(CHI_PHI);
        $('#GHI_CHU').val(GHI_CHU);
        $('#HOAN_TRA_KP_BHXH').val(HOAN_TRA_KP_BHXH);
        $('#NGAY_NHAP').val(NGAY_NHAP);
        $('#BHXH').val(BHXH);

        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], 
            mucdich: mucdich? mucdich:[], nuocngoai: nuocngoai? nuocngoai: []});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const cbcnv = this.cbcnv.current.getSelectedItem(),  
        mucdich = this.mucdich.current.getSelectedItem(),   
        nuocngoai = this.nuocngoai.current.getSelectedItem(),    
        nopcc = this.nopcc.current.getSelectedItem(),
            MS_NV = cbcnv? cbcnv : [],
            MUC_DICH = mucdich? mucdich:[],
            NUOC_DEN = nuocngoai? nuocngoai: [],
            GIA_HAN = nopcc? nopcc :[],
             changes = {
                MS_NV,
                HO: this.state.text.HO,
                TEN: this.state.text.TEN,
                SO_QUYET_DINH: this.state.text.SO_QUYET_DINH,
                NGAY_QDINH: this.state.date.NGAY_QDINH,
                DON_VI: this.state.text.DON_VI, 
                NGAY_DI: this.state.date.NGAY_DI,
                NGAY_VE: this.state.date.NGAY_VE,
                NGAY_VE_THUC: this.state.date.NGAY_VE_THUC,
                SO_QD_TIEP_NHAN: this.state.text.SO_QD_TIEP_NHAN,
                NGAY_QD_TIEP_NHAN: this.state.date.NGAY_QD_TIEP_NHAN,
                MUC_DICH,
                NOI_DUNG: this.state.text.NOI_DUNG,
                NGANH_HOC: this.state.text.NGANH_HOC,
                GIA_HAN,
                NUOC_DEN,
                NOI_DEN: this.state.text.NOI_DEN, 
                CHI_PHI: this.state.text.CHI_PHI, 
                GHI_CHU: this.state.text.GHI_CHU, 
                HOAN_TRA_KP_BHXH: this.state.text.HOAN_TRA_KP_BHXH, 
                NGAY_NHAP: this.state.date.NGAY_NHAP,
                BHXH: this.state.text.BHXH, 
            };    
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.HO == '') {
            T.notify('Họ đang trống!', 'danger');
            $('#HO').focus();
        } else if (changes.TEN == '') {
            T.notify('Tên đang trống!', 'danger');
            $('#TEN').focus();
        } else if (changes.DON_VI == '') {
            T.notify('Đơn vị đang trống!', 'danger');
            $('#DON_VI').focus();
        } else if (changes.NGAY_DI == '') {
            T.notify('Ngày đi đang trống!', 'danger');
            $('#NGAY_DI').focus();
        } else if (changes.NGAY_VE_THUC == '') {
            T.notify('Ngày về thực đang trống!', 'danger');
            $('#NGAY_VE_THUC').focus();
        } else if (changes.MUC_DICH == '') {
            T.notify('Mục đích đang trống!', 'danger');
            $('#MUC_DICH').focus();
        } else if (changes.NGANH_HOC == '') {
            T.notify('Ngành học đang trống!', 'danger');
            $('#NGANH_HOC').focus();
        } else if (changes.NUOC_DEN == '') {
            T.notify('Nước đến đang trống!', 'danger');
            $('#NUOC_DEN').focus();
        } else if (changes.GIA_HAN == '') {
            T.notify('Gia hạn đang trống!', 'danger');
            $('#GIA_HAN').focus();
        } else if (changes.NOI_DEN == '') {
            T.notify('Nơi đến đang trống!', 'danger');
            $('#NOI_DEN').focus();
        } else if (changes.CHI_PHI == '') {
            T.notify('Chi phí đang trống!', 'danger');
            $('#CHI_PHI').focus();
        } else if (this.state._id) {
            this.props.updateQt_nngoai(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_nngoai(changes, data => {                    
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv?this.state.cbcnv.cbcnv : [];
        const mucdich = this. state && this.state.mucdich && this.state.mucdich.mucdich? this.state.mucdich.mucdich : [];
        const nuocngoai = this.state && this.state.nuocngoai && this.state.nuocngoai.nuocngoai? this.state.nuocngoai.nuocngoai : [];
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin quản trị nước ngoài</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>                                                       
                            <div className='form-group'>
                                <label htmlFor='MS_NV'>MSNV</label>
                                <Dropdown ref={this.cbcnv} text='' items={cbcnv.map(e => Object.assign({}, e, {text: e.MS_NV}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HO'>Họ</label>
                                <input className='form-control' id='HO' type='text' placeholder='' onChange={this.handleInput('text', 'HO')} value={this.state.text.HO}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='TEN'>Tên</label>
                                <input className='form-control' id='TEN' type='text' placeholder='' onChange={this.handleInput('text', 'TEN')} value={this.state.text.TEN}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='SO_QUYET_DINH'>Số QĐ</label>
                                <input className='form-control' id='SO_QUYET_DINH' type='text' placeholder='' onChange={this.handleInput('text', 'SO_QUYET_DINH')} value={this.state.text.SO_QUYET_DINH}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGAY_QDINH'>Ngày QĐ</label>
                                <input className='form-control' id='NGAY_QDINH' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_QDINH')} value={this.state.date.NGAY_QDINH}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='DON_VI'>Đơn vị</label>
                                <input className='form-control' id='DON_VI' type='text' placeholder='' onChange={this.handleInput('text', 'DON_VI')} value={this.state.text.DON_VI}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGAY_DI'>Ngày đi</label>
                                <input className='form-control' id='NGAY_DI' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_DI')} value={this.state.date.NGAY_DI}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGAY_VE'>Ngày về</label>
                                <input className='form-control' id='NGAY_VE' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_VE')} value={this.state.date.NGAY_VE}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGAY_VE_THUC'>Ngày về thực</label>
                                <input className='form-control' id='NGAY_VE_THUC' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_VE_THUC')} value={this.state.date.NGAY_VE_THUC}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='SO_QD_TIEP_NHAN'>Số QĐ tiếp nhận</label>
                                <input className='form-control' id='SO_QD_TIEP_NHAN' type='text' placeholder='' onChange={this.handleInput('text', 'SO_QD_TIEP_NHAN')} value={this.state.text.SO_QD_TIEP_NHAN}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGAY_QD_TIEP_NHAN'>Ngày QĐ tiếp nhận</label>
                                <input className='form-control' id='NGAY_QD_TIEP_NHAN' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_QD_TIEP_NHAN')} value={this.state.date.NGAY_QD_TIEP_NHAN}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='MUC_DICH'>Mục đích</label>
                                <Dropdown ref={this.mucdich} text='' items={mucdich.map(e => Object.assign({}, e, {text: e.MUC_DICH}))} />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NOI_DUNG'>Nội dung</label>
                                <input className='form-control' id='NOI_DUNG' type='text' placeholder='' onChange={this.handleInput('text', 'NOI_DUNG')} value={this.state.text.NOI_DUNG}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGANH_HOC'>Ngành học</label>
                                <input className='form-control' id='NGANH_HOC' type='text' placeholder='' onChange={this.handleInput('text', 'NGANH_HOC')} value={this.state.text.NGANH_HOC}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='GIA_HAN'>Gia hạn</label>
                                <Dropdown ref={this.nopcc} text='' items={T.nopccs} />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NUOC_DEN'>Nước đến</label>
                                <Dropdown ref={this.nuocngoai} text='' items={nuocngoai.map(e => Object.assign({}, e, {text: e.TEN_NUOC}))} />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NOI_DEN'>Nơi đến</label>
                                <input className='form-control' id='NOI_DEN' type='text' placeholder='' onChange={this.handleInput('text', 'NOI_DEN')} value={this.state.text.NOI_DEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHI_PHI'>Chi phí</label>
                                <input className='form-control' id='CHI_PHI' type='text' placeholder='' onChange={this.handleInput('text', 'CHI_PHI')} value={this.state.text.CHI_PHI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU'>Ghi chú</label>
                                <input className='form-control' id='GHI_CHU' type='text' placeholder='' onChange={this.handleInput('text', 'GHI_CHU')} value={this.state.text.GHI_CHU}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='HOAN_TRA_KP_BHXH'>Hoàn trả KP BHXH</label>
                                <input className='form-control' id='HOAN_TRA_KP_BHXH' type='text' placeholder='' onChange={this.handleInput('text', 'HOAN_TRA_KP_BHXH')} value={this.state.text.HOAN_TRA_KP_BHXH}/>
                            </div>      
                            <div className='form-group'>
                                <label htmlFor='NGAY_NHAP'>Ngày nhập</label>
                                <input className='form-control' id='NGAY_NHAP' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_NHAP')} value={this.state.date.NGAY_NHAP}/>
                            </div>     
                            <div className='form-group'>
                                <label htmlFor='BHXH'>BHXH</label>
                                <input className='form-control' id='BHXH' type='text' placeholder='' onChange={this.handleInput('text', 'BHXH')} value={this.state.text.BHXH}/>
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