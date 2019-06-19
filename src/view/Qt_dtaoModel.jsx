import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_dtaoPage from './Qt_dtaoPage.jsx';
import Select from 'react-select';

export default class Qt_dtaoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', cbcnv: [], nopcc: [], selectedcbcnv: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.nopcc = React.createRef();
        this.selectedcbcnv = React.createRef();
    }

    handleInput(type, field, args) {
        return e => {
            const state = this.state;
            switch (type) {
                case 'text':
                    state.text ? (state.text[field] = e.target.value)
                    : (state.text = {}) && (state.text[field] = e.target.value);
                    e.preventDefault();
                    break;
                case 'number':
                    state.number ? (state.number[field] = e.target.value) 
                    : (state.number = {}) && (state.number[field] = e.target.value);
                    e.preventDefault();
                    break;
                case 'date':
                    state.date ? (state.date[field] = e.target.value)
                    : (state.date = {}) && (state.date[field] = e.target.value);
                    e.preventDefault();
                    break;      
                case 'cbcnv':
                    state.selectedcbcnv = e;
                    break; 
            }

            this.setState(state);
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#MS_NV').focus());
        }, 250));
    }

    show(item, cbcnv) {      
        
        const { _id, MS_NV, STT, TU_NAM, DEN_NAM, cap_dt, CHUYEN_NGANH, NOI_DT, QUOC_GIA, HINH_THUC, LOAI_TN, NAM ,CO_NOP_BANG, GHI_CHU} = item ?
            item : { _id: null, MS_NV: null, STT: null, TU_THANG: null, TU_NAM: null, DEN_THANG: null, DEN_NAM: null, cap_dt: null, CHUYEN_NGANH: null, NOI_DT: null, QUOC_GIA: null, HINH_THUC: null, LOAI_TN: null, NAM: null, CO_NOP_BANG: null, GHI_CHU: null};
        $('#MS_NV').val(MS_NV);
        // $('#STT').val(STT);
        // $('#TU_THANG').val(TU_THANG);
        $('#TU_NAM').val(T.dateToText(TU_NAM,'yyyy-mm-dd'));
        // $('#DEN_THANG').val(DEN_THANG);
        $('#DEN_NAM').val(T.dateToText(DEN_NAM,'yyyy-mm-dd'));
        $('#cap_dt').val(cap_dt);
        $('#CHUYEN_NGANH').val(CHUYEN_NGANH);
        $('#NOI_DT').val(NOI_DT);
        $('#QUOC_GIA').val(QUOC_GIA);
        $('#HINH_THUC').val(HINH_THUC);
        $('#LOAI_TN').val(LOAI_TN);
        $('#NAM').val(T.dateToText(NAM,'yyyy-mm-dd'));
        $('#CO_NOP_BANG').val(CO_NOP_BANG);
        $('#GHI_CHU').val(GHI_CHU);
        let cbcnvLabel = MS_NV ? ({value: MS_NV._id,label: MS_NV.MS_NV}): null;        
        this.setState({selectedcbcnv: cbcnvLabel});        
        this.setState({ _id, cbcnv: cbcnv? cbcnv: []});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const 
            cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value : null,
            MS_NV = cbcnv,
            nopcc = this.nopcc.current.getSelectedItem(),
            CO_NOP_BANG = nopcc? nopcc : [],
             changes = {
                MS_NV,
                // STT: this.state.number.STT, 
                // TU_THANG: this.state.number.TU_THANG,  
                TU_NAM: this.state.date.TU_NAM,  
                // DEN_THANG: this.state.number.DEN_THANG,  
                DEN_NAM: this.state.date.DEN_NAM,                  
                cap_dt: this.state.text.cap_dt, 
                CHUYEN_NGANH: this.state.text.CHUYEN_NGANH,      
                NOI_DT: this.state.text.NOI_DT, 
                QUOC_GIA: this.state.text.QUOC_GIA, 
                HINH_THUC: this.state.text.HINH_THUC,      
                LOAI_TN: this.state.text.LOAI_TN,  
                NAM: this.state.date.NAM,      
                CO_NOP_BANG,    
                GHI_CHU: this.state.text.GHI_CHU,  
            };    
        if (changes.MS_NV == null) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.CHUYEN_NGANH == null) {
            T.notify('Chuyên ngành đang trống!', 'danger');
            $('#CHUYEN_NGANH').focus();
        } else if (changes.NOI_DT == null) {
            T.notify('Nơi đào tạo đang trống!', 'danger');
            $('#NOI_DT').focus();
        } else if (changes.QUOC_GIA == null) {
            T.notify('Quốc gia đang trống!', 'danger');
            $('#QUOC_GIA').focus();
        } else if (changes.CO_NOP_BANG == null) {
            T.notify('Có nộp bằng đang trống!', 'danger');
            $('#CO_NOP_BANG').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
        } else if (this.state._id) {
            this.props.updateQt_dtao(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_dtao(changes, data => {                    
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv?this.state.cbcnv.cbcnv : [];
        const selectedcbcnv = this.state.selectedcbcnv;
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin quản trị đào tạo</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>                                                       
                            <div className='form-group'>
                                <label htmlFor='MS_NV'>MSNV</label>
                                <Select
                                value = {selectedcbcnv}
                                onChange =  {this.handleInput('cbcnv')}
                                options = {cbcnv.map(e => Object.assign({}, {label: e.MS_NV, value: e}))}
                                />
                            </div>
                            {/* <div className='form-group'>
                                <label htmlFor='STT'>STT</label>
                                <input className='form-control' id='STT' type='number' placeholder='' onChange={this.handleInput('number', 'STT')} value={this.state.number.STT}/>
                            </div>  */}
                            {/* <div className='form-group'>
                                <label htmlFor='TU_THANG'>Từ tháng</label>
                                <input className='form-control' id='TU_THANG' type='number' placeholder='' onChange={this.handleInput('number', 'TU_THANG')} value={this.state.number.TU_THANG}/>
                            </div>  */}
                            <div className='form-group'>
                                <label htmlFor='TU_NAM'>Từ năm</label>
                                <input className='form-control' id='TU_NAM' type='date' placeholder='' onChange={this.handleInput('date', 'TU_NAM')} value={this.state.date.TU_NAM}/>
                            </div> 
                            {/* <div className='form-group'>
                                <label htmlFor='DEN_THANG'>Đến tháng</label>
                                <input className='form-control' id='DEN_THANG' type='number' placeholder='' onChange={this.handleInput('number', 'DEN_THANG')} value={this.state.number.DEN_THANG}/>
                            </div>  */}
                            <div className='form-group'>
                                <label htmlFor='DEN_NAM'>Đến năm</label>
                                <input className='form-control' id='DEN_NAM' type='date' placeholder='' onChange={this.handleInput('date', 'DEN_NAM')} value={this.state.date.DEN_NAM}/>
                            </div>                             
                            <div className='form-group'>
                                <label htmlFor='cap_dt'>Cấp đào tạo</label>
                                <input className='form-control' id='cap_dt' type='text' placeholder='' onChange={this.handleInput('text', 'cap_dt')} value={this.state.text.cap_dt}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CHUYEN_NGANH'>Chuyên ngành</label>
                                <input className='form-control' id='CHUYEN_NGANH' type='text' placeholder='' onChange={this.handleInput('text', 'CHUYEN_NGANH')} value={this.state.text.CHUYEN_NGANH}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NOI_DT'>Nơi đào tạo</label>
                                <input className='form-control' id='NOI_DT' type='text' placeholder='' onChange={this.handleInput('text', 'NOI_DT')} value={this.state.text.NOI_DT}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='QUOC_GIA'>Quốc gia</label>
                                <input className='form-control' id='QUOC_GIA' type='text' placeholder='' onChange={this.handleInput('text', 'QUOC_GIA')} value={this.state.text.QUOC_GIA}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='HINH_THUC'>Hình thức</label>
                                <input className='form-control' id='HINH_THUC' type='text' placeholder='' onChange={this.handleInput('text', 'HINH_THUC')} value={this.state.text.HINH_THUC}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='LOAI_TN'>Loại TN</label>
                                <input className='form-control' id='LOAI_TN' type='text' placeholder='' onChange={this.handleInput('text', 'LOAI_TN')} value={this.state.text.LOAI_TN}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NAM'>Năm</label>
                                <input className='form-control' id='NAM' type='number' placeholder='' onChange={this.handleInput('number', 'NAM')} value={this.state.number.NAM}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CO_NOP_BANG'>Có nộp bằng</label>
                                <Dropdown ref={this.nopcc} text='' items={T.nopccs} />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU'>Ghi chú</label>
                                <input className='form-control' id='GHI_CHU' type='text' placeholder='' onChange={this.handleInput('text', 'GHI_CHU')} value={this.state.text.GHI_CHU}/>
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
}``