import React from 'react';
import Dropdown from './Dropdown.jsx';
import Cbcnv_hd_khoaPage from './Cbcnv_hd_khoaPage.jsx';

export default class Cbcnv_hd_khoaModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', date: '', trinhdo: [], bomon: []}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.bomon = React.createRef();
        this.phai = React.createRef();
    }

    handleInput(type, field, args) {
        return e => {
            const state = this.state;
            switch (type) {
                case 'text':
                    state.text ? (state.text[field] = e.target.value)
                    : (state.text = {}) && (state.text[field] = e.target.value)
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
            $(this.modal.current).on('shown.bs.modal', () => $('#MSNV').focus());
        }, 250));
    }

    show(item, bomon ) {      
        const { _id, MSBM, HO, TEN, PHAI, NAM_SINH, The_BHYT, Noi_kham, LCB, PC, Xoa } = item ?
            item : { _id: null, MSBM: '', HO: '', TEN: '', PHAI: '', NAM_SINH:'', The_BHYT: '', Noi_kham: '', LCB: '', PC: '', Xoa: ''};
        $('#MSBM').val(MSBM);
        $('#HO').val(HO);
        $('#TEN').val(TEN);
        $('#PHAI').val(PHAI);
        $('#NAM_SINH').val(NAM_SINH);
        $('#The_BHYT').val(The_BHYT);
        $('#Noi_kham').val(Noi_kham);
        $('#LCB').val(LCB);
        $('#PC').val(PC);
        $('#Xoa').prop('checked', Xoa);
        
        this.setState({ _id, bomon: bomon? bomon: []});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const bomon = this.bomon.current.getSelectedItem(),
            phai = this.phai.current.getSelectedItem(),
            MSBM = bomon? bomon._id: [],
            PHAI = phai? phai : [],
            changes = {
                MSBM,
                HO: this.state.text.HO,
                TEN: this.state.text.TEN,
                PHAI,                
                NAM_SINH: this.state.date.NAM_SINH,
                The_BHYT: this.state.text.The_BHYT,
                Noi_kham: this.state.text.Noi_kham,       
                LCB: this.state.text.LCB,
                PC: this.state.text.PC,
                Xoa: $('#Xoa').prop('checked'),
        };
        if (!changes.MSBM) {
            T.notify('MSBM đang trống!', 'danger');
            $('#MSBM').focus(); 
        } else if (changes.HO == '') {
            T.notify('Họ đang trống!', 'danger');
            $('#HO').focus();  
        } else if (changes.TEN == '') {  
            T.notify('Tên đang trống!', 'danger');
            $('#TEN').focus();             
        } else if (changes.NAM_SINH == '') {
            T.notify('Năm sinh đang trống!', 'danger');
            $('#NAM_SINH').focus();            
        } else if (this.state._id) {
            this.props.updateCbcnv_hd_khoa(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createCbcnv_hd_khoa(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
    }

    render() {        
        const bomon = this.state && this.state.bomon && this.state.bomon.bomon ? this.state.bomon.bomon : [];

        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin CBCNV hợp đồng khoa</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='MSNV'>MSBM</label>
                                <Dropdown ref={this.bomon} number='' items={bomon.map(e => Object.assign({}, e, {text: e.TEN_BM}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HO'>Họ</label>
                                <input className='form-control' id='HO' type='text' onChange={this.handleInput('text', 'HO')} value={this.state.text.HO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TEN'>Tên </label>
                                <input className='form-control' id='TEN' type='text' onChange={this.handleInput('text', 'TEN')} value={this.state.text.TEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PHAI'>Phái</label>
                                <Dropdown ref={this.phai} items = {T.phais}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="NAM_SINH">Năm sinh</label>
                                <input className='form-control' id='NAM_SINH' type='date' placeholder='' onChange={this.handleInput('date', 'NAM_SINH')} value={this.state.date.NAM_SINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="The_BHYT">Thẻ BHYT</label>
                                <input className='form-control' id='The_BHYT' type='text' placeholder='' onChange={this.handleInput('text', 'The_BHYT')} value={this.state.text.The_BHYT}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="Noi_kham">Nơi khám</label>
                                <input className='form-control' id='Noi_kham' type='text' placeholder='' onChange={this.handleInput('text', 'Noi_kham')} value={this.state.text.Noi_kham}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor="LCB">LCB</label>
                                <input className='form-control' id='LCB' type='text' placeholder='' onChange={this.handleInput('text', 'LCB')} value={this.state.text.LCB}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PC'>PC</label>
                                <input className='form-control' id='PC' type='text' onChange={this.handleInput('text', 'PC')} value={this.state.text.PC}/>
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