import React from 'react';

export default class PhanloaiModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#ORD').focus());
        }, 250));
    }

    show(item) {
        const { _id, ORD , LOAI } = item ?
            item : { _id: null, ORD: '', LOAI: '' };
        $('#ORD').val(ORD);
        $('#LOAI').val(LOAI);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            ORD: this.state.text.ORD,
            LOAI: this.state.text.LOAI,
        };
        if (this.state.text == '')  {
            T.notify('Bạn phải điền dữ liệu!', 'danger');
            $('#ORD').focus();
        } else if (changes.ORD == '') {
            T.notify('ORD đang trống!', 'danger');
            $('#ORD').focus();
        } else if (changes.LOAI == '') {
            T.notify('Loại đang trống!', 'danger');
            $('#LOAI').focus();
        } else if (changes.ORD < 0) {
            T.notify('ORD không được là số âm', 'danger');
            $('#ORD').focus();
        } else if (this.state._id) {
            this.props.updatePhanloai(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createPhanloai(changes, data => {
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
                            <h5 className='modal-title'>Phân loại</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='tenloai'>ORD</label>
                                <input className='form-control' id='Tenord' type='number' placeholder='ORD' onChange={this.handleInput('text', 'ORD')} value={this.state.text.ORD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='diengiai'>Loại</label>
                                <input className='form-control' id='loai' type='text' placeholder='Loại' onChange={this.handleInput('text', 'LOAI')} value={this.state.text.LOAI}/>
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