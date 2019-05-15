import React from 'react';
import {connect} from 'react-redux';
import {getCbcnvInPage, createCbcnv, getCbcnv, updateCbcnv, deleteCbcnv} from './redux/cbcnv.jsx';
import {getAllNghi_ctac} from './redux/nghi_ctac.jsx';
import {getAllLoai} from './redux/loai.jsx';
import {getAllPctn_nghe_2018} from './redux/pctn_nghe_2018.jsx';
import {getAllChucdanh} from './redux/chucdanh.jsx';
import {getAllTrinhdo} from './redux/trinhdo.jsx';
import {getAllNgach} from './redux/ngach.jsx';
import {getAllChucvu} from './redux/chucvu.jsx';
import {getAllBomon} from './redux/bomon.jsx';
import {getAllDantoc} from './redux/dantoc.jsx';
import {getAllTongiao} from './redux/tongiao.jsx';
import {getAllBenhvien} from './redux/benhvien.jsx';
import {Link} from 'react-router-dom';
import Pagination from './Pagination.jsx';
import CbcnvModal from './CbcnvModel.jsx';

class CbcnvPage extends React.Component {
    constructor(props) {
        super(props);
        this.CbcnvModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(8, 3);
            this.props.getCbcnvInPage();
        });
        this.props.getAllNghi_ctac();
        this.props.getAllLoai();
        this.props.getAllPctn_nghe_2018();
        this.props.getAllChucdanh();
        this.props.getAllTrinhdo();
        this.props.getAllNgach();
        this.props.getAllChucvu();
        this.props.getAllBomon();
        this.props.getAllDantoc();
        this.props.getAllTongiao();
        this.props.getAllBenhvien();
    }

    edit(e, item){        
        
        this.CbcnvModal.current.show(item, 
            this.props.nghi_ctac.data.items, 
            this.props.loai.data.items, 
            this.props.pctn_nghe_2018.data.items, 
            this.props.chucdanh.data.items, 
            this.props.trinhdo.data.items, 
            this.props.ngach.data.items, 
            this.props.chucvu.data.items, 
            this.props.bomon.data.items, 
            this.props.dantoc.data.items, 
            this.props.tongiao.data.items, 
            this.props.benhvien.data.items
            );
        
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteCbcnv(item._id);
        });
        e.preventDefault();
    }


    render() {
        
        let table = null;
        if (this.props.cbcnv && this.props.cbcnv.page && this.props.cbcnv.page.list && this.props.cbcnv.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: 'auto' }}>Nghỉ</th>
                            <th style={{ width: 'auto' }}>Tạm ngưng</th>
                            <th style={{ width: 'auto' }}>Nước ngoài</th>
                            <th style={{ width: 'auto' }}>Trong nước</th>
                            <th style={{ width: 'auto' }}>Loại</th>
                            <th style={{ width: 'auto' }}>SHCC</th>
                            <th style={{ width: 'auto' }}>MSNV</th>
                            <th style={{ width: 'auto' }}>MSNV cũ</th>
                            <th style={{ width: 'auto' }}>Họ</th>
                            <th style={{ width: 'auto' }}>Tên</th>
                            <th style={{ width: 'auto' }}>Phái</th>
                            <th style={{ width: 'auto' }}>Ngày sinh</th>
                            <th style={{ width: 'auto' }}>Xã phường nơi sinh</th>
                            <th style={{ width: 'auto' }}>Quận huyện nơi sinh</th>
                            <th style={{ width: 'auto' }}>Nơi sinh tỉnh thành phố</th>
                            <th style={{ width: 'auto' }}>Ngày BĐ CT</th>
                            <th style={{ width: 'auto' }}>Ngày vào</th>
                            <th style={{ width: 'auto' }}>Ngày BC</th>
                            <th style={{ width: 'auto' }}>Ngày CBGD</th>
                            <th style={{ width: 'auto' }}>Ngày nghỉ</th>
                            <th style={{ width: 'auto' }}>Giấy TT ra trường</th>
                            <th style={{ width: 'auto' }}>Số BHXH LD</th>
                            <th style={{ width: 'auto' }}>Thu BHXH</th>
                            <th style={{ width: 'auto' }}>Chức danh</th>
                            <th style={{ width: 'auto' }}>Trình độ</th>
                            <th style={{ width: 'auto' }}>Ngạch</th>
                            <th style={{ width: 'auto' }}>Ngạch mới</th>
                            <th style={{ width: 'auto' }}>Bậc LG</th>
                            <th style={{ width: 'auto' }}>Hệ số LG</th>
                            <th style={{ width: 'auto' }}>Mốc nâng LG</th>
                            <th style={{ width: 'auto' }}>Ngày hưởng LG</th>
                            <th style={{ width: 'auto' }}>HĐ ký đến</th>
                            <th style={{ width: 'auto' }}>Vượt khung</th>
                            <th style={{ width: 'auto' }}>Ngày hưởng VK</th>
                            <th style={{ width: 'auto' }}>PCTN cũ</th>
                            <th style={{ width: 'auto' }}>Ngày PCTN mới</th>
                            <th style={{ width: 'auto' }}>PCTN mới</th>
                            <th style={{ width: 'auto' }}>Thời điểm tăng 1</th>
                            <th style={{ width: 'auto' }}>Ghi chú LG</th>
                            <th style={{ width: 'auto' }}>Tỷ lệ PCUD</th>
                            <th style={{ width: 'auto' }}>Chức vụ BCH đảng bộ</th>
                            <th style={{ width: 'auto' }}>Chức vụ BCH công đoàn</th>
                            <th style={{ width: 'auto' }}>Chức vụ BCH đoàn TN</th>
                            <th style={{ width: 'auto' }}>PC Độc hại</th>
                            <th style={{ width: 'auto' }}>Môi trường độc hại</th>
                            <th style={{ width: 'auto' }}>MS chức vụ</th>
                            <th style={{ width: 'auto' }}>Tên chức vụ</th>
                            <th style={{ width: 'auto' }}>PCCV</th>
                            <th style={{ width: 'auto' }}>Ngày PCCV</th>
                            <th style={{ width: 'auto' }}>Nước ngoài</th>
                            <th style={{ width: 'auto' }}>Từ ngày NN</th>
                            <th style={{ width: 'auto' }}>Đến ngày NN</th>
                            <th style={{ width: 'auto' }}>Ngày về thực tế NN</th>
                            <th style={{ width: 'auto' }}>Từ ngày không lương</th>
                            <th style={{ width: 'auto' }}>Đến ngày không lương</th>
                            <th style={{ width: 'auto' }}>Ngày tiếp nhận không lương</th>
                            <th style={{ width: 'auto' }}>Phúc lợi</th>
                            <th style={{ width: 'auto' }}>Ghi chú IN</th>
                            <th style={{ width: 'auto' }}>MS BM</th>
                            <th style={{ width: 'auto' }}>TDO LLCT</th>
                            <th style={{ width: 'auto' }}>Tin học</th>
                            <th style={{ width: 'auto' }}>Ngoại ngữ</th>
                            <th style={{ width: 'auto' }}>Ghi chú nộp bằng</th>
                            <th style={{ width: 'auto' }}>Công nhận bằng</th>
                            <th style={{ width: 'auto' }}>Chuyên ngành</th>
                            <th style={{ width: 'auto' }}>CD</th>
                            <th style={{ width: 'auto' }}>KS</th>
                            <th style={{ width: 'auto' }}>CH</th>
                            <th style={{ width: 'auto' }}>TS</th>
                            <th style={{ width: 'auto' }}>TSKH</th>
                            <th style={{ width: 'auto' }}>TC</th>
                            <th style={{ width: 'auto' }}>Khác</th>
                            <th style={{ width: 'auto' }}>GS</th>
                            <th style={{ width: 'auto' }}>PGS</th>
                            <th style={{ width: 'auto' }}>GVC</th>
                            <th style={{ width: 'auto' }}>GV</th>
                            <th style={{ width: 'auto' }}>GVTH</th>
                            <th style={{ width: 'auto' }}>TG</th>
                            <th style={{ width: 'auto' }}>NVC</th>
                            <th style={{ width: 'auto' }}>CVC</th>
                            <th style={{ width: 'auto' }}>TG quân đội</th>
                            <th style={{ width: 'auto' }}>Cấp bậc</th>
                            <th style={{ width: 'auto' }}>Huy chương SNGD</th>
                            <th style={{ width: 'auto' }}>NGND</th>
                            <th style={{ width: 'auto' }}>NGUT</th>
                            <th style={{ width: 'auto' }}>Số thẻ</th>
                            <th style={{ width: 'auto' }}>Ngày đăng DB</th>
                            <th style={{ width: 'auto' }}>Nơi đăng DB</th>
                            <th style={{ width: 'auto' }}>Đảng viên</th>
                            <th style={{ width: 'auto' }}>Ngày đăng CT</th>
                            <th style={{ width: 'auto' }}>Nơi đăng CT</th>
                            <th style={{ width: 'auto' }}>Đoàn viên</th>
                            <th style={{ width: 'auto' }}>Ngày đoàn</th>
                            <th style={{ width: 'auto' }}>Nơi đoàn</th>
                            <th style={{ width: 'auto' }}>Nơi ĐKHK</th>
                            <th style={{ width: 'auto' }}>ĐC hiện tại</th>
                            <th style={{ width: 'auto' }}>Điện thoại</th>
                            <th style={{ width: 'auto' }}>Email</th>
                            <th style={{ width: 'auto' }}>Nguyên quán</th>
                            <th style={{ width: 'auto' }}>Số CMND</th>
                            <th style={{ width: 'auto' }}>Nơi ngày cấp</th>
                            <th style={{ width: 'auto' }}>Dân tộc</th>
                            <th style={{ width: 'auto' }}>Tôn giáo</th>
                            <th style={{ width: 'auto' }}>Cha tên</th>
                            <th style={{ width: 'auto' }}>Cha năm sinh</th>
                            <th style={{ width: 'auto' }}>Cha nghề nghiệp</th>
                            <th style={{ width: 'auto' }}>Cha công tác</th>
                            <th style={{ width: 'auto' }}>Mẹ tên</th>
                            <th style={{ width: 'auto' }}>Mẹ năm sinh</th>
                            <th style={{ width: 'auto' }}>Mẹ nghề nghiệp</th>
                            <th style={{ width: 'auto' }}>Mẹ công tác</th>
                            <th style={{ width: 'auto' }}>VC tên</th>
                            <th style={{ width: 'auto' }}>VC năm sinh</th>
                            <th style={{ width: 'auto' }}>VC nghề nghiệp</th>
                            <th style={{ width: 'auto' }}>VC công tác</th>
                            <th style={{ width: 'auto' }}>Số sổ HK</th>
                            <th style={{ width: 'auto' }}>Họ tên chủ hộ HK</th>
                            <th style={{ width: 'auto' }}>Loại giấy tờ</th>
                            <th style={{ width: 'auto' }}>Mã tỉnh BV</th>
                            <th style={{ width: 'auto' }}>Quốc tịch</th>
                            <th style={{ width: 'auto' }}>Trả thẻ BHYT</th>
                            <th style={{ width: 'auto' }}>Mã BV</th>
                            <th style={{ width: 'auto' }}>Mã số BHXH</th>
                            <th style={{ width: 'auto' }}>Ghi chú nộp số BHXH</th>
                            <th style={{ width: 'auto' }}>Số BHXH</th>
                            <th style={{ width: 'auto' }}>Không PC</th>
                            <th style={{ width: 'auto' }}>Không đóng BHXH</th>
                            <th style={{ width: 'auto' }}>Ghi chú BHXH</th>
                            <th style={{ width: 'auto' }}>Không BHXH</th>
                            <th style={{ width: 'auto' }}>Ghi chú ký hiệu</th>
                            <th style={{ width: 'auto' }}>Hiệu lực GD HĐ</th>
                            <th style={{ width: 'auto' }}>Tăng</th>
                            <th style={{ width: 'auto' }}>KH tăng</th>
                            <th style={{ width: 'auto' }}>Giảm</th>
                            <th style={{ width: 'auto' }}>KH giảm</th>
                            <th style={{ width: 'auto' }}>Số QH HD</th>
                            <th style={{ width: 'auto' }}>Ngày ký QH HD</th>
                            <th style={{ width: 'auto' }}>Ngày nhập HS</th>
                            <th style={{ width: 'auto' }}>Đóng BHXH</th>
                            <th style={{ width: 'auto' }}>HL đến ngày</th>
                            <th style={{ width: 'auto' }}>Diễn giải HĐ</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cbcnv.page.list.map((item, index) => (
                            <tr key={index}>     
                                <td>{item.NGHI? item.NGHI.Dien_giai: ''}</td>
                                <td>{item.TAM_NGUNG}</td>          
                                <td>{item.IS_NNGOAI}</td>
                                <td>{item.IN_NUOC}</td>
                                <td>{item.LOAI ? item.LOAI.Dien_giai : ''}</td>
                                <td>{item.SHCC ? item.SHCC.SHCC : ''}</td>                                                  
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV : ' ')}</a>
                                </td>                          
                                <td>{item.MS_NV_CU}</td>                          
                                <td>{item.HO}</td>                          
                                <td>{item.TEN}</td>                          
                                <td>{item.PHAI}</td>                       
                                <td>{item.NGAY_SINH}</td>                          
                                <td>{item.XA_PHUONG_NOISINH}</td>                          
                                <td>{item.QUAN_HUYEN_NOISINH}</td>                          
                                <td>{item.NOI_SINH_TINH_TP}</td>                          
                                <td>{item.NGAY_BD_CT}</td>                          
                                <td>{item.NGAY_VAO}</td>                          
                                <td>{item.NGAY_BC}</td>                          
                                <td>{item.NGAY_CBGD}</td>                          
                                <td>{item.NGAY_NGHI}</td>                          
                                <td>{item.GIAY_TT_RA_TRUONG}</td>                          
                                <td>{item.So_BHXH_LD}</td>                          
                                <td>{item.THU_BHXH}</td>                          
                                <td>{item.CHUC_DANH ? item.CHUC_DANH.ten_day_du : ''}</td>
                                <td>{item.TRINH_DO ? item.TRINH_DO.Ten_day_du : ''}</td>
                                <td>{item.NGACH ? item.NGACH.TEN_NGACH : ''}</td>
                                <td>{item.NGACHMOI}</td>                          
                                <td>{item.BAC_LG}</td>                          
                                <td>{item.HESO_LG}</td>                          
                                <td>{item.MOC_NANG_LG}</td>                          
                                <td>{item.NGAY_HUONG_LG}</td>                          
                                <td>{item.HD_KY_DEN}</td>                          
                                <td>{item.VUOT_KHUNG}</td>                          
                                <td>{item.NGAY_HUONG_VK}</td>                          
                                <td>{item.PCTN_CU}</td>                          
                                <td>{item.NGAY_PCTN_NEW}</td>                          
                                <td>{item.PCTN_NEW}</td>                          
                                <td>{item.THOI_DIEM_TANG_1}</td>                          
                                <td>{item.GHI_CHU_LG}</td>                          
                                <td>{item.TYLE_PCUD}</td>                          
                                <td>{item.CHUC_VU_BCH_DANG_BO}</td>                          
                                <td>{item.CHUC_VU_BCH_CONG_DOAN}</td>                          
                                <td>{item.CHUC_VU_BCH_DOAN_TN}</td>                          
                                <td>{item.PC_DOC_HAI}</td>                          
                                <td>{item.MOI_TRUONG_DOC_HAI}</td>               
                                <td>{item.MS_CVU ? item.MS_CVU.CHUC_VU : ''}</td>                          
                                <td>{item.TEN_CV}</td>                          
                                <td>{item.PCCV}</td>                          
                                <td>{item.NGAY_PCCV}</td>                          
                                <td>{item.NUOC_NGOAI}</td>                          
                                <td>{item.TU_NGAY_NN}</td>                          
                                <td>{item.DEN_NGAY_NN}</td>                          
                                <td>{item.NGAY_VE_THUC_TE_NN}</td>                          
                                <td>{item.TUNGAY_KOLUONG}</td>                          
                                <td>{item.DENNGAY_KOLUONG}</td>                          
                                <td>{item.NGAYTIEPNHAN_KOLUONG}</td>                          
                                <td>{item.PHUC_LOI}</td>                          
                                <td>{item.GHI_CHU_IN}</td>                          
                                <td>{item.MS_BM ? item.MS_BM.TEN_BM : ''}</td>                          
                                <td>{item.TDO_LLCT}</td>                          
                                <td>{item.TIN_HOC}</td>                          
                                <td>{item.NGOAI_NGU}</td>                          
                                <td>{item.GHI_CHU_NOP_BANG}</td>                          
                                <td>{item.CONG_NHAN_BANG}</td>                          
                                <td>{item.CHUYEN_NGANH}</td>                          
                                <td>{item.CD}</td>                          
                                <td>{item.KS}</td>                          
                                <td>{item.CH}</td>                          
                                <td>{item.TS}</td>                          
                                <td>{item.TSKH}</td>                          
                                <td>{item.TC}</td>                          
                                <td>{item.KHAC}</td>                          
                                <td>{item.GS}</td>                          
                                <td>{item.PGS}</td>                          
                                <td>{item.GVC}</td>                          
                                <td>{item.GV}</td>                          
                                <td>{item.GVTH}</td>                       
                                <td>{item.TG}</td>                          
                                <td>{item.NVC}</td>                          
                                <td>{item.CVC}</td>                          
                                <td>{item.TG_QUANDOI}</td>                          
                                <td>{item.CAP_BAC}</td>                          
                                <td>{item.HUY_CHUONG_SNGD}</td>                          
                                <td>{item.NGND}</td>                          
                                <td>{item.NGUT}</td>                          
                                <td>{item.SO_THE}</td>                          
                                <td>{item.NGAY_DANG_DB}</td>                          
                                <td>{item.NOI_DANG_DB}</td>                          
                                <td>{item.DANG_VIEN}</td>                          
                                <td>{item.NGAY_DANG_CT}</td>                          
                                <td>{item.NOI_DANG_CT}</td>                          
                                <td>{item.DOAN_VIEN}</td>                          
                                <td>{item.NGAY_DOAN}</td>
                                <td>{item.NOI_DOAN}</td>                          
                                <td>{item.NOI_DKHK}</td>
                                <td>{item.DC_HIENTAI}</td>
                                <td>{item.DIEN_THOAI}</td>
                                <td>{item.EMAIL}</td>
                                <td>{item.NGUYEN_QUAN}</td>
                                <td>{item.SO_CMND}</td>
                                <td>{item.NOI_NGAYCAP}</td>
                                <td>{item.DANTOC ? item.DANTOC.Dan_toc : ''}</td>
                                <td>{item.TON_GIAO ? item.TON_GIAO.TON_GIAO : ''}</td>
                                <td>{item.CHA_TEN}</td>
                                <td>{item.CHA_NAM_SINH}</td>
                                <td>{item.CHA_NNGHIEP}</td>
                                <td>{item.CHA_CONGTAC}</td>
                                <td>{item.ME_TEN}</td>
                                <td>{item.ME_NAM_SINH}</td>
                                <td>{item.ME_NNGHIEP}</td>
                                <td>{item.ME_CONGTAC}</td>
                                <td>{item.VC_TEN}</td>
                                <td>{item.VC_NAMSINH}</td>
                                <td>{item.VC_NNGHIEP}</td>
                                <td>{item.VC_CONGTAC}</td>
                                <td>{item.SO_SO_HK}</td>
                                <td>{item.HOTEN_CHU_HO_HK}</td>
                                <td>{item.LOAI_GIAY_TO}</td>
                                <td>{item.MA_TINH_BV}</td>
                                <td>{item.QUOC_TICH}</td>
                                <td>{item.TRA_THE_BHYT}</td>
                                <td>{item.MA_BV ? item.MA_BV.Noi_kham : ''}</td>
                                <td>{item.MASO_BHXH}</td>
                                <td>{item.GHI_CHU_NOP_SO_BHXH}</td>
                                <td>{item.SO_BHXH}</td>
                                <td>{item.NO_PC}</td>
                                <td>{item.NO_DONG_BHXH}</td>
                                <td>{item.GHICHU_BHXH}</td>
                                <td>{item.NO_BHXH}</td>
                                <td>{item.GHICHU_KY_HIEU}</td>
                                <td>{item.HIEULUC_GD_HD}</td>
                                <td>{item.TANG}</td>
                                <td>{item.KH_TANG}</td>
                                <td>{item.GIAM}</td>
                                <td>{item.KH_GIAM}</td>
                                <td>{item.SO_QH_HD}</td>
                                <td>{item.NGAY_KY_QH_HD}</td>
                                <td>{item.NGAY_NHAP_HS}</td>
                                <td>{item.DONG_BHXH}</td>
                                <td>{item.HL_DEN_NGAY}</td>
                                <td>{item.DIEN_GIAI_HD}</td>

                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.edit(e, item)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.delete(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có cán bộ công nhân viên nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.cbcnv && this.props.cbcnv.page ?
            this.props.cbcnv.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Cán bộ công nhân viên</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Cán bộ công nhân viên</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminCbcnv'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getCbcnvInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <CbcnvModal ref={this.CbcnvModal} createCbcnv ={this.props.createCbcnv} updateCbcnv={this.props.updateCbcnv} />    
            
            </main>
        );
    }
}

const mapStateToProps = state => ({ cbcnv: state.cbcnv, 
    nghi_ctac: state.nghi_ctac, 
    loai: state.loai, 
    pctn_nghe_2018: state.pctn_nghe_2018, 
    chucdanh: state.chucdanh, 
    trinhdo: state.trinhdo, 
    ngach: state.ngach, 
    chucvu: state.chucvu, 
    bomon: state.bomon, 
    dantoc: state.dantoc, 
    tongiao: state.tongiao, 
    benhvien: state.benhvien});
const mapActionsToProps = { getCbcnvInPage, 
    getCbcnv, updateCbcnv, deleteCbcnv, 
    createCbcnv, getAllNghi_ctac, getAllLoai, 
    getAllPctn_nghe_2018, getAllChucdanh, getAllTrinhdo, 
    getAllNgach, getAllChucvu, getAllBomon, getAllDantoc, 
    getAllTongiao, getAllBenhvien };
export default connect(mapStateToProps, mapActionsToProps)(CbcnvPage);
