import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_cvuPage from './Qt_cvuPage.jsx';
import Select from 'react-select';

export default class Qt_cvuModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', cbcnv: [], chucvu: [], bomon: [], selectedcbcnv: [], selectedchucvu: [], selectedbomon: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.chucvu = React.createRef();
        this.bomon = React.createRef();
        this.selectedcbcnv = React.createRef();
        this.selectedchucvu = React.createRef();
        this.selectedbomon = React.createRef();

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
                case 'chucvu':
                    state.selectedchucvu = e;
                    break;
                case 'bomon':
                    state.selectedbomon = e;
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

    show(item, cbcnv, chucvu, bomon) {      
        
        const { _id, MS_NV, QD_BO_NHIEM, NGAY_QD_BNHIEM, MA_CV, HE_SO_PCCV, NGAY_BO_NHIEM, GHI_CHU_BHXH, NGAY_THOICV, QD_THOI_CVU, NGAY_QD_THOI_CV, MS_BOMON, GHI_CHU} = item ?
            item : { _id: null, MS_NV: null, QD_BO_NHIEM: null, NGAY_QD_BNHIEM: null, MA_CV: null, HE_SO_PCCV: null, NGAY_BO_NHIEM: null, GHI_CHU_BHXH: null, NGAY_THOICV: null, QD_THOI_CVU: null, NGAY_QD_THOI_CV: null, MS_BOMON: null, GHI_CHU: null};
        $('#MS_NV').val(MS_NV);
        // $('#STT').val(STT);
        $('#QD_BO_NHIEM').val(QD_BO_NHIEM);
        $('#NGAY_QD_BNHIEM').val(T.dateToText(NGAY_QD_BNHIEM,'yyyy-mm-dd'));
        MA_CV ? $('#MA_CV').val(MA_CV) : null;
        // $('#CHUC_VU').val(CHUC_VU);
        $('#HE_SO_PCCV').val(HE_SO_PCCV);
        $('#NGAY_BO_NHIEM').val(T.dateToText(NGAY_BO_NHIEM,'yyyy-mm-dd'));
        $('#GHI_CHU_BHXH').val(GHI_CHU_BHXH);
        $('#NGAY_THOICV').val(T.dateToText(NGAY_THOICV,'yyyy-mm-dd'));
        $('#QD_THOI_CVU').val(QD_THOI_CVU);
        $('#NGAY_QD_THOI_CV').val(T.dateToText(NGAY_QD_THOI_CV,'yyyy-mm-dd'));
        MS_BOMON ? $('#MS_BOMON').val(MS_BOMON) : null;
        $('#GHI_CHU').val(GHI_CHU);
        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], chucvu: chucvu? chucvu: [], bomon: bomon? bomon : []});
        let cbcnvLabel = MS_NV ? ({value: MS_NV._id,label: MS_NV.MS_NV}): null;        
        this.setState({selectedcbcnv: cbcnvLabel});
        let chucvuLabel = MA_CV ? ({value: MA_CV._id,label: MA_CV.CHUC_VU}): null;        
        this.setState({selectedchucvu: chucvuLabel});
        let bomonLabel = MS_BOMON ? ({value: MS_BOMON._id,label: MS_BOMON.ten_bm}): null;        
        this.setState({selectedbomon: bomonLabel});
        
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const 
            cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value : null,
            MS_NV = cbcnv,
            chucvu = this.state.selectedchucvu ? this.state.selectedchucvu.value : null,
            MA_CV = chucvu,
            bomon = this.state.selectedbomon ? this.state.selectedbomon.value : null,
            MS_BOMON = bomon,
             changes = {
                MS_NV,
                // STT: this.state.number.STT, 
                QD_BO_NHIEM: this.state.text.QD_BO_NHIEM,  
                NGAY_QD_BNHIEM: this.state.date.NGAY_QD_BNHIEM,  
                MA_CV,
                HE_SO_PCCV:  this.state.text.HE_SO_PCCV,  
                NGAY_BO_NHIEM: this.state.date.NGAY_BO_NHIEM, 
                GHI_CHU_BHXH: this.state.text.GHI_CHU_BHXH, 
                NGAY_THOICV: this.state.date.NGAY_THOICV,      
                QD_THOI_CVU: this.state.text.QD_THOI_CVU,    
                NGAY_QD_THOI_CV: this.state.date.NGAY_QD_THOI_CV,      
                MS_BOMON,    
                GHI_CHU: this.state.text.GHI_CHU,  
            };    
            console.log(this.state.selectedbomon);
            
        if (changes.MS_NV == null) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.MA_CV == null) {
            T.notify('Mã chức vụ đang trống!', 'danger');
            $('#MA_CV').focus();
        } else if (changes.HE_SO_PCCV < 0) {
            T.notify('Hệ số PCCV không được là số âm', 'danger');
            $('#HE_SO_PCCV').focus();
        } else if (this.state._id) {
            this.props.updateQt_cvu(this.state._id, changes, data => {
            $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_cvu(changes, data => {                    
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv?this.state.cbcnv.cbcnv : [];
        const chucvu = this.state && this.state.chucvu && this.state.chucvu.chucvu? this.state.chucvu.chucvu: [];
        const bomon = this.state && this.state.bomon && this.state.bomon.bomon? this.state.bomon.bomon : [];
        const selectedcbcnv = this.state.selectedcbcnv;
        const selectedchucvu = this.state.selectedchucvu;
        const selectedbomon = this.state.selectedbomon;

        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin quản trị chức vụ</h5>
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
                            <div className='form-group'>
                                <label htmlFor='QD_BO_NHIEM'>QĐ bổ nhiệm</label>
                                <input className='form-control' id='QD_BO_NHIEM' type='text' placeholder='' onChange={this.handleInput('text', 'QD_BO_NHIEM')} value={this.state.text.QD_BO_NHIEM}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGAY_QD_BNHIEM'>Ngày QĐ bổ nhiệm</label>
                                <input className='form-control' id='NGAY_QD_BNHIEM' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_QD_BNHIEM')} value={this.state.date.NGAY_QD_BNHIEM}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='MA_CV'>Chức vụ</label>
                                <Select
                                value = {selectedchucvu}
                                onChange =  {this.handleInput('chucvu')}
                                options = {chucvu.map(e => Object.assign({}, {label: e.CHUC_VU, value: e}))}
                                />
                            </div> 
                            {/* <div className='form-group'>
                                <label htmlFor='CHUC_VU'>Chức vụ</label>
                                <input className='form-control' id='CHUC_VU' type='text' placeholder='' onChange={this.handleInput('text', 'CHUC_VU')} value={this.state.text.CHUC_VU}/>
                            </div>       */}
                            <div className='form-group'>
                                <label htmlFor='HE_SO_PCCV'>Hệ số PCCV</label>
                                <input className='form-control' id='HE_SO_PCCV' type='number' placeholder='' onChange={this.handleInput('number', 'HE_SO_PCCV')} value={this.state.number.HE_SO_PCCV}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGAY_BO_NHIEM'>Ngày bổ nhiệm</label>
                                <input className='form-control' id='NGAY_BO_NHIEM' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_BO_NHIEM')} value={this.state.date.NGAY_BO_NHIEM}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU_BHXH'>Ghi chú BHXH</label>
                                <input className='form-control' id='GHI_CHU_BHXH' type='text' placeholder='' onChange={this.handleInput('text', 'GHI_CHU_BHXH')} value={this.state.text.GHI_CHU_BHXH}/>
                            </div>  
                            <div className='form-group'>
                                <label htmlFor='NGAY_THOICV'>Ngày thôi chức vụ</label>
                                <input className='form-control' id='NGAY_THOICV' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_THOICV')} value={this.state.date.NGAY_THOICV}/>
                            </div>  
                            <div className='form-group'>
                                <label htmlFor='QD_THOI_CVU'>QĐ thôi chức vụ</label>
                                <input className='form-control' id='QD_THOI_CVU' type='text' placeholder='' onChange={this.handleInput('text', 'QD_THOI_CVU')} value={this.state.text.QD_THOI_CVU}/>
                            </div>  
                            <div className='form-group'>
                                <label htmlFor='NGAY_QD_THOI_CV'>Ngày QĐ thôi chức vụ</label>
                                <input className='form-control' id='NGAY_QD_THOI_CV' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_QD_THOI_CV')} value={this.state.date.NGAY_QD_THOI_CV}/>
                            </div>                        
                            <div className='form-group'>
                                <label htmlFor='MS_BOMON'>MSBM</label>
                                <Select
                                value = {selectedbomon}
                                onChange =  {this.handleInput('bomon')}
                                options = {bomon.map(e => Object.assign({}, {label: e.ten_bm, value: e}))}
                                />
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
}