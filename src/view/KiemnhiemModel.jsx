import React from 'react';
import Dropdown from './Dropdown.jsx';
import KiemnhiemPage from './KiemnhiemPage.jsx';
import Select from 'react-select';

export default class KiemnhiemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', cbcnv: [], bomon: [], chucvu: [], selectedcbcnv: [], selectedchucvu: [], selectedbomon: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.bomon = React.createRef();
        this.chucvu = React.createRef();
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

    show(item, cbcnv, bomon, chucvu) {      
        
        const { _id, MS_NV, MS_BM, MS_CVU, NGAY_CVU, GHICHU, Xoa} = item ?
            item : { _id: null, MS_NV: null, MS_BM: null, MS_CVU: null, NGAY_CVU: null, GHICHU: null, Xoa: null};
        $('#MS_NV').val(MS_NV);
        $('#MS_BM').val(MS_BM);
        $('#MS_CVU').val(MS_CVU);
        $('#NGAY_CVU').val(NGAY_CVU);
        $('#GHICHU').val(GHICHU);
        $('#Xoa').prop('checked', Xoa);
        
        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], bomon: bomon? bomon: [], chucvu: chucvu? chucvu:[]});
        let cbcnvLabel = MS_NV ? ({value: MS_NV._id,label: MS_NV.MS_NV}): null;        
        this.setState({selectedcbcnv: cbcnvLabel});
        let chucvuLabel = MS_CVU ? ({value: MS_CVU._id,label: MS_CVU.CHUC_VU}): null;        
        this.setState({selectedchucvu: chucvuLabel});
        let bomonLabel = MS_BM ? ({value: MS_BM._id,label: MS_BM.ten_bm}): null;        
        this.setState({selectedbomon: bomonLabel});
        
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value : null,
        MS_NV = cbcnv,
        chucvu = this.state.selectedchucvu ? this.state.selectedchucvu.value : null,
        MS_CVU = chucvu,
        bomon = this.state.selectedbomon ? this.state.selectedbomon.value : null,
        MS_BM = bomon,
             changes = {
                MS_NV,
                MS_BM,
                MS_CVU,
                NGAY_CVU: this.state.text.NGAY_CVU, 
                GHICHU : this.state.text.GHICHU, 
                Xoa: $('#Xoa').prop('checked'),         
            };    
        if (changes.MS_NV == null) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.MS_BM == null) {
            T.notify('MSBM đang trống!', 'danger');
            $('#MS_BM').focus();
        } else if (changes.MS_CVU == null) {
            T.notify('MS CVụ đang trống!', 'danger');
            $('#MS_CVU').focus();
        } else if (this.state._id) {
            this.props.updateKiemnhiem(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createKiemnhiem(changes, data => {                
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
                            <h5 className='modal-title'>Thông tin kiêm nhiệm</h5>
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
                                <label htmlFor='MS_BM'>Tên BM</label>
                                <Select
                                value = {selectedbomon}
                                onChange =  {this.handleInput('bomon')}
                                options = {bomon.map(e => Object.assign({}, {label: e.ten_bm, value: e}))}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MS_CVU'>Tên CVụ</label>
                                <Select
                                value = {selectedchucvu}
                                onChange =  {this.handleInput('chucvu')}
                                options = {chucvu.map(e => Object.assign({}, {label: e.CHUC_VU, value: e}))}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_CVU'>Ngày chức vụ</label>
                                <input className='form-control' id='NGAY_CVU' type='date' placeholder='' onChange={this.handleInput('text', 'NGAY_CVU')} value={this.state.text.NGAY_CVU}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHICHU'>Ghi chú</label>
                                <input className='form-control' id='GHICHU' type='text' placeholder='' onChange={this.handleInput('text', 'GHICHU')} value={this.state.text.GHICHU}/>
                            </div>
                            <div className='col-md-6 col-12' style={{ display: 'inline-flex' }}>
                                    <label htmlFor='userActive'>Xóa: </label>&nbsp;&nbsp;
                                    <div className='toggle'>
                                        <label>
                                            <input type='checkbox' id='userActive' onChange={() => { }} /><span className='button-indecator' />
                                        </label>
                                    </div>
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