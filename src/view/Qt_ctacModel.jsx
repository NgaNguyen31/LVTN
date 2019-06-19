import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_ctacPage from './Qt_ctacPage.jsx';
import Select from 'react-select';

export default class Qt_ctacModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', cbcnv: [],  selectedcbcnv: [], bomon: [], selectedbomon: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.selectedcbcnv = React.createRef();
        this.bomon = React.createRef();
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

    show(item, cbcnv, bomon) {      
        
        const { _id, MS_NV, STT, TU_NAM, DEN_NAM, CHUC_VU, NOI_CONG_TAC, BO_MON_CT, CONG_VIEC, GHI_CHU} = item ?
            item : { _id: null, MS_NV: null, STT: null, TU_THANG: null, TU_NAM: null, DEN_THANG: null, DEN_NAM: null, CHUC_VU: null, NOI_CONG_TAC: null, BO_MON_CT: null, CONG_VIEC: null, GHI_CHU: null};
        $('#MS_NV').val(MS_NV);
        // $('#STT').val(STT);
        // $('#TU_THANG').val(TU_THANG);
        $('#TU_NAM').val(T.dateToText(TU_NAM,'yyyy-mm-dd'));
        // $('#DEN_THANG').val(DEN_THANG);
        $('#DEN_NAM').val(T.dateToText(DEN_NAM,'yyyy-mm-dd'));
        $('#CHUC_VU').val(CHUC_VU);
        $('#NOI_CONG_TAC').val(NOI_CONG_TAC);
        $('#BO_MON_CT').val(BO_MON_CT);
        $('#CONG_VIEC').val(CONG_VIEC);
        $('#GHI_CHU').val(GHI_CHU);

        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], bomon:bomon?bomon:[]});
        let cbcnvLabel = MS_NV ? ({value: MS_NV._id,label: MS_NV.MS_NV}): null;        
        this.setState({selectedcbcnv: cbcnvLabel});
        let bomonLabel = BO_MON_CT ? ({value: BO_MON_CT._id,label: BO_MON_CT.ten_bm}): null;        
        this.setState({selectedbomon: bomonLabel});
        
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const 
            cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value : null,
            MS_NV = cbcnv,     
            bomon = this.state.selectedbomon ? this.state.selectedbomon.value : null,
            BO_MON_CT = bomon,            
             changes = {
                MS_NV,
                // STT: this.state.number.STT, 
                // TU_THANG: this.state.number.TU_THANG,  
                TU_NAM: this.state.date.TU_NAM,  
                // DEN_THANG: this.state.number.DEN_THANG,  
                DEN_NAM: this.state.date.DEN_NAM,  
                CHUC_VU: this.state.text.CHUC_VU, 
                NOI_CONG_TAC: this.state.text.NOI_CONG_TAC, 
                BO_MON_CT,      
                CONG_VIEC: this.state.text.CONG_VIEC,    
                GHI_CHU: this.state.text.GHI_CHU,  
            };    
        if (changes.MS_NV == null) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.NOI_CONG_TAC == null) {
            T.notify('Nơi công tác đang trống!', 'danger');
            $('#NOI_CONG_TAC').focus();
        } else if (changes.BO_MON_CT == null) {
            T.notify('Bộ môn công tác đang trống!', 'danger');
            $('#BO_MON_CT').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
        } else if (this.state._id) {
            this.props.updateQt_ctac(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_ctac(changes, data => {                    
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv?this.state.cbcnv.cbcnv : [];
        const selectedcbcnv = this.state.selectedcbcnv;
        const bomon = this.state && this.state.bomon && this.state.bomon.bomon?this.state.bomon.bomon : [];
        const selectedbomon = this.state.selectedbomon;
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin quản trị các con</h5>
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
                                <label htmlFor='CHUC_VU'>Chức vụ</label>
                                <input className='form-control' id='CHUC_VU' type='text' placeholder='' onChange={this.handleInput('text', 'CHUC_VU')} value={this.state.text.CHUC_VU}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NOI_CONG_TAC'>Nơi công tác</label>
                                <input className='form-control' id='NOI_CONG_TAC' type='text' placeholder='' onChange={this.handleInput('text', 'NOI_CONG_TAC')} value={this.state.text.NOI_CONG_TAC}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='BO_MON_CT'>Bộ môn công tác</label>
                                <Select
                                value = {selectedbomon}
                                onChange =  {this.handleInput('bomon')}
                                options = {bomon.map(e => Object.assign({}, {label: e.ten_bm, value: e}))}
                                />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CONG_VIEC'>Công việc</label>
                                <input className='form-control' id='CONG_VIEC' type='text' placeholder='' onChange={this.handleInput('text', 'CONG_VIEC')} value={this.state.text.CONG_VIEC}/>
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