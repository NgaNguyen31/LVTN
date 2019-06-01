import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_cac_conPage from './Qt_cac_conPage.jsx';

export default class Qt_cac_conModal extends React.Component {
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
        
        const { _id, MS_NV, STT, TEN, NAM_SINH, CVU, CTAC} = item ?
            item : { _id: null, MS_NV: '', STT: '', TEN: '', NAM_SINH: '', CVU: '', CTAC: ''};
        $('#MS_NV').val(MS_NV);
        $('#STT').val(STT);
        $('#TEN').val(TEN);
        $('#NAM_SINH').val(NAM_SINH);
        $('#CVU').val(CVU);
        $('#CTAC').val(CTAC);

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
                TEN: this.state.text.TEN, 
                NAM_SINH: this.state.date.NAM_SINH, 
                CVU: this.state.text.CVU,
                CTAC: this.state.text.CTAC,                                 };    
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.STT == '') {
            T.notify('STT đang trống!', 'danger');
            $('#STT').focus();
        } else if (changes.TEN == '') {
            T.notify('Tên đang trống!', 'danger');
            $('#TEN').focus();
        } else if (changes.CVU == '') {
            T.notify('Chức vụ đang trống!', 'danger');
            $('#CVU').focus();
        } else if (changes.CTAC == '') {
            T.notify('Công tác đang trống!', 'danger');
            $('#CTAC').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
        } else if (this.state._id) {
            this.props.updateQt_cac_con(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_cac_con(changes, data => {                    
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
                                <label htmlFor='TEN'>Tên</label>
                                <input className='form-control' id='TEN' type='text' placeholder='' onChange={this.handleInput('text', 'TEN')} value={this.state.text.TEN}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NAM_SINH'>Năm sinh</label>
                                <input className='form-control' id='NAM_SINH' type='date' placeholder='' onChange={this.handleInput('date', 'NAM_SINH')} value={this.state.date.NAM_SINH}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CVU'>Chức vụ</label>
                                <input className='form-control' id='CVU' type='text' placeholder='' onChange={this.handleInput('text', 'CVU')} value={this.state.text.CVU}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CTAC'>Công tác</label>
                                <input className='form-control' id='CTAC' type='text' placeholder='' onChange={this.handleInput('text', 'CTAC')} value={this.state.text.CTAC}/>
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