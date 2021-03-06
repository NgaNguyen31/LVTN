import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_khenPage from './Qt_khenPage.jsx';
import Select from 'react-select';

export default class Qt_khenModal extends React.Component {
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
        
        const { _id, MS_NV, STT, NAM, HINH_THUC, CAP_KHEN, LY_DO, DANH_HIEU, GHI_CHU} = item ?
            item : { _id: null, MS_NV: null, STT: null, NAM: null, HINH_THUC: null, CAP_KHEN: null, LY_DO: null, DANH_HIEU: null, GHI_CHU: null};
        $('#MS_NV').val(MS_NV);
        // $('#STT').val(STT);
        $('#NAM').val(NAM);
        $('#HINH_THUC').val(HINH_THUC);
        $('#CAP_KHEN').val(CAP_KHEN);
        $('#LY_DO').val(LY_DO);
        $('#DANH_HIEU').val(DANH_HIEU);
        $('#GHI_CHU').val(GHI_CHU);

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
                NAM: this.state.date.NAM,
                HINH_THUC: this.state.text.HINH_THUC, 
                CAP_KHEN: this.state.text.CAP_KHEN, 
                LY_DO: this.state.text.LY_DO,    
                DANH_HIEU: this.state.text.DANH_HIEU, 
                GHI_CHU: this.state.text.GHI_CHU,                                 
            };    
        if (changes.MS_NV == null) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.NAM == null) {
            T.notify('Năm đang trống!', 'danger');
            $('#NAM').focus();
        } else if (changes.CAP_KHEN == null) {
            T.notify('Cấp khen đang trống!', 'danger');
            $('#CAP_KHEN').focus();
        } else if (changes.DANH_HIEU == null) {
            T.notify('Danh hiệu đang trống!', 'danger');
            $('#DANH_HIEU').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
        } else if (this.state._id) {
            this.props.updateQt_khen(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_khen(changes, data => {                    
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
                            <h5 className='modal-title'>Thông tin quản trị khen</h5>
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
                            <div className='form-group'>
                                <label htmlFor='NAM'>Năm</label>
                                <input className='form-control' id='NAM' type='date' placeholder='' onChange={this.handleInput('date', 'NAM')} value={this.state.date.NAM}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='HINH_THUC'>Hình thức</label>
                                <input className='form-control' id='HINH_THUC' type='text' placeholder='' onChange={this.handleInput('text', 'HINH_THUC')} value={this.state.text.HINH_THUC}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CAP_KHEN'>Cấp khen</label>
                                <input className='form-control' id='CAP_KHEN' type='text' placeholder='' onChange={this.handleInput('text', 'CAP_KHEN')} value={this.state.text.CAP_KHEN}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='LY_DO'>Lý do</label>
                                <input className='form-control' id='LY_DO' type='text' placeholder='' onChange={this.handleInput('text', 'LY_DO')} value={this.state.text.LY_DO}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='DANH_HIEU'>Danh hiệu</label>
                                <input className='form-control' id='DANH_HIEU' type='text' placeholder='' onChange={this.handleInput('text', 'DANH_HIEU')} value={this.state.text.DANH_HIEU}/>
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