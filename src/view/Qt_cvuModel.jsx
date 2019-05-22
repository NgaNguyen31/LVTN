import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_cvuPage from './Qt_cvuPage.jsx';

export default class Qt_cvuModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', cbcnv: [], chucvu: [], bomon: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.chucvu = React.createRef();
        this.bomon = React.createRef();
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

    show(item, cbcnv, chucvu, bomon) {      
        
        const { _id, MS_NV, STT, QD_BO_NHIEM, NGAY_QD_BNHIEM, MA_CV, CHUC_VU, HE_SO_PCCV, NGAY_BO_NHIEM, GHI_CHU_BHXH, NGAY_THOICV, QD_THOI_CVU, NGAY_QD_THOI_CV, MS_BOMON, GHI_CHU} = item ?
            item : { _id: null, MS_NV: '', STT: '', QD_BO_NHIEM: '', NGAY_QD_BNHIEM: '', MA_CV: '', CHUC_VU: '', HE_SO_PCCV: '', NGAY_BO_NHIEM: '', GHI_CHU_BHXH: '', NGAY_THOICV: '', QD_THOI_CVU: '', NGAY_QD_THOI_CV: '', MS_BOMON: '', GHI_CHU: ''};
        $('#MS_NV').val(MS_NV);
        $('#STT').val(STT);
        $('#QD_BO_NHIEM').val(QD_BO_NHIEM);
        $('#NGAY_QD_BNHIEM').val(NGAY_QD_BNHIEM);
        $('#MA_CV').val(MA_CV);
        $('#CHUC_VU').val(CHUC_VU);
        $('#HE_SO_PCCV').val(HE_SO_PCCV);
        $('#NGAY_BO_NHIEM').val(NGAY_BO_NHIEM);
        $('#GHI_CHU_BHXH').val(GHI_CHU_BHXH);
        $('#NGAY_THOICV').val(NGAY_THOICV);
        $('#QD_THOI_CVU').val(QD_THOI_CVU);
        $('#NGAY_QD_THOI_CV').val(NGAY_QD_THOI_CV);
        $('#MS_BOMON').val(MS_BOMON);
        $('#GHI_CHU').val(GHI_CHU);
        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], chucvu: chucvu? chucvu: [], bomon: bomon? bomon : []});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const cbcnv = this.cbcnv.current.getSelectedItem(), 
            chucvu = this.chucvu.current.getSelectedItem(),
            bomon = this.bomon.current.getSelectedItem(),
            MS_NV = cbcnv? cbcnv : [],
            MA_CV = chucvu? chucvu : [],
            MS_BOMON = bomon ? bomon : [],
             changes = {
                MS_NV,
                STT: this.state.number.STT, 
                QD_BO_NHIEM: this.state.text.QD_BO_NHIEM,  
                NGAY_QD_BNHIEM: this.state.date.NGAY_QD_BNHIEM,  
                MA_CV,
                CHUC_VU: this.state.text.CHUC_VU,
                HE_SO_PCCV: this.state.number.HE_SO_PCCV,  
                NGAY_BO_NHIEM: this.state.date.NGAY_BO_NHIEM, 
                GHI_CHU_BHXH: this.state.text.GHI_CHU_BHXH, 
                NGAY_THOICV: this.state.date.NGAY_THOICV,      
                QD_THOI_CVU: this.state.text.QD_THOI_CVU,    
                NGAY_QD_THOI_CV: this.state.date.NGAY_QD_THOI_CV,      
                MS_BOMON,    
                GHI_CHU: this.state.text.GHI_CHU,  
            };    
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.STT == '') {
            T.notify('STT đang trống!', 'danger');
            $('#STT').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
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
                                <Dropdown ref={this.cbcnv} text='' items={cbcnv.map(e => Object.assign({}, e, {text: e.MS_NV}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='STT'>STT</label>
                                <input className='form-control' id='STT' type='number' placeholder='' onChange={this.handleInput('number', 'STT')} value={this.state.number.STT}/>
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
                                <label htmlFor='MA_CV'>Mã chức vụ</label>
                                <Dropdown ref={this.chucvu} text='' items={chucvu.map(e => Object.assign({}, e, {text: e.CHUC_VU}))} />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CHUC_VU'>Chức vụ</label>
                                <input className='form-control' id='CHUC_VU' type='text' placeholder='' onChange={this.handleInput('text', 'CHUC_VU')} value={this.state.text.CHUC_VU}/>
                            </div>      
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
                                <Dropdown ref={this.bomon} text='' items={bomon.map(e => Object.assign({}, e, {text: e.TEN_BM }))} />
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