import React from 'react';
import Dropdown from './Dropdown.jsx';
import Select from 'react-select';
import Qt_luongPage from './Qt_luongPage.jsx';

export default class Qt_luongModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', cbcnv: [], ngach: [], selectedcbcnv: [], selectedngach: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.ngach = React.createRef();
        this.selectedcbcnv = React.createRef();
        this.selectedngach = React.createRef();
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
                    : (state.date = {}) && (state.date[field] = e.target.value)
                    e.preventDefault();
                    break;  
                case 'cbcnv':
                    state.selectedcbcnv = e;
                    break;
                case 'ngach':
                    state.selectedngach = e;
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

    show(item, cbcnv, ngach) {      
        
        const { _id, MS_NV, STT, QD_luong, Ngay_QD, Ngay_huong, Moc_nang_luong, Ngach, Heso, Bac, PT_Vuot_Khung, LG_Khoan_Chinh, Ty_le, GHI_CHU_LUONG, GHI_CHU_KHAC} = item ?
            item : { _id: null, MS_NV: null, STT: null, QD_luong: null, Ngay_QD: null, Ngay_huong: null, Moc_nang_luong: null, Ngach: null, Heso: null, Bac: null, PT_Vuot_Khung: null, LG_Khoan_Chinh: null, Ty_le: null, GHI_CHU_LUONG: null, GHI_CHU_KHAC: null};
        $('#MS_NV').val(MS_NV);
        // $('#STT').val(STT);
        $('#QD_luong').val(QD_luong);
        $('#Ngay_QD').val(T.dateToText(Ngay_QD,'yyyy-mm-dd'));
        $('#Ngay_huong').val(T.dateToText(Ngay_huong,'yyyy-mm-dd'));
        $('#Moc_nang_luong').val(T.dateToText(Moc_nang_luong,'yyyy-mm-dd'));
        $('#Ngach').val(Ngach);
        $('#Heso').val(Heso);
        $('#Bac').val(Bac);
        $('#PT_Vuot_Khung').val(PT_Vuot_Khung);
        $('#LG_Khoan_Chinh').val(LG_Khoan_Chinh);
        $('#Ty_le').val(Ty_le);
        $('#GHI_CHU_LUONG').val(GHI_CHU_LUONG);
        $('#GHI_CHU_KHAC').val(GHI_CHU_KHAC);

        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], ngach: ngach? ngach:[]});
        let MS_NVLabel = MS_NV ? ({value: MS_NV._id,label: MS_NV.MS_NV}): null;        
        let ngachLabel = Ngach ? ({value: Ngach._id, label:Ngach.NGACH}): null;
        this.setState({selectedcbcnv: MS_NVLabel, selectedngach:ngachLabel});
        
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const 
            ngach = this.state.selectedngach ? this.state.selectedngach.value : null,
            cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value : null,
            Ngach = ngach,
            MS_NV = cbcnv,
             changes = {
                MS_NV,
                // STT: this.state.number.STT, 
                QD_luong: this.state.text.QD_luong, 
                Ngay_QD: this.state.date.Ngay_QD,
                Ngay_huong: this.state.date.Ngay_huong,
                Moc_nang_luong: this.state.date.Moc_nang_luong,
                Ngach,
                Heso: this.state.number.Heso, 
                Bac: this.state.number.Bac, 
                PT_Vuot_Khung: this.state.number.PT_Vuot_Khung, 
                LG_Khoan_Chinh: this.state.number.LG_Khoan_Chinh, 
                Ty_le: this.state.number.Ty_le, 
                GHI_CHU_LUONG: this.state.text.GHI_CHU_LUONG, 
                GHI_CHU_KHAC: this.state.text.GHI_CHU_KHAC, 
            };    
        if (changes.MS_NV == '') {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.Ngach == null) {
            T.notify('Ngạch đang trống!', 'danger');
            $('#Ngach').focus();
        } else if (changes.Heso == null) {
            T.notify('Hệ số đang trống!', 'danger');
            $('#Heso').focus();
        } else if (changes.Bac == null) {
            T.notify('Bậc đang trống!', 'danger');
            $('#Bac').focus();
        } else if (changes.LG_Khoan_Chinh == null) {
            T.notify('Lương khoản chính đang trống!', 'danger');
            $('#LG_Khoan_Chinh').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
        } else if (changes.Heso < 0) {
            T.notify('Hệ số không được là số âm', 'danger');
            $('#Heso').focus();
        } else if (changes.Bac < 0) {
            T.notify('Bậc không được là số âm', 'danger');
            $('#Bac').focus();
        } else if (changes.PT_Vuot_Khung < 0) {
            T.notify('Phần trăm vượt khung không được là số âm', 'danger');
            $('#PT_Vuot_Khung').focus();
        } else if (changes.LG_Khoan_Chinh < 0) {
            T.notify('Lương khoảng chính không được là số âm', 'danger');
            $('#LG_Khoan_Chinh').focus();
        } else if (changes.Ty_le < 0) {
            T.notify('Tỷ lệ không được là số âm', 'danger');
            $('#Ty_le').focus();
        } else if (this.state._id) {
            this.props.updateQt_luong(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_luong(changes, data => {                    
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv?this.state.cbcnv.cbcnv : [];
        const ngach = this. state && this.state.ngach && this.state.ngach.ngach? this.state.ngach.ngach : [];
        const selectedcbcnv = this.state.selectedcbcnv;
        const selectedngach = this.state.selectedngach;
        
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin quản trị lương</h5>
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
                                <label htmlFor='QD_luong'>QĐ lương</label>
                                <input className='form-control' id='QD_luong' type='text' placeholder='' onChange={this.handleInput('text', 'QD_luong')} value={this.state.text.QD_luong}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='Ngay_QD'>Ngày QĐ</label>
                                <input className='form-control' id='Ngay_QD' type='date' placeholder='' onChange={this.handleInput('date', 'Ngay_QD')} value={this.state.date.Ngay_QD}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='Ngay_huong'>Ngày hưởng</label>
                                <input className='form-control' id='Ngay_huong' type='date' placeholder='' onChange={this.handleInput('date', 'Ngay_huong')} value={this.state.date.Ngay_huong}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='Moc_nang_luong'>Mốc năng lượng</label>
                                <input className='form-control' id='Moc_nang_luong' type='date' placeholder='' onChange={this.handleInput('date', 'Moc_nang_luong')} value={this.state.date.Moc_nang_luong}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='Ngach'>Ngạch</label>
                                <Select
                                value = {selectedngach}
                                onChange =  {this.handleInput('ngach')}
                                options = {ngach.map(e => Object.assign({}, {label: e.NGACH, value: e}))}
                                />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='Heso'>Hệ số</label>
                                <input className='form-control' id='Heso' type='number' placeholder='' onChange={this.handleInput('number', 'Heso')} value={this.state.number.Heso}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='Bac'>Bậc</label>
                                <input className='form-control' id='Bac' type='number' placeholder='' onChange={this.handleInput('number', 'Bac')} value={this.state.number.Bac}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='PT_Vuot_Khung'>% vượt khung</label>
                                <input className='form-control' id='PT_Vuot_Khung' type='number' placeholder='' onChange={this.handleInput('number', 'PT_Vuot_Khung')} value={this.state.number.PT_Vuot_Khung}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='LG_Khoan_Chinh'>Lương khoản chính</label>
                                <input className='form-control' id='LG_Khoan_Chinh' type='number' placeholder='' onChange={this.handleInput('number', 'LG_Khoan_Chinh')} value={this.state.number.LG_Khoan_Chinh}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='Ty_le'>Tỷ lệ</label>
                                <input className='form-control' id='Ty_le' type='number' placeholder='' onChange={this.handleInput('number', 'Ty_le')} value={this.state.number.Ty_le}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU_LUONG'>Ghi chú lương</label>
                                <input className='form-control' id='GHI_CHU_LUONG' type='text' placeholder='' onChange={this.handleInput('text', 'GHI_CHU_LUONG')} value={this.state.text.GHI_CHU_LUONG}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU_KHAC'>Ghi chú khác</label>
                                <input className='form-control' id='GHI_CHU_KHAC' type='text' placeholder='' onChange={this.handleInput('text', 'GHI_CHU_KHAC')} value={this.state.text.GHI_CHU_KHAC}/>
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