import React from 'react';
import { connect } from 'react-redux';
import { getCbcnvInPage, getCbcnv, updateCbcnv, deleteCbcnv } from './redux/cbcnv.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class CbcnvPage extends React.Component {
    constructor(props) {
        super(props);
        this.showCbcnv = this.showCbcnv.bind(this);
        this.deleteCbcnv = this.deleteCbcnv.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getCbcnvInPage();
        });
    }

    edit(e, item) {
        this.props.getCbcnv(cbcnvId, cbcnv => this.props.showCbcnv(cbcnv));
        e.preventDefault();
    }

    deleteCbcnv(e, item) {
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
                            <th style={{ width: 'auto' }}>email</th>
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
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showCbcnv(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteCbcnv(e, item)}>
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
            </main>
        );
    }
}

const mapStateToProps = state => ({ cbcnv: state.cbcnv });
const mapActionsToProps = { getCbcnvInPage, getCbcnv, updateCbcnv, deleteCbcnv };
export default connect(mapStateToProps, mapActionsToProps)(CbcnvPage);
