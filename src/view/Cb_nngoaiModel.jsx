import React from 'react';
import Dropdown from './Dropdown.jsx';
import Cb_nngoaiPage from './Cb_nngoaiPage.jsx';
import Select from 'react-select';

export default class Cb_nngoaiModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', nuocngoai: [], cbcnv: [], giahan: [], selectedcbcnv: [], selectednuoc: [], selectedgiahan: null}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.nuocngoai = React.createRef();
        this.cbcnv = React.createRef();
        this.giahan = React.createRef();
        this.selectedcbcnv = React.createRef();
        this.selectednuoc = React.createRef();
        this.selectedgiahan = React.createRef();
    }

    handleInput(type, field, args) {
        return e => {
            const state = this.state;
            switch (type) {
                case 'text':
                    state.text ? (state.text[field] = e.target.value)
                    : (state.text = {}) && (state.text[field] = e.target.value)                    
                    e.preventDefault();
                    break;
                case 'cbcnv':
                    state.selectedcbcnv = e;
                    break;
                case 'nuocngoai':
                    state.selectednuoc = e;
                    break; 
                case 'giahan':
                    state.selectedgiahan = e;
                    break;              
            }
            this.setState(state);
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#Hovaten').focus());
        }, 250));
    }

    show(item, cbcnv, nuocngoai ) {      
        const { _id, Hovaten, Nuoc, Ngaydi, Ngayve, Thoigian, Mucdich, Giahan, SoCVan, NgayCVan } = item ?
            item : { _id: null, Hovaten: null, Nuoc: null, Ngaydi: null, Ngayve: null, Thoigian: null, Mucdich: null, Giahan: null, SoCVan: null, NgayCVan: null};
        $('#Hovaten').val(Hovaten);
        $('#Nuoc').val(Nuoc);
        $('#Ngaydi').val(T.dateToText(Ngaydi,'yyyy-mm-dd'));
        $('#Ngayve').val(T.dateToText(Ngayve,'yyyy-mm-dd'));
        $('#Thoigian').val(Thoigian);
        $('#Mucdich').val(Mucdich);
        $('#Giahan').val(Giahan);
        $('#SoCVan').val(SoCVan);
        $('#NgayCVan').val(T.dateToText(NgayCVan,'yyyy-mm-dd'));
        // Hovaten ? this.cbcnv.current.setText(Object.assign({}, Hovaten, {text: Hovaten.HO + ' ' + Hovaten.TEN})) : null;
        // Nuoc ? this.nuocngoai.current.setText(Object.assign({}, Nuoc, {text: Nuoc.TEN_NUOC})) : null;
        Giahan ? this.giahan.current.setText(Giahan) : null;
        // Hovaten ? Hovaten.HO + ' ' + Hovaten.TEN : [];
        // Nuoc ? Nuoc.TEN_NUOC : [];
        // Giahan ? Giahan : [];        
        this.setState({ _id, nuocngoai: nuocngoai? nuocngoai: [], cbcnv: cbcnv? cbcnv: []});
        let hovatenLabel = Hovaten ? ({value: Hovaten._id,label: Hovaten.HO + ' ' + Hovaten.TEN}): null;        
        let nuocLabel = Nuoc ? ({value: Nuoc._id, label:Nuoc.TEN_NUOC}): null;
        let giahanLabel = Giahan ? Giahan : null;
        this.setState({selectedcbcnv: hovatenLabel, selectednuoc:nuocLabel, selectedgiahan:giahanLabel});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const 
            giahan = this.giahan.current.getSelectedItem(),
            nuocngoai = this.state.selectednuoc ? this.state.selectednuoc.value : null,
            cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value._id : null,
            Nuoc = nuocngoai,
            Hovaten = cbcnv,
            Giahan = giahan,
            changes = {
                Hovaten,
                Nuoc,
                Ngaydi: this.state.text.Ngaydi,
                Ngayve: this.state.text.Ngayve,
                Thoigian: this.state.text.Thoigian,
                Mucdich: this.state.text.Mucdich,
                Giahan,
                SoCVan: this.state.text.SoCVan,
                NgayCVan: this.state.text.NgayCVan,
        };
        if (changes.Hovaten == null) {
            T.notify('Họ và tên đang trống!', 'danger');
            $('#Hovaten').focus();            
        } else if (changes.Nuoc == null) {
            T.notify('Nước đang trống!', 'danger');
            $('#Nuoc').focus();            
        } else if (changes.Thoigian == null) {
            T.notify('Thời gian đang trống!', 'danger');
            $('#Thoigian').focus();            
        } else if (changes.Thoigian < 0) {
            T.notify('Thời gian Không được là số âm!', 'danger');
            $('#Thoigian').focus();            
        } else if (changes.Mucdich == null) {
            T.notify('Mục đích đang trống!', 'danger');
            $('#Mucdich').focus();            
        } else if (changes.Giahan == null) {
            T.notify('Gia hạn đang trống!', 'danger');
            $('#Giahan').focus();            
        } else if (changes.SoCVan == null) {
            T.notify('Số công văn đang trống!', 'danger');
            $('#SoCVan').focus();            
        } else if (changes.SoCVan < 0 ) {
            T.notify('Số công văn không được âm!', 'danger');
            $('#SoCVan').focus();            
        } else if (changes.NgayCVan == null) {
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
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv ? this.state.cbcnv.cbcnv : [];
        const nuocngoai = this.state && this.state.nuocngoai && this.state.nuocngoai.nuocngoai ? this.state.nuocngoai.nuocngoai : [];
        const selectedcbcnv = this.state.selectedcbcnv;
        const selectednuoc = this.state.selectednuoc;
        
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
                                <Select
                                value = {selectedcbcnv}
                                onChange =  {this.handleInput('cbcnv')}
                                options = {cbcnv.map(e => Object.assign({}, {label: e.HO + ' ' + e.TEN, value: e}))}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Nuoc'>Nước</label>
                                <Select
                                value = {selectednuoc}
                                onChange =  {this.handleInput('nuocngoai')}
                                options = {nuocngoai.map(e => Object.assign({}, {label: e.TEN_NUOC, value: e}))}
                                />
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
                                <Dropdown ref={this.giahan} number='' items={T.giahans} />
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
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Đóng</button>
                            <button type='button' className='btn btn-primary' ref={this.btnSave} onClick={this.save}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}