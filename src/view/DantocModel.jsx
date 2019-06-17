import React from 'react';

export default class DantocModal extends React.Component {
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
            $(this.modal.current).on('shown.bs.modal', () => $('#Dan_toc').focus());
        }, 250));
    }

    show(item) {
        const { _id, Dan_toc } = item ?
            item : { _id: null, Dan_toc: null };
        $('#Dan_toc').val(Dan_toc);
        this.setState({ _id});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const changes = {
            Dan_toc: this.state.text.Dan_toc,
        };
        if (changes.Dan_toc == null) {
            T.notify('Tên dân tộc đang trống!', 'danger');
            $('#Dan_toc').focus();
        } else if (this.state._id) {
            this.props.updateDantoc(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createDantoc(changes, data => {
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
                            <h5 className='modal-title'>Thông tin dân tộc</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='Dan_toc'>Tên dân tộc</label>
                                <input className='form-control' id='Dan_toc' type='text' onChange={this.handleInput('text', 'Dan_toc')} value={this.state.text.Dan_toc}/>
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