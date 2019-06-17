import React from 'react';
import Dropdown from './Dropdown.jsx';
import TrinhdoPage from './TrinhdoPage.jsx';

export default class TrinhdoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(type, field, args) {
        return e => {
            const state = this.state;
            switch (type) {
                case 'text':
                    state.text ? (state.text[field] = e.target.value)
                    : (state.text = {}) && (state.text[field] = e.target.value)
            }

            this.setState(state);
            e.preventDefault();
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#trinh_do').focus());
        }, 250));
    }

    show(item) {        
        const { _id, trinh_do, Ten_day_du, ord } = item ?
            item : { _id: null, trinh_do: null, Ten_day_du: null, ord: null};
        $('#trinh_do').val(trinh_do);
        $('#Ten_day_du').val(Ten_day_du);
        $('#ord').val(ord);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {        
        e.preventDefault();
        const changes = {
                trinh_do: this.state.text.trinh_do,
                Ten_day_du: this.state.text.Ten_day_du,
                ord: this.state.text.ord,
        };        
        if (changes.trinh_do == null) {
            T.notify('Trình độ đang trống!', 'danger');
            $('#trinh_do').focus();            
        } else if (changes.Ten_day_du == null) {
            T.notify('Tên đầy đủ đang trống!', 'danger');
            $('#Ten_day_du').focus();            
        } else if (changes.ord == null) {
            T.notify('Ord đang trống!', 'danger');
            $('#ord').focus();                 
        } else if (this.state._id) {
            this.props.updateTrinhdo(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createTrinhdo(changes, data => {
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
                            <h5 className='modal-title'>Thông tin Trình độ</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='trinhdo'>Trình độ</label>
                                <input className='form-control' id='trinh_do' type='text' onChange={this.handleInput('text', 'trinh_do')} value={this.state.text.trinh_do}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ten_day_du'>Tên đầy đủ</label>
                                <input className='form-control' id='Ten_day_du' type='text' onChange={this.handleInput('text', 'Ten_day_du')} value={this.state.text.Ten_day_du}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Ngaydi'>ORD</label>
                                <input className='form-control' id='ord' type='number' onChange={this.handleInput('text', 'ord')} value={this.state.text.ord}/>
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