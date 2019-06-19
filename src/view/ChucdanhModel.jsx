import React from 'react';
import Dropdown from './Dropdown.jsx';
import ChucdanhPage from './ChucdanhPage.jsx';
import Select from 'react-select';


export default class ChucdanhModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', trinhdo: [], selectedtrinhdo: [] };
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.trinhdo = React.createRef();     
        this.selectedtrinhdo = React.createRef();
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
                case 'trinhdo':
                    state.selectedtrinhdo = e;
                    break;
            }

            this.setState(state);
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#chuc_danh').focus());
        }, 250));
    }

    show(item, trinhdo) {    
        
        const { _id, chuc_danh, ten_day_du, ord } = item ?
            item : { _id: null, chuc_danh: null, ten_day_du: null, ord: null};
        $('#chuc_danh').val(chuc_danh);
        $('#ten_day_du').val(ten_day_du);
        $('#ord').val(ord);        
        
        this.setState({ _id, trinhdo: trinhdo? trinhdo: []});
        let trinhdoLabel = ord? ({value: ord._id, label: ord.ord}) : [];
        this.setState({selectedtrinhdo:trinhdoLabel});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const trinhdo = this.state.selectedtrinhdo ? this.state.selectedtrinhdo.value : null,
            ord = trinhdo,
             changes = {
                chuc_danh: this.state.text.chuc_danh,
                ten_day_du: this.state.text.ten_day_du,
                ord,
            };    
        if (chuc_danh.value == null) {
            T.notify('Chức danh đang trống!', 'danger');
            $('#chuc_danh').focus();
        } else if (ten_day_du.value == null) {
            T.notify('Tên đầy đủ đang trống!', 'danger');
            $('#ten_day_du').focus();
        } else if (changes.ord == null) {
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
        const trinhdo = this.state && this.state.trinhdo && this.state.trinhdo.trinhdo? this.state.trinhdo.trinhdo : [];      
        const selectedtrinhdo = this.state.selectedtrinhdo;

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
                                <input className='form-control' id='chuc_danh' type='text' onChange={this.handleInput('text', 'chuc_danh')} value={this.state.text.chuc_danh}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ten_day_du'>Tên đầy đủ</label>
                                <input className='form-control' id='ten_day_du' type='text' onChange={this.handleInput('text', 'ten_day_du')} value={this.state.text.ten_day_du}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ord'>ORD</label>
                                <Select
                                value = {selectedtrinhdo}
                                onChange =  {this.handleInput('trinhdo')}
                                options = {trinhdo.map(e => Object.assign({}, {label: e.ord, value: e}))}
                                />
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