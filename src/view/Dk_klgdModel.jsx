import React from 'react';
import Dropdown from './Dropdown.jsx';

export default class Dk_klgdModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', cbcnv: [], bomon: [], cv_klgd: []}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.bomon = React.createRef();
        this.cv_klgd = React.createRef();
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
            $(this.modal.current).on('shown.bs.modal', () => $('#MS_NV').focus());
        }, 250));
    }

    show(item, cbcnv, bomon, cv_klgd) {
        const { _id, MS_NV, STT, HO, TEN, MS_BM, MS_CV, TU_DK, NHOMLOP, SO_SV, SO_TIET_THUC, SO_TIET_QUY_DOI, TU_NGAY, DEN_NGAY, GHI_CHU } = item ?
            item : { _id: null, MS_NV: '', STT: '', HO: '', TEN: '', MS_BM: '', MS_CV: '', TU_DK: '', NHOMLOP: '', SO_SV: '', SO_TIET_THUC: '', SO_TIET_QUY_DOI: '', TU_NGAY: '', DEN_NGAY: '', GHI_CHU: '' };
        $('#MS_NV').val(MS_NV);
        $('#STT').val(STT);
        $('#HO').val(HO);
        $('#TEN').val(TEN);
        $('#MS_BM').val(MS_BM);
        $('#MS_CV').val(MS_CV);
        $('#TU_DK').val(TU_DK);
        $('#NHOMLOP').val(NHOMLOP);
        $('#SO_SV').val(SO_SV);
        $('#SO_TIET_THUC').val(SO_TIET_THUC);
        $('#SO_TIET_QUY_DOI').val(SO_TIET_QUY_DOI);
        $('#TU_NGAY').val(TU_NGAY);
        $('#DEN_NGAY').val(DEN_NGAY);
        $('#GHI_CHU').val(GHI_CHU);
        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], bomon: bomon? bomon : [], cv_klgd: cv_klgd? cv_klgd: []});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const cbcnv = this.cbcnv.current.getSelectedItem(),
            bomon = this.bomon.current.getSelectedItem(),
            cv_klgd = this.cv_klgd.current.getSelectedItem(),
            MS_NV = cbcnv ? cbcnv : [],
            MS_BM = bomon ? bomon : [],
            MS_CV = cv_klgd ? cv_klgd : [],
         changes = {
            MS_NV,
            STT: this.state.text.STT,
            HO: this.state.text.HO,
            TEN: this.state.text.TEN,
            MS_BM,
            MS_CV,
            TU_DK: this.state.text.TU_DK,
            NHOMLOP: this.state.text.NHOMLOP,
            SO_SV: this.state.text.SO_SV,
            SO_TIET_THUC: this.state.text.SO_TIET_THUC,
            SO_TIET_QUY_DOI: this.state.text.SO_TIET_QUY_DOI,
            TU_NGAY: this.state.text.TU_NGAY,
            DEN_NGAY: this.state.text.DEN_NGAY,
            GHI_CHU: this.state.text.GHI_CHU
        };
        if (!changes.MS_NV) {
            T.notify('MS_NV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (!changes.STT) {
            T.notify('STT đang trống!', 'danger');
            $('#STT').focus();
        } else if (!changes.HO) {
            T.notify('Họ đang trống!', 'danger');
            $('#HO').focus();
        } else if (!changes.TEN) {
            T.notify('Tên đang trống!', 'danger');
            $('#TEN').focus();
        } else if (!changes.MS_BM) {
            T.notify('MS_BM đang trống!', 'danger');
            $('#MS_BM').focus();
        } else if (!changes.MS_CV) {
            T.notify('MS_CV đang trống!', 'danger');
            $('#MS_CV').focus();
        } else if (this.state._id) {
            this.props.updateDk_klgd(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createDk_klgd(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
    }

    render() {
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv ? this.state.cbcnv.cbcnv : [];
        const bomon = this.state && this.state.bomon && this.state.bomon.bomon ? this.state.bomon.bomon : [];
        const cv_klgd = this.state && this.state.cv_klgd && this.state.cv_klgd.cv_klgd ? this.state.cv_klgd.cv_klgd : [];
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin đăng kí khối lượng giảng dạy</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='MS_NV'>MS NV</label>
                                <Dropdown ref={this.cbcnv} number='' items={cbcnv.map(e => Object.assign({}, e, {text: e.MS_NV}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='STT'>STT</label>
                                <input className='form-control' id='STT' type='number' placeholder='' onChange={this.handleInput('text', 'STT')} value={this.state.text.STT}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HO'>Họ</label>
                                <input className='form-control' id='HO' type='text' placeholder='' onChange={this.handleInput('text', 'HO')} value={this.state.text.HO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TEN'>Tên</label>
                                <input className='form-control' id='TEN' type='text' placeholder='' onChange={this.handleInput('text', 'TEN')} value={this.state.text.TEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MS_BM'>MS BM</label>
                                <Dropdown ref={this.bomon} number='' items={bomon.map(e => Object.assign({}, e, {text: e.TEN_BM}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MS_CV'>MS CV</label>
                                <Dropdown ref={this.cv_klgd} number='' items={cv_klgd.map(e => Object.assign({}, e, {text: e.TEN_CV}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TU_DK'>Tự đăng kí</label>
                                <input className='form-control' id='TU_DK' type='text' placeholder='' onChange={this.handleInput('text', 'TU_DK')} value={this.state.text.TU_DK}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NHOMLOP'>Nhóm lớp</label>
                                <input className='form-control' id='NHOMLOP' type='text' placeholder='' onChange={this.handleInput('text', 'NHOMLOP')} value={this.state.text.NHOMLOP}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='SO_SV'>Số sinh viên</label>
                                <input className='form-control' id='SO_SV' type='number' placeholder='' onChange={this.handleInput('text', 'SO_SV')} value={this.state.text.SO_SV}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='SO_TIET_THUC'>Số tiết thực</label>
                                <input className='form-control' id='SO_TIET_THUC' type='number' placeholder='' onChange={this.handleInput('text', 'SO_TIET_THUC')} value={this.state.text.SO_TIET_THUC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='SO_TIET_QUY_DOI'>Số tiết quy đổi</label>
                                <input className='form-control' id='SO_TIET_QUY_DOI' type='number' placeholder='' onChange={this.handleInput('text', 'SO_TIET_QUY_DOI')} value={this.state.text.SO_TIET_QUY_DOI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TU_NGAY'>Từ ngày</label>
                                <input className='form-control' id='TU_NGAY' type='date' placeholder='' onChange={this.handleInput('text', 'TU_NGAY')} value={this.state.text.TU_NGAY}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DEN_NGAY'>Đến ngày</label>
                                <input className='form-control' id='DEN_NGAY' type='date' placeholder='' onChange={this.handleInput('text', 'DEN_NGAY')} value={this.state.text.DEN_NGAY}/>
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