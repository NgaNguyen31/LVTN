import React from 'react';

export default class HesoModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#MLTT').focus());
        }, 250));
    }

    show(item) {
        const { _id, MLTT, TL } = item ?
            item : { _id: null, MLTT: '', TL: '' };
        $('#MLTT').val(MLTT);
        $('#TL').val(TL);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            MLTT: this.state.text.MLTT,
            TL: this.state.text.TL,
        };
        if (this.state.text =='') {
            T.notify('Bạn phải điền giá trị!', 'danger');
            $('#MLTT').focus();
        }else if (!changes.MLTT) {
            T.notify('MLTT đang trống!', 'danger');
            $('#MLTT').focus();
        } else if (!changes.TL) {
            T.notify('TL đang trống!', 'danger');
            $('#TL').focus();
        } else if (this.state._id) {
            this.props.updateHeso(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createHeso(changes, data => {
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
                            <h5 className='modal-title'>Thông tin hê số</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='MLTT'>MLTT</label>
                                <input className='form-control' id='Tenheso' type='number' onChange={this.handleInput('text', 'MLTT')} value={this.state.text.MLTT}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TL'>Tiền lương</label>
                                <input className='form-control' id='tienluong' type='number' onChange={this.handleInput('text', 'TL')} value={this.state.text.TL}/>
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