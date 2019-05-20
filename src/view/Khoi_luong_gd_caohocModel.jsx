import React from 'react';
import Dropdown from './Dropdown.jsx';
import Khoi_luong_gd_caohocPage from './Khoi_luong_gd_caohocPage.jsx';

export default class Khoi_luong_gd_caohocModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', cbcnv: [], trinhdo: [], khoa: []}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.trinhdo = React.createRef();
        this.khoa = React.createRef();
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
            $(this.modal.current).on('shown.bs.modal', () => $('#MSNV').focus());
        }, 250));
    }

    show(item, cbcnv, trinhdo, khoa) {       
         
        const { _id, MSNV, HO, TEN, Hocvi_hocham, Mon_giangday, 
            Day_khoa, Nganh_day, Don_vi, St_day_LT_thucte, St_day_TH, 
            St_qui_doi_giangday, Slg_tieu_luan, Tong_st_quidoi, Tong_cong,
            Ghi_chu } = item ?
            item : { _id: null, MSNV: '', HO: '', TEN: '', 
            Hocvi_hocham: '', Mon_giangday: '', Day_khoa: '', Nganh_day: '', 
            Don_vi: '', St_day_LT_thucte: '', St_day_TH: '', 
            St_qui_doi_giangday: '', Slg_tieu_luan: '', Tong_st_quidoi: '', 
            Tong_cong: '', Ghi_chu: ''};
        $('#MSNV').val(MSNV);
        $('#HO').val(HO);
        $('#TEN').val(TEN);
        $('#Hocvi_hocham').val(Hocvi_hocham);
        $('#Mon_giangday').val(Mon_giangday);
        $('#Day_khoa').val(Day_khoa);
        $('#Nganh_day').val(Nganh_day);
        $('#Don_vi').val(Don_vi);
        $('#St_day_LT_thucte').val(St_day_LT_thucte);
        $('#St_day_TH').val(St_day_TH);
        $('#St_qui_doi_giangday').val(St_qui_doi_giangday);
        $('#Slg_tieu_luan').val(Slg_tieu_luan);
        $('#Tong_st_quidoi').val(Tong_st_quidoi);
        $('#Tong_cong').val(Tong_cong);
        $('#Ghi_chu').val(Ghi_chu);
        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], trinhdo: trinhdo? trinhdo: [], khoa: khoa? khoa:[]});
        $(this.modal.current).modal('show');
    }

    save(e) {        
        e.preventDefault();
        const cbcnv = this.cbcnv.current.getSelectedItem(),
            trinhdo = this.trinhdo.current.getSelectedItem(),
            khoa = this.khoa.current.getSelectedItem(),
            MSNV = cbcnv? cbcnv._id: [],
            Hocvi_hocham = trinhdo? trinhdo._id : [],
            Day_khoa = khoa ? khoa._id : [],
            changes = {
                MSNV,
                HO: this.state.text.HO,
                TEN: this.state.text.TEN,
                Hocvi_hocham,
                Mon_giangday: this.state.text.Mon_giangday,
                Day_khoa,
                Nganh_day: this.state.text.Nganh_day,
                Don_vi: this.state.text.Don_vi,
                St_day_LT_thucte: this.state.text.St_day_LT_thucte,
                St_day_TH: this.state.text.St_day_TH,
                St_qui_doi_giangday: this.state.text.St_qui_doi_giangday,
                Slg_tieu_luan: this.state.text.Slg_tieu_luan,
                Tong_st_quidoi: this.state.text.Tong_st_quidoi,
                Tong_cong: this.state.text.Tong_cong,
                Ghi_chu: this.state.text.Ghi_chu
        };        
        if (!changes.MSNV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MSNV').focus();            
        } else if (!changes.HO) {
            T.notify('Họ đang trống!', 'danger');
            $('#HO').focus();            
        } else if (!changes.TEN) {
            T.notify('Tên đang trống!', 'danger');
            $('#TEN').focus();            
        } else if (!changes.Hocvi_hocham) {
            T.notify('Học vị học hàm đang trống!', 'danger');
            $('#Hocvi_hocham').focus();            
        } else if (!changes.Mon_giangday) {
            T.notify('Môn giảng dạy đang trống!', 'danger');
            $('#Mon_giangday').focus();            
        } else if (!changes.Day_khoa) {
            T.notify('Dạy khoa đang trống!', 'danger');
            $('#Day_khoa').focus();            
        } else if (!changes.Nganh_day) {
            T.notify('Ngành dạy đang trống!', 'danger');
            $('#Nganh_day').focus();            
        } else if (!changes.Don_vi) {
            T.notify('Đơn vị đang trống!', 'danger');
            $('#Don_vi').focus();                 
        } else  if (!changes.St_day_LT_thucte) {
            T.notify('Số tiết dạy lý thuyết thực tế đang trống!', 'danger');
            $('#St_day_LT_thucte').focus();                 
        } else  if (!changes.St_qui_doi_giangday) {
            T.notify('Số tiết qui đổi giảng dạy đang trống!', 'danger');
            $('#St_qui_doi_giangday').focus();                 
        } else  if (!changes.Tong_st_quidoi) {
            T.notify('Tổng số tiết qui đổi đang trống!', 'danger');
            $('#Tong_st_quidoi').focus();                 
        } else  if (!changes.Tong_cong) {
            T.notify('Tổng cộng đang trống!', 'danger');
            $('#Tong_cong').focus();                 
        } else  if (!changes.Ghi_chu) {
            T.notify('Ghi chú đang trống!', 'danger');
            $('#Ghi_chu').focus();                 
        } else if (this.state._id) {
            this.props.updateKhoi_luong_gd_caohoc(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createKhoi_luong_gd_caohoc(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
    }

    render() {      
        
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv ? this.state.cbcnv.cbcnv : [];
        const trinhdo = this.state && this.state.trinhdo && this.state.trinhdo.trinhdo ? this.state.trinhdo.trinhdo : [];
        const khoa = this.state && this.state.khoa && this.state.khoa.khoa ?  this.state.khoa.khoa : [];
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin khối lượng giảng dạy cao học</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='MSNV'>MSNV</label>
                                <Dropdown ref={this.cbcnv} number='' items={cbcnv.map(e => Object.assign({}, e, {text: e.MS_NV}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HO'>Họ</label>
                                <input className='form-control' id='HO' type='text' onChange={this.handleInput('text', 'HO')} value={this.state.text.HO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TEN'>Tên</label>
                                <input className='form-control' id='TEN' type='text' onChange={this.handleInput('text', 'TEN')} value={this.state.text.TEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Hocvi_hocham'>Học vị học hàm</label>
                                <Dropdown ref={this.trinhdo} number='' items={trinhdo.map(e => Object.assign({}, e, {text: e.trinh_do}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Mon_giangday'>Môn giảng dạy</label>
                                <input className='form-control' id='Mon_giangday' type='text' onChange={this.handleInput('text', 'Mon_giangday')} value={this.state.text.Mon_giangday}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Day_khoa'>Dạy khoa</label>
                                <Dropdown ref={this.khoa} number='' items={khoa.map(e => Object.assign({}, e, {text: e.TEN_KHOA}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Nganh_day'>Ngành dạy</label>
                                <input className='form-control' id='Nganh_day' type='text' onChange={this.handleInput('text', 'Nganh_day')} value={this.state.text.Nganh_day}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Don_vi'>Đơn vị</label>
                                <input className='form-control' id='Don_vi' type='text' onChange={this.handleInput('text', 'Don_vi')} value={this.state.text.Don_vi}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='St_day_LT_thucte'>Số tiết dạy lý thuyết thực tế</label>
                                <input className='form-control' id='St_day_LT_thucte' type='number' onChange={this.handleInput('text', 'St_day_LT_thucte')} value={this.state.text.St_day_LT_thucte}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='St_day_TH'>Số tiết dạy thực hành</label>
                                <input className='form-control' id='St_day_TH' type='number' onChange={this.handleInput('text', 'St_day_TH')} value={this.state.text.St_day_TH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='St_qui_doi_giangday'>Số tiết qui đổi giảng dạy</label>
                                <input className='form-control' id='St_qui_doi_giangday' type='number' onChange={this.handleInput('text', 'St_qui_doi_giangday')} value={this.state.text.St_qui_doi_giangday}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Slg_tieu_luan'>Số lượng tiểu luận</label>
                                <input className='form-control' id='Slg_tieu_luan' type='number' onChange={this.handleInput('text', 'Slg_tieu_luan')} value={this.state.text.Slg_tieu_luan}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Tong_st_quidoi'>Tổng số tiết qui đổi</label>
                                <input className='form-control' id='Tong_st_quidoi' type='number' onChange={this.handleInput('text', 'Tong_st_quidoi')} value={this.state.text.Tong_st_quidoi}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Tong_cong'>Tổng cộng</label>
                                <input className='form-control' id='Tong_cong' type='number' onChange={this.handleInput('text', 'Tong_cong')} value={this.state.text.Tong_cong}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Ghi_chu'>Ghi chú</label>
                                <input className='form-control' id='Ghi_chu' type='text' onChange={this.handleInput('text', 'Ghi_chu')} value={this.state.text.Ghi_chu}/>
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