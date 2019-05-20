import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_bbaoPage from './Qt_bbaoPage.jsx';

export default class Qt_bbaoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', cbcnv: []};
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
        
        const { _id, MS_NV, STT, BAI_BAO, TEN_TCHI, NAM} = item ?
            item : { _id: null, MS_NV: '', STT: '', BAI_BAO: '', TEN_TCHI: '', NAM: ''};
        $('#MS_NV').val(MS_NV);
        $('#STT').val(STT);
        $('#BAI_BAO').val(BAI_BAO);
        $('#TEN_TCHI').val(TEN_TCHI);
        $('#NAM').val(NAM);

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
                BAI_BAO: this.state.text.BAI_BAO, 
                TEN_TCHI: this.state.text.TEN_TCHI, 
                NAM: this.state.number.NAM,                                 };    
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (!changes.STT) {
            T.notify('STT đang trống!', 'danger');
            $('#STT').focus();
        } else if (this.state._id) {
            this.props.updateQt_bbao(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_bbao(changes, data => {                    
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
                            <h5 className='modal-title'>Thông tin quản trị bài báo</h5>
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
                                <label htmlFor='BAI_BAO'>Bài báo</label>
                                <input className='form-control' id='BAI_BAO' type='text' placeholder='' onChange={this.handleInput('text', 'BAI_BAO')} value={this.state.text.BAI_BAO}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='TEN_TCHI'>Tên tạp chí</label>
                                <input className='form-control' id='TEN_TCHI' type='text' placeholder='' onChange={this.handleInput('text', 'TEN_TCHI')} value={this.state.text.TEN_TCHI}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NAM'>Năm</label>
                                <input className='form-control' id='NAM' type='number' placeholder='' onChange={this.handleInput('number', 'NAM')} value={this.state.number.NAM}/>
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