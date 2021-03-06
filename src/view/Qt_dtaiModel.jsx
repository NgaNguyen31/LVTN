import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_dtaiPage from './Qt_dtaiPage.jsx';
import Select from 'react-select';

export default class Qt_dtaiModal extends React.Component {
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
                    : (state.text = {}) && (state.text[field] = e.target.value)
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
        
        const { _id, MS_NV, STT, DE_TAI, CHU_NHIEM_DE_TAI, CAP, NGAY_KETTHUC, NAM} = item ?
            item : { _id: null, MS_NV: null, STT: null, DE_TAI: null, CHU_NHIEM_DE_TAI: null, CAP: null, NGAY_KETTHUC: null, NAM: null};
        $('#MS_NV').val(MS_NV);
        // $('#STT').val(STT);
        $('#DE_TAI').val(DE_TAI);
        $('#CHU_NHIEM_DE_TAI').val(CHU_NHIEM_DE_TAI);
        $('#CAP').val(CAP);
        $('#NGAY_KETTHUC').val(T.dateToText(NGAY_KETTHUC,'yyyy-mm-dd'));
        $('#NAM').val(T.dateToText(NAM,'yyyy-mm-dd'));

        this.setState({ _id, cbcnv: cbcnv? cbcnv: []});
        let cbcnvLabel = MS_NV ? ({value: MS_NV._id,label: MS_NV.MS_NV}): null;        
        this.setState({selectedcbcnv: cbcnvLabel});        
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value : null,
            MS_NV = cbcnv,
             changes = {
                MS_NV,
                // STT: this.state.number.STT, 
                DE_TAI: this.state.text.DE_TAI, 
                CHU_NHIEM_DE_TAI: this.state.text.CHU_NHIEM_DE_TAI, 
                CAP: this.state.text.CAP, 
                NGAY_KETTHUC: this.state.date.NGAY_KETTHUC,
                NAM: this.state.date.NAM,
            };    
        if (changes.MS_NV == null) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.DE_TAI == null) {
            T.notify('Đề tài đang trống!', 'danger');
            $('#DE_TAI').focus();
        } else if (changes.CAP == null) {
            T.notify('Cấp đang trống!', 'danger');
            $('#CAP').focus();
        } else if (changes.CHU_NHIEM_DE_TAI == null) {
            T.notify('Chủ nhiệm đề tài đang trống!', 'danger');
            $('#CHU_NHIEM_DE_TAI').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
        } else if (this.state._id) {
            this.props.updateQt_dtai(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_dtai(changes, data => {                    
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
                            <h5 className='modal-title'>Thông tin quản trị đề tài</h5>
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
                                <label htmlFor='DE_TAI'>Đề tài</label>
                                <input className='form-control' id='DE_TAI' type='text' placeholder='' onChange={this.handleInput('text', 'DE_TAI')} value={this.state.text.DE_TAI}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CHU_NHIEM_DE_TAI'>Chủ nhiệm đề tài</label>
                                <input className='form-control' id='CHU_NHIEM_DE_TAI' type='text' placeholder='' onChange={this.handleInput('text', 'CHU_NHIEM_DE_TAI')} value={this.state.text.CHU_NHIEM_DE_TAI}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CAP'>Cấp</label>
                                <input className='form-control' id='CAP' type='text' placeholder='' onChange={this.handleInput('text', 'CAP')} value={this.state.text.CAP}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NGAY_KETTHUC'>Ngày kết thúc</label>
                                <input className='form-control' id='NGAY_KETTHUC' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_KETTHUC')} value={this.state.date.NGAY_KETTHUC}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NAM'>Năm</label>
                                <input className='form-control' id='NAM' type='date' placeholder='' onChange={this.handleInput('date', 'NAM')} value={this.state.date.NAM}/>
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