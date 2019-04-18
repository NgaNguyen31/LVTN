import React from 'react';

export default class ChinhsachModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#TEN_CS').focus());
        }, 250));
    }

    show(item) {
        const { _id, TEN_CS } = item ?
            item : { _id: null, TEN_CS: '' };
        $('#TEN_CS').val(TEN_CS);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            TEN_CS: this.state.text.TEN_CS,
        };
        if (changes.TEN_CS == '') {
            T.notify('Tên chính sách đang trống!', 'danger');
            $('#TEN_CS').focus();
        } else if (this.state._id) {
            this.props.updateChinhsach(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createChinhsach(changes, data => {
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
                            <h5 className='modal-title'>Thông tin chính sách</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='TEN_CS'>Tên chính sách</label>
                                <input className='form-control' id='Tenchinhsach' type='text' placeholder='Tên chính sách' onChange={this.handleInput('text', 'TEN_CS')} value={this.state.text.TEN_CS}/>
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