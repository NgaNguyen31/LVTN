import React from 'react';
import Dropdown from './Dropdown.jsx';
import NuocngoaiPage from './NuocngoaiPage.jsx';

export default class NuocngoaiModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', khuvuc: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.khuvuc = React.createRef();
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
            $(this.modal.current).on('shown.bs.modal', () => $('#TEN_NUOC').focus());
        }, 250));
    }

    show(item, khuvuc) {      
        
        const { _id, TEN_NUOC, MS_KVUC} = item ?
            item : { _id: null, TEN_NUOC: '', MS_KVUC: ''};
        $('#TEN_NUOC').val(TEN_NUOC);
        $('#MS_KVUC').val(MS_KVUC);
        
        this.setState({ _id, khuvuc: khuvuc? khuvuc: []});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const khuvuc = this.khuvuc.current.getSelectedItem(),            
            MS_KVUC = khuvuc? khuvuc : [],
             changes = {
                TEN_NUOC: this.state.text.TEN_NUOC, 
                MS_KVUC,                                    };    
        if (changes.TEN_NUOC == '') {
            T.notify('Tên nước đang trống!', 'danger');
            $('#TEN_NUOC').focus();
        } else if (!changes.MS_KVUC) {
            T.notify('MSKV đang trống!', 'danger');
            $('#MS_KVUC').focus();
        } else if (this.state._id) {
            this.props.updateNuocngoai(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createNuocngoai(changes, data => {                
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        const khuvuc = this.state && this.state.khuvuc && this.state.khuvuc.khuvuc?this.state.khuvuc.khuvuc : [];
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin nước ngoài</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>    
                            <div className='form-group'>
                                <label htmlFor='TEN_NUOC'>Tên nước</label>
                                <input className='form-control' id='TEN_NUOC' type='text' placeholder='' onChange={this.handleInput('text', 'TEN_NUOC')} value={this.state.text.TEN_NUOC}/>
                            </div>                        
                            <div className='form-group'>
                                <label htmlFor='MS_KVUC'>Tên KV</label>
                                <Dropdown ref={this.khuvuc} text='' items={khuvuc.map(e => Object.assign({}, e, {text: e.TEN_KVUC}))} />
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