import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_ky_luatPage from './Qt_ky_luatPage.jsx';

export default class Qt_ky_luatModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', cbcnv: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
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

    show(item, cbcnv) {      
        
        const { _id, MS_NV, STT, THANG, NAM, HINH_THUC, CAP_KL, LY_DO, GHI_CHU, SO_QD, NGAY_QD, FIELD1} = item ?
            item : { _id: null, MS_NV: '', STT: '', THANG: '', NAM: '', HINH_THUC: '', CAP_KL: '', LY_DO: '', GHI_CHU: '', SO_QD: '', NGAY_QD: '', FIELD1: ''};
        $('#MS_NV').val(MS_NV);
        $('#STT').val(STT);
        $('#THANG').val(THANG);
        $('#NAM').val(NAM);
        $('#HINH_THUC').val(HINH_THUC);
        $('#CAP_KL').val(CAP_KL);
        $('#LY_DO').val(LY_DO);
        $('#GHI_CHU').val(GHI_CHU);
        $('#SO_QD').val(SO_QD);
        $('#NGAY_QD').val(NGAY_QD);
        $('#FIELD1').val(FIELD1);

        this.setState({ _id, cbcnv: cbcnv? cbcnv: []});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const cbcnv = this.cbcnv.current.getSelectedItem(),            
            MS_NV = cbcnv? cbcnv : [],
             changes = {
                MS_NV,
                STT: this.state.number.STT, 
                THANG: this.state.number.THANG,
                NAM: this.state.number.NAM,
                HINH_THUC: this.state.text.HINH_THUC, 
                CAP_KL: this.state.text.CAP_KL, 
                LY_DO: this.state.text.LY_DO,    
                GHI_CHU: this.state.text.GHI_CHU,
                SO_QD: this.state.text.SO_QD, 
                NGAY_QD: this.state.date.NGAY_QD, 
                FIELD1: this.state.text.FIELD1,                                  
            };    
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (!changes.STT) {
            T.notify('STT đang trống!', 'danger');
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
                                <Dropdown ref={this.cbcnv} text='' items={cbcnv.map(e => Object.assign({}, e, {text: e.MS_NV}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='STT'>STT</label>
                                <input className='form-control' id='STT' type='number' placeholder='' onChange={this.handleInput('number', 'STT')} value={this.state.number.STT}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='THANG'>Tháng</label>
                                <input className='form-control' id='THANG' type='number' placeholder='' onChange={this.handleInput('number', 'THANG')} value={this.state.number.THANG}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NAM'>Năm</label>
                                <input className='form-control' id='NAM' type='number' placeholder='' onChange={this.handleInput('number', 'NAM')} value={this.state.number.NAM}/>
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
                                <label htmlFor='FIELD1'>Field 1</label>
                                <input className='form-control' id='FIELD1' type='text' placeholder='' onChange={this.handleInput('text', 'FIELD1')} value={this.state.text.FIELD1}/>
                            </div> 
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                            <button type='button' className='btn btn-primary' ref={this.btnSave} onClick={this.save}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}