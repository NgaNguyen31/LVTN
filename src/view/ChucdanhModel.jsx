import React from 'react';
import Dropdown from './Dropdown.jsx';
import ChucdanhPage from './ChucdanhPage.jsx';

export default class ChucdanhModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', phanloai: [] };
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.phanloai = React.createRef();        
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
            $(this.modal.current).on('shown.bs.modal', () => $('#chuc_danh').focus());
        }, 250));
    }

    show(item, phanloai) {    
        
        const { _id, chuc_danh, ten_day_du, ord } = item ?
            item : { _id: null, chuc_danh: '', ten_day_du: '', ord: ''};
        $('#chuc_danh').val(chuc_danh);
        $('#ten_day_du').val(ten_day_du);
        $('#ord').val(ord);
        this.setState({ _id, phanloai: phanloai? phanloai: []});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const phanloai = this.phanloai.current.getSelectedItem(),
        ord = phanloai? phanloai._id: null,
             changes = {
                chuc_danh: this.state.text.chuc_danh,
                ten_day_du: this.state.text.ten_day_du,
                ord,
            };            
        if (!changes.chuc_danh) {
            T.notify('Chức danh đang trống!', 'danger');
            $('#chuc_danh').focus();
        } else if (!changes.ten_day_du) {
            T.notify('Tên đầy đủ đang trống!', 'danger');
            $('#ten_day_du').focus();
        } else if (!changes.ord) {
            T.notify('Loại đang trống!', 'danger');
            $('#ord').focus();
        } else if (this.state._id) {
            this.props.updateChucdanh(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createChucdanh(changes, data => {                
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {  
        const phanloai = this.state && this.state.phanloai && this.state.phanloai.phanloai? this.state.phanloai.phanloai : [];      
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin chức danh</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='chucdanh'>Chức danh</label>
                                <input className='form-control' id='chuc_danh' type='text' placeholder='Chức danh' onChange={this.handleInput('text', 'chuc_danh')} value={this.state.text.chuc_danh}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ten_day_du'>Tên đầy đủ</label>
                                <input className='form-control' id='ten_day_du' type='text' placeholder='Tên đầy đủ' onChange={this.handleInput('text', 'ten_day_du')} value={this.state.text.ten_day_du}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ord'>ORD</label>
                                <Dropdown ref={this.phanloai} number='' items={phanloai.map(e => Object.assign({}, e, {text: e.LOAI}))} />
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