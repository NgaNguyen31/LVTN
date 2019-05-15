import React from 'react';
import Dropdown from './Dropdown.jsx';
import KiemnhiemPage from './KiemnhiemPage.jsx';

export default class KiemnhiemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', cbcnv: [], bomon: [], chucvu: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.bomon = React.createRef();
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

    show(item, cbcnv, bomon, chucvu) {      
        
        const { _id, MS_NV, MS_BM, MS_CVU, NGAY_CVU, GHICHU, Xoa} = item ?
            item : { _id: null, MS_NV: '', MS_BM: '', MS_CVU: '', NGAY_CVU: '', GHICHU: '', Xoa: ''};
        $('#MS_NV').val(MS_NV);
        $('#MS_BM').val(MS_BM);
        $('#MS_CVU').val(MS_CVU);
        $('#NGAY_CVU').val(NGAY_CVU);
        $('#GHICHU').val(GHICHU);
        $('#Xoa').prop('checked', Xoa);
        
        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], bomon: bomon? bomon: [], chucvu: chucvu? chucvu:[]});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const cbcnv = this.cbcnv.current.getSelectedItem(),
            bomon = this.bomon.current.getSelectedItem(),
            chucvu = this.chucvu.current.getSelectedItem(),
            MS_NV = cbcnv? cbcnv : [],
            MS_BM = bomon? bomon : [],
            MS_CVU = chucvu? chucvu : [],
             changes = {
                MS_NV,
                MS_BM,
                MS_CVU,
                NGAY_CVU: this.state.text.NGAY_CVU, 
                GHICHU : this.state.text.GHICHU, 
                Xoa: $('#Xoa').prop('checked'),         
            };    
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (!changes.MS_BM) {
            T.notify('MSBM đang trống!', 'danger');
            $('#MS_BM').focus();
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
        const bomon = this.state && this.state.bomon && this.state.bomon.bomon?this.state.bomon.bomon : [];
        const chucvu = this.state && this.state.chucvu && this.state.chucvu.chucvu?this.state.chucvu.chucvu : [];
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin kiểm nhiệm</h5>
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
                                <label htmlFor='MS_BM'>MSBM</label>
                                <Dropdown ref={this.bomon} text='' items={bomon.map(e => Object.assign({}, e, {text: e.TEN_BM}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MS_CVU'>MSCVụ</label>
                                <Dropdown ref={this.chucvu} text='' items={chucvu.map(e => Object.assign({}, e, {text: e.CHUC_VU}))} />
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
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                            <button type='button' className='btn btn-primary' ref={this.btnSave} onClick={this.save}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}