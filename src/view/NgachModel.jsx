import React from 'react';

export default class NgachModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#NGACH').focus());
        }, 250));
    }

    show(item) {
        const { _id, NGACH, TEN_NGACH } = item ?
            item : { _id: null, NGACH: '', TEN_NGACH: '' };
        $('#NGACH').val(NGACH);
        $('#TEN_NGACH').val(TEN_NGACH);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            NGACH: this.state.text.NGACH,
            TEN_NGACH: this.state.text.TEN_NGACH,
        };
        if (this.state.text =='') {
            T.notify('Bạn phải điền giá trị!', 'danger');
            $('#NGACH').focus();
        } else if (!changes.NGACH) {
            T.notify('Ngạch đang trống!', 'danger');
            $('#NGACH').focus();
        } else if (!changes.TEN_NGACH) {
            T.notify('Tên ngạch đang trống!', 'danger');
            $('#TEN_NGACH').focus();
        } else if (this.state._id) {
            this.props.updateNgach(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createNgach(changes, data => {
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
                            <h5 className='modal-title'>Thông tin loại</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='tenngach'>Ngạch</label>
                                <input className='form-control' id='Tenngach' type='number' placeholder='Ngạch' onChange={this.handleInput('text', 'NGACH')} value={this.state.text.NGACH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='diengiai'>Tên ngạch</label>
                                <input className='form-control' id='TEN_NGACH' type='text' placeholder='Tên ngạch' onChange={this.handleInput('text', 'TEN_NGACH')} value={this.state.text.TEN_NGACH}/>
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