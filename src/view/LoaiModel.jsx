import React from 'react';

export default class LoaiModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#LOAI').focus());
        }, 250));
    }

    show(item) {
        const { _id, LOAI, Dien_giai } = item ?
            item : { _id: null, LOAI: '', Dien_giai: '' };
        $('#LOAI').val(LOAI);
        $('#Dien_giai').val(Dien_giai);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            LOAI: this.state.text.LOAI,
            Dien_giai: this.state.text.Dien_giai,
        };
        if (changes.LOAI == '') {
            T.notify('Tên loại đang trống!', 'danger');
            $('#LOAI').focus();
        } else if (changes.Dien_giai == '') {
            T.notify('Diễn giải đang trống!', 'danger');
            $('#Dien_giai').focus();
        } else if (this.state._id) {
            this.props.updateLoai(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createLoai(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin loại</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>Loại</label>
                                <input className='form-control' id='Tenloai' type='text' placeholder='Loại' onChange={this.handleInput('text', 'LOAI')} value={this.state.text.LOAI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='diengiai'>Diễn giải</label>
                                <input className='form-control' id='Dien_giai' type='text' placeholder='Diễn giải' onChange={this.handleInput('text', 'Dien_giai')} value={this.state.text.Dien_giai}/>
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