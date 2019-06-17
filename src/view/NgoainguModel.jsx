import React from 'react';

export default class NgoainguModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#N_NGU').focus());
        }, 250));
    }

    show(item) {
        const { _id, N_NGU } = item ?
            item : { _id: null, N_NGU: '' };
        $('#N_NGU').val(N_NGU);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            N_NGU: this.state.text.N_NGU,
        };
        if (changes.N_NGU == null) {
            T.notify('Tên ngoại ngữ đang trống!', 'danger');
            $('#N_NGU').focus();
        } else if (this.state._id) {
            this.props.updateNgoaingu(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createNgoaingu(changes, data => {
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
                            <h5 className='modal-title'>Thông tin ngoại ngữ</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='N_NGU'>Tên ngoại ngữ</label>
                                <input className='form-control' id='N_NGU' type='text' onChange={this.handleInput('text', 'N_NGU')} value={this.state.text.N_NGU}/>
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