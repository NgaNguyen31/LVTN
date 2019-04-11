import React from 'react';
import { connect } from 'react-redux';
import { getKhoi_luong_gd_caohocInPage, getKhoi_luong_gd_caohoc, updateKhoi_luong_gd_caohoc, deleteKhoi_luong_gd_caohoc } from './redux/khoi_luong_gd_caohoc.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Khoi_luong_gd_caohocPage extends React.Component {
    constructor(props) {
        super(props);
        this.showKhoi_luong_gd_caohoc = this.showKhoi_luong_gd_caohoc.bind(this);
        this.deleteKhoi_luong_gd_caohoc = this.deleteKhoi_luong_gd_caohoc.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getKhoi_luong_gd_caohocInPage();
        });
    }

    showKhoi_luong_gd_caohoc(e, khoi_luong_gd_caohocId) {
        console.log(data);
        this.props.getKhoi_luong_gd_caohoc(khoi_luong_gd_caohocId, khoi_luong_gd_caohoc => this.props.showKhoi_luong_gd_caohoc(khoi_luong_gd_caohoc));
        e.preventDefault();
    }

    deleteKhoi_luong_gd_caohoc(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteKhoi_luong_gd_caohoc(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.khoi_luong_gd_caohoc && this.props.khoi_luong_gd_caohoc.page && this.props.khoi_luong_gd_caohoc.page.list && this.props.khoi_luong_gd_caohoc.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>ID</th>
                            <th style={{ width: '60%' }}>MSNV</th>
                            <th style={{ width: 'auto' }}>Họ</th>
                            <th style={{ width: 'auto' }}>Tên</th>
                            <th style={{ width: 'auto' }}>Học vị học hàm</th>
                            <th style={{ width: 'auto' }}>Môn giảng dạy</th>
                            <th style={{ width: 'auto' }}>Dạy khoa</th>
                            <th style={{ width: 'auto' }}>Ngành dạy</th>
                            <th style={{ width: 'auto' }}>Đơn vị</th>
                            <th style={{ width: 'auto' }}>St dạy LT thực tế</th>
                            <th style={{ width: 'auto' }}>St dạy TH</th>
                            <th style={{ width: 'auto' }}>St qui đôi giảng dạy</th>
                            <th style={{ width: 'auto' }}>Số lượng tiểu luận</th>
                            <th style={{ width: 'auto' }}>Tổng st qui đổi</th>
                            <th style={{ width: 'auto' }}>Tổng cộng</th>
                            <th style={{ width: 'auto' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.khoi_luong_gd_caohoc.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showKhoi_luong_gd_caohoc(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteKhoi_luong_gd_caohoc(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có khối lượng giảng dạy cao học nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.khoi_luong_gd_caohoc && this.props.khoi_luong_gd_caohoc.page ?
            this.props.khoi_luong_gd_caohoc.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Khối lượng giảng dạy cao học</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Khối lượng giảng dạy cao học</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKhoi_luong_gd_caohoc'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKhoi_luong_gd_caohocInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ khoi_luong_gd_caohoc: state.khoi_luong_gd_caohoc });
const mapActionsToProps = { getKhoi_luong_gd_caohocInPage, getKhoi_luong_gd_caohoc, updateKhoi_luong_gd_caohoc, deleteKhoi_luong_gd_caohoc };
export default connect(mapStateToProps, mapActionsToProps)(Khoi_luong_gd_caohocPage);
