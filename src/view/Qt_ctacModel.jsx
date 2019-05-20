import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_ctacPage from './Qt_ctacPage.jsx';

export default class Qt_ctacModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', cbcnv: [], chucvu: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.chucvu = React.createRef();
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
            $(this.modal.current).on('shown.bs.modal', () => $('#MS_NV').focus());
        }, 250));
    }

    show(item, cbcnv, chucvu) {      
        
        const { _id, MS_NV, STT, TU_THANG, TU_NAM, DEN_THANG, DEN_NAM, CHUC_VU, NOI_CONG_TAC, BO_MON_CT, CONG_VIEC, GHI_CHU} = item ?
            item : { _id: null, MS_NV: '', STT: '', TU_THANG: '', TU_NAM: '', DEN_THANG: '', DEN_NAM: '', CHUC_VU: '', NOI_CONG_TAC: '', BO_MON_CT: '', CONG_VIEC: '', GHI_CHU: ''};
        $('#MS_NV').val(MS_NV);
        $('#STT').val(STT);
        $('#TU_THANG').val(TU_THANG);
        $('#TU_NAM').val(TU_NAM);
        $('#DEN_THANG').val(DEN_THANG);
        $('#DEN_NAM').val(DEN_NAM);
        $('#CHUC_VU').val(CHUC_VU);
        $('#NOI_CONG_TAC').val(NOI_CONG_TAC);
        $('#BO_MON_CT').val(BO_MON_CT);
        $('#CONG_VIEC').val(CONG_VIEC);
        $('#GHI_CHU').val(GHI_CHU);
        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], chucvu: chucvu? chucvu: []});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const cbcnv = this.cbcnv.current.getSelectedItem(), 
            chucvu = this.chucvu.current.getSelectedItem(),
            MS_NV = cbcnv? cbcnv : [],
            CHUC_VU = chucvu? chucvu : [],
             changes = {
                MS_NV,
                STT: this.state.number.STT, 
                TU_THANG: this.state.number.TU_THANG,  
                TU_NAM: this.state.number.TU_NAM,  
                DEN_THANG: this.state.number.DEN_THANG,  
                DEN_NAM: this.state.number.DEN_NAM,  
                CHUC_VU, 
                NOI_CONG_TAC: this.state.text.NOI_CONG_TAC, 
                BO_MON_CT: this.state.text.BO_MON_CT,      
                CONG_VIEC: this.state.text.CONG_VIEC,    
                GHI_CHU: this.state.text.GHI_CHU,  
            };    
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (!changes.STT) {
            T.notify('STT đang trống!', 'danger');
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
        const chucvu = this.state && this.state.chucvu && this.state.chucvu.chucvu? this.state.chucvu.chucvu: [];
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
                                <Dropdown ref={this.cbcnv} text='' items={cbcnv.map(e => Object.assign({}, e, {text: e.MS_NV}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='STT'>STT</label>
                                <input className='form-control' id='STT' type='number' placeholder='' onChange={this.handleInput('number', 'STT')} value={this.state.number.STT}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='TU_THANG'>Từ tháng</label>
                                <input className='form-control' id='TU_THANG' type='number' placeholder='' onChange={this.handleInput('number', 'TU_THANG')} value={this.state.number.TU_THANG}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='TU_NAM'>Từ năm</label>
                                <input className='form-control' id='TU_NAM' type='number' placeholder='' onChange={this.handleInput('number', 'TU_NAM')} value={this.state.number.TU_NAM}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='DEN_THANG'>Đến tháng</label>
                                <input className='form-control' id='DEN_THANG' type='number' placeholder='' onChange={this.handleInput('number', 'DEN_THANG')} value={this.state.number.DEN_THANG}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='DEN_NAM'>Đến năm</label>
                                <input className='form-control' id='DEN_NAM' type='number' placeholder='' onChange={this.handleInput('number', 'DEN_NAM')} value={this.state.number.DEN_NAM}/>
                            </div>                             
                            <div className='form-group'>
                                <label htmlFor='CHUC_VU'>Chức vụ</label>
                                <Dropdown ref={this.chucvu} text='' items={chucvu.map(e => Object.assign({}, e, {text: e.CHUC_VU}))} />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NOI_CONG_TAC'>Nơi công tác</label>
                                <input className='form-control' id='NOI_CONG_TAC' type='text' placeholder='' onChange={this.handleInput('text', 'NOI_CONG_TAC')} value={this.state.text.NOI_CONG_TAC}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='BO_MON_CT'>Bộ môn công tác</label>
                                <input className='form-control' id='BO_MON_CT' type='text' placeholder='' onChange={this.handleInput('text', 'BO_MON_CT')} value={this.state.text.BO_MON_CT}/>
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