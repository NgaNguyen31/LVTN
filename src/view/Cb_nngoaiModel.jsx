import React from 'react';
import Dropdown from './Dropdown.jsx';
import Cb_nngoaiPage from './Cb_nngoaiPage.jsx'

export default class Cb_nngoaiModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', nuoc: [], cbcnv: []}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.nuoc = React.createRef();
        this.cbcnv = React.createRef();
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
            $(this.modal.current).on('shown.bs.modal', () => $('#Hovaten').focus());
        }, 250));
    }

    show(item, cbcnv, nuoc ) {        
        const { _id, Hovaten, Nuoc, Ngaydi, Ngayve, Thoigian, Mucdich, Giahan, SoCVan, NgayCVan } = item ?
            item : { _id: null, Hovaten: '', Nuoc: '', Ngaydi: '', Ngayve: '', Thoigian:'', Mucdich: '', Giahan: '', SoCVan: '', NgayCVan: '' };
        $('#Hovaten').val(Hovaten);
        $('#Nuoc').val(Nuoc);
        $('#Ngaydi').val(Ngaydi);
        $('#Ngayve').val(Ngayve);
        $('#Thoigian').val(Thoigian);
        $('#Mucdich').val(Mucdich);
        $('#Giahan').val(Giahan);
        $('#SoCVan').val(SoCVan);
        $('#NgayCVan').val(NgayCVan);
        this.setState({ _id, nuoc: nuoc? nuoc: [], cbcnv: cbcnv? cbcnv: []});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const nuoc = this.nuoc.current.getSelectedItem(),
            cbcnv = this.cbcnv.current.getSelectedItem(),
            Nuoc = nuoc? nuoc._id : null,
            Cbcnv = cbcnv? cbcnv._id: null,
            changes = {
                Cbcnv,
                Nuoc,
                Ngaydi: this.state.text.Ngaydi,
                Ngayve: this.state.text.Ngayve,
                Thoigian: this.state.text.Thoigian,
                Mucdich: this.state.text.Mucdich,
                Giahan: this.state.text.Giahan,
                SoCVan: this.state.text.SoCVan,
                NgayCVan: this.state.text.NgayCVan,
        };
        if (this.state.text == '') {
            T.notify('Bạn chưa điền thông tin!', 'danger');
            $('#Hovaten').focus();
        } else if (!changes.Cbcnv) {
            T.notify('Họ và tên đang trống!', 'danger');
            $('#Hovaten').focus();            
        } else if (!changes.Nuoc) {
            T.notify('Nước đang trống!', 'danger');
            $('#Nuoc').focus();            
        } else if (!changes.Thoigian) {
            T.notify('Thời gian đang trống!', 'danger');
            $('#Thoigian').focus();            
        } else if (!changes.Mucdich) {
            T.notify('Mục đích đang trống!', 'danger');
            $('#Mucdich').focus();            
        } else if (!changes.Giahan) {
            T.notify('Gia hạn đang trống!', 'danger');
            $('#Giahan').focus();            
        } else if (!changes.SoCVan) {
            T.notify('Số công văn đang trống!', 'danger');
            $('#SoCVan').focus();            
        } else if (!changes.NgayCVan) {
            T.notify('Ngày công văn đang trống!', 'danger');
            $('#NgayCVan').focus();            
        } else if (this.state._id) {
            this.props.updateCb_nngoai(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createCb_nngoai(changes, data => {
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
                            <h5 className='modal-title'>Thông tin Cán bộ nước ngoài</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='Hovaten'>Họ và tên</label>
                                <Dropdown ref={this.cbcnv} number='' items={this.state.cbcnv.map(e => Object.assign({}, e, {text: e.TEN}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Nuoc'>Nước</label>
                                <Dropdown ref={this.nuoc} number='' items={this.state.nuoc.map(e => Object.assign({}, e, {text: e.TEN_NUOC}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Ngaydi'>Ngày đi</label>
                                <input className='form-control' id='Ngaydi' type='date' onChange={this.handleInput('text', 'Ngaydi')} value={this.state.text.Ngaydi}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Ngayve'>Ngày về</label>
                                <input className='form-control' id='Ngayve' type='date' onChange={this.handleInput('text', 'Ngayve')} value={this.state.text.Ngayve}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Thoigian'>Thời gian</label>
                                <input className='form-control' id='Thoigian' type='number' placeholder='Thời gian' onChange={this.handleInput('text', 'Thoigian')} value={this.state.text.Thoigian}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="Mucduch">Mục đích</label>
                                <input className='form-control' id='Mucdich' type='text' placeholder='Mục đích' onChange={this.handleInput('text', 'Mucdich')} value={this.state.text.Mucdich}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="Giahan">Gia hạn</label>
                                <input className='form-control' id='Giahan' type='number' placeholder='Gia hạn' onChange={this.handleInput('text', 'Giahan')} value={this.state.text.Giahan}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="SoCVan">Số công văn</label>
                                <input className='form-control' id='SoCVan' type='number' placeholder='Số công văn' onChange={this.handleInput('text', 'SoCVan')} value={this.state.text.SoCVan}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="NgayCVan">Ngày công văn</label>
                                <input className='form-control' id='NgayCVan' type='date' placeholder='Ngày công văn' onChange={this.handleInput('text', 'NgayCVan')} value={this.state.text.NgayCVan}/>
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