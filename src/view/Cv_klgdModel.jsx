import React from 'react';

export default class Cv_klgdModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#TEN_CV').focus());
        }, 250));
    }

    show(item) {
        const { _id, TEN_CV, GHI_CHU } = item ?
            item : { _id: null, TEN_CV: '', GHI_CHU:'' };
        $('#TEN_CV').val(TEN_CV);
        $('#GHI_CHU').val(GHI_CHU);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            TEN_CV: this.state.text.TEN_CV,
            GHI_CHU: this.state.text.GHI_CHU
        };
        if (changes.TEN_CV == '') {
            T.notify('Tên công việc khối lượng giảng dạy đang trống!', 'danger');
            $('#TEN_CV').focus();
        } else if (this.state._id) {
            this.props.updateCv_klgd(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createCv_klgd(changes, data => {
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
                            <h5 className='modal-title'>Thông tin công việc khối lượng giảng dạy</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='TEN_CV'>Tên công việc khối lượng giảng dạy</label>
                                <input className='form-control' id='Tencv_klgd' type='text' placeholder='Tên công việc khối lượng giảng dạy' onChange={this.handleInput('text', 'TEN_CV')} value={this.state.text.TEN_CV}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU'>Ghi chú</label>
                                <input className='form-control' id='Ghi_chu' type='text' placeholder='Ghi chú' onChange={this.handleInput('text', 'GHI_CHU')} value={this.state.text.GHI_CHU}/>
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