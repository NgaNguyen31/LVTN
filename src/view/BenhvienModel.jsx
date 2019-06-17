import React from 'react';

export default class BenhvienModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: {Noi_kham: ''}}
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
            $(this.modal.current).on('shown.bs.modal', () => $('#Noi_kham').focus());
        }, 250));
    }

    show(item) {
        const { _id, Noi_kham } = item ?
            item : { _id: null, Noi_kham: null };
        $('#Noi_kham').val(Noi_kham);
        const state = this.state;
        state._id = _id;
        state.text.Noi_kham = Noi_kham; 
        this.setState(state);
        $(this.modal.current).modal('show');
    }

    save(e) {
        const changes = {
            Noi_kham: this.state.text.Noi_kham,
        };
        if (changes.Noi_kham == '') {
            T.notify('Tên bệnh viện đang trống!', 'danger');
            $('#Noi_kham').focus();
        } else if (this.state._id) {
            this.props.updateBenhvien(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createBenhvien(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin bệnh viện</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='Noi_kham'>Tên bệnh viện</label>
                                <input className='form-control' id='Noi_kham' type='text' onChange={this.handleInput('text', 'Noi_kham')} value={this.state.text.Noi_kham}/>
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