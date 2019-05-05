import React from 'react';
import Dropdown from './Dropdown.jsx';
import KhuvucPage from './KhuvucPage.jsx';

export default class KhuvucModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: ''};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.chau = React.createRef();
        
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
            $(this.modal.current).on('shown.bs.modal', () => $('#TEN_KVUC').focus());
        }, 250));
    }

    show(item) {      
        
        const { _id, TEN_KVUC, MS_CHAU} = item ?
            item : { _id: null, TEN_KVUC: '', MS_CHAU: ''};
        $('#TEN_KVUC').val(TEN_KVUC);
        $('#MS_CHAU').val(MS_CHAU);
        this.setState({ _id});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const chau = this.chau.current.getSelectedItem(),
            MS_CHAU = chau? chau : null,
             changes = {
                TEN_KVUC: this.state.text.TEN_KVUC, 
                MS_CHAU,          
            };    
            console.log(changes);
                        
        if (!changes.TEN_KVUC) {
            T.notify('Tên khu vưc đang trống!', 'danger');
            $('#TEN_KVUC').focus();
        } else if (!changes.MS_CHAU) {
            T.notify('Mã số châu đang trống!', 'danger');
            $('#MS_CHAU').focus();
        } else if (this.state._id) {
            this.props.updateKhuvuc(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createKhuvuc(changes, data => {                
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin khu vực</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='TEN_KVUC'>Tên khu vực</label>
                                <input className='form-control' id='TEN_KVUC' type='text' placeholder='Tên khu vực' onChange={this.handleInput('text', 'TEN_KVUC')} value={this.state.text.TEN_KVUC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MS_CHAU'>Mã số châu</label>
                                <Dropdown ref={this.chau} text='' items={T.chaus} />
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