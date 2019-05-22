import React from 'react';
import Dropdown from './Dropdown.jsx';
import TrinhdoPage from './TrinhdoPage.jsx';

export default class TrinhdoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', phanloai: []}
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

    show(item, phanloai) {        
        const { _id, trinh_do, Ten_day_du, ord } = item ?
            item : { _id: null, trinh_do: '', Ten_day_du: '', ord: ''};
        $('#trinh_do').val(trinh_do);
        $('#Ten_day_du').val(Ten_day_du);
        $('#ord').val(ord);
        this.setState({ _id, phanloai: phanloai? phanloai: []});
        $(this.modal.current).modal('show');
    }

    save(e) {        
        e.preventDefault();
        const phanloai = this.phanloai.current.getSelectedItem(),
            ord = phanloai? phanloai._id: null,
            changes = {
                trinh_do: this.state.text.trinh_do,
                Ten_day_du: this.state.text.Ten_day_du,
                ord,
        };        
        if (this.state.text == '') {
            T.notify('Bạn chưa điền thông tin!', 'danger');
            $('#Hovaten').focus();
        } else if (changes.trinh_do == '') {
            T.notify('Trình độ đang trống!', 'danger');
            $('#trinh_do').focus();            
        } else if (changes.Ten_day_du == '') {
            T.notify('Tên đầy đủ đang trống!', 'danger');
            $('#Ten_day_du').focus();            
        } else if (changes.ord == '') {
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
        const phanloai = this.state && this.state.phanloai && this.state.phanloai.phanloai ? this.state.phanloai.phanloai : [];
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
                                <input className='form-control' id='trinhdo' type='text' onChange={this.handleInput('text', 'trinh_do')} value={this.state.text.trinh_do}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ten_day_du'>Tên đầy đủ</label>
                                <input className='form-control' id='ten_day_du' type='text' onChange={this.handleInput('text', 'Ten_day_du')} value={this.state.text.Ten_day_du}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Ngaydi'>ORD</label>
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