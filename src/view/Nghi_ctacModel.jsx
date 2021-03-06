import React from 'react';

export default class Nghi_ctacModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#NGHI').focus());
        }, 250));
    }

    show(item) {
        const { _id, NGHI, Dien_giai } = item ?
            item : { _id: null, NGHI: null, Dien_giai: null };
        $('#NGHI').val(NGHI);
        $('#Dien_giai').val(Dien_giai);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            NGHI: this.state.text.NGHI,
            Dien_giai: this.state.text.Dien_giai,
        };
        if (changes.NGHI == null) {
            T.notify('Loại nghỉ công tác đang trống!', 'danger');
            $('#NGHI').focus();
        } else if (changes.Dien_giai == null) {
            T.notify('Diễn giải đang trống!', 'danger');
            $('#Dien_giai').focus();
        } else if (this.state._id) {
            this.props.updateNghi_ctac(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createNghi_ctac(changes, data => {
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
                            <h5 className='modal-title'>Thông tin nghỉ công tác</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='tennghi_ctac'>Loại</label>
                                <input className='form-control' id='NGHI' type='text' onChange={this.handleInput('text', 'NGHI')} value={this.state.text.NGHI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='diengiai'>Diễn giải</label>
                                <input className='form-control' id='Dien_giai' type='text' onChange={this.handleInput('text', 'Dien_giai')} value={this.state.text.Dien_giai}/>
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