import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_ky_luatPage from './Qt_ky_luatPage.jsx';
import Select from 'react-select';

export default class Qt_ky_luatModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', cbcnv: [], selectedcbcnv: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
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
        
        const { _id, MS_NV, STT, NAM, HINH_THUC, CAP_KL, LY_DO, GHI_CHU, SO_QD, NGAY_QD, FIELD1} = item ?
            item : { _id: null, MS_NV: null, STT: null, NAM: null, HINH_THUC: null, CAP_KL: null, LY_DO: null, GHI_CHU: null, SO_QD: null, NGAY_QD: null, FIELD1: null};
        $('#MS_NV').val(MS_NV);
        // $('#STT').val(STT);
        // $('#THANG').val(THANG);
        $('#NAM').val(T.dateToText(NAM,'yyyy-mm-dd'));
        $('#HINH_THUC').val(HINH_THUC);
        $('#CAP_KL').val(CAP_KL);
        $('#LY_DO').val(LY_DO);
        $('#GHI_CHU').val(GHI_CHU);
        $('#SO_QD').val(SO_QD);
        $('#NGAY_QD').val(T.dateToText(NGAY_QD,'yyyy-mm-dd'));
        $('#FIELD1').val(FIELD1);

        this.setState({ _id, cbcnv: cbcnv? cbcnv: []});
        let cbcnvLabel = MS_NV ? ({value: MS_NV._id,label: MS_NV.MS_NV}): null;        
        this.setState({selectedcbcnv: cbcnvLabel});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const 
            cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value : null,
            MS_NV = cbcnv,
             changes = {
                MS_NV,
                // STT: this.state.number.STT, 
                // THANG: this.state.number.THANG,
                NAM: this.state.date.NAM,
                HINH_THUC: this.state.text.HINH_THUC, 
                CAP_KL: this.state.text.CAP_KL, 
                LY_DO: this.state.text.LY_DO,    
                GHI_CHU: this.state.text.GHI_CHU,
                SO_QD: this.state.text.SO_QD, 
                NGAY_QD: this.state.date.NGAY_QD, 
                FIELD1: this.state.text.FIELD1,                                  
            };    
        if (changes.MS_NV == null) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.NAM == null) {
            T.notify('Năm đang trống!', 'danger');
            $('#NAM').focus();
        } else if (changes.LY_DO == null) {
            T.notify('Lý do đang trống!', 'danger');
            $('#LY_DO').focus();
        } else if (changes.SO_QD == null) {
            T.notify('SỐ QĐ đang trống!', 'danger');
            $('#SO_QD').focus();
        } else if (changes.NGAY_QD == null) {
            T.notify('Ngày QĐ đang trống!', 'danger');
            $('#NGAY_QD').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
        } else if (this.state._id) {
            this.props.updateQt_ky_luat(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_ky_luat(changes, data => {                    
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
                            <h5 className='modal-title'>Thông tin quản trị kỷ luật</h5>
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
                                <label htmlFor='THANG'>Tháng</label>
                                <input className='form-control' id='THANG' type='number' placeholder='' onChange={this.handleInput('number', 'THANG')} value={this.state.number.THANG}/>
                            </div>  */}
                            <div className='form-group'>
                                <label htmlFor='NAM'>Năm</label>
                                <input className='form-control' id='NAM' type='date' placeholder='' onChange={this.handleInput('date', 'NAM')} value={this.state.date.NAM}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='HINH_THUC'>Hình thức</label>
                                <input className='form-control' id='HINH_THUC' type='text' placeholder='' onChange={this.handleInput('text', 'HINH_THUC')} value={this.state.text.HINH_THUC}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CAP_KL'>Cấp kỷ luật</label>
                                <input className='form-control' id='CAP_KL' type='text' placeholder='' onChange={this.handleInput('text', 'CAP_KL')} value={this.state.text.CAP_KL}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='LY_DO'>Lý do</label>
                                <input className='form-control' id='LY_DO' type='text' placeholder='' onChange={this.handleInput('text', 'LY_DO')} value={this.state.text.LY_DO}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU'>Ghi chú</label>
                                <input className='form-control' id='GHI_CHU' type='text' placeholder='' onChange={this.handleInput('text', 'GHI_CHU')} value={this.state.text.GHI_CHU}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='SO_QD'>Số QĐ</label>
                                <input className='form-control' id='SO_QD' type='text' placeholder='' onChange={this.handleInput('text', 'SO_QD')} value={this.state.text.SO_QD}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGAY_QD'>Ngày QĐ</label>
                                <input className='form-control' id='NGAY_QD' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_QD')} value={this.state.date.NGAY_QD}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='FIELD1'>Ghi chú khác</label>
                                <input className='form-control' id='FIELD1' type='text' placeholder='' onChange={this.handleInput('text', 'FIELD1')} value={this.state.text.FIELD1}/>
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