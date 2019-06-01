import React from 'react';
import { connect } from 'react-redux';
import { getKhoi_luong_gd_caohocInPage, createKhoi_luong_gd_caohoc, updateKhoi_luong_gd_caohoc, deleteKhoi_luong_gd_caohoc } from './redux/khoi_luong_gd_caohoc.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllKhoa} from './redux/khoa.jsx';
import {getAllTrinhdo} from './redux/trinhdo.jsx';
import { Link } from 'react-router-dom';
import Khoi_luong_gd_caohocModal from './Khoi_luong_gd_caohocModel.jsx';
import Pagination from './Pagination.jsx';

class Khoi_luong_gd_caohocPage extends React.Component {
    constructor(props) {
        super(props);
        this.khoi_luong_gd_caohocModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(2, 5);
            this.props.getKhoi_luong_gd_caohocInPage();
        });
        this.props.getAllCbcnv();
        this.props.getAllTrinhdo();
        this.props.getAllKhoa();
        
    }

    edit(e, item){
        this.khoi_luong_gd_caohocModal.current.show(item, this.props.cbcnv.data.items, this.props.trinhdo.data.items, this.props.khoa.data.items);
        e.preventDefault();
    }

    delete(e, item) {
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
                        <th style={{ width: '10%', textAlign: 'center' }}>MSNV</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Họ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Tên</th> */}
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Học vị học hàm</th> */}
                            <th style={{ width: '20%', textAlign: 'center' }}>Môn giảng dạy</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Dạy khoa</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Ngành dạy</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Đơn vị</th> */}
                            <th style={{ width: '10%', textAlign: 'center' }}>ST dạy LT thực tế</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>ST dạy TH</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>ST qui đổi giảng dạy</th> */}
                            <th style={{ width: '10%', textAlign: 'center' }}>Số lượng tiểu luận</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Tổng ST qui đổi</th> */}
                            <th style={{ width: '10%', textAlign: 'center' }}>Tổng cộng</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú</th> */}
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.khoi_luong_gd_caohoc.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MSNV ? item.MSNV.MS_NV + ' ' : '')}</a>
                                </td>     
                                {/* <td>{item.HO}</td>
                                <td>{item.TEN}</td> */}
                                {/* <td>{item.Hocvi_hocham.trinh_do}</td> */}
                                <td>{item.Mon_giangday}</td>
                                <td>{item.Day_khoa.reduce((pre, value) => pre + ' ' +  value.TEN_KHOA, ' ')}</td>
                                <td>{item.Nganh_day}</td>
                                {/* <td>{item.Don_vi}</td> */}
                                <td>{item.St_day_LT_thucte}</td>
                                <td>{item.St_day_TH}</td>
                                {/* <td>{item.St_qui_doi_giangday}</td> */}
                                <td>{item.Slg_tieu_luan}</td>
                                {/* <td>{item.Tong_st_quidoi}</td> */}
                                <td>{item.Tong_cong}</td>
                                {/* <td>{item.Ghi_chu}</td> */}
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
            table = <p>Chưa có khối lương giáo dục cao học nào!</p>;
        }
        
        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.khoi_luong_gd_caohoc && this.props.khoi_luong_gd_caohoc.page ?
            this.props.khoi_luong_gd_caohoc.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin khối lượng giáo dục cao học</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Khối lượng giáo dục cao học</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKhoi_luong_gd_caohoc'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKhoi_luong_gd_caohocInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Khoi_luong_gd_caohocModal ref={this.khoi_luong_gd_caohocModal} createKhoi_luong_gd_caohoc={this.props.createKhoi_luong_gd_caohoc} updateKhoi_luong_gd_caohoc={this.props.updateKhoi_luong_gd_caohoc} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ khoi_luong_gd_caohoc: state.khoi_luong_gd_caohoc, cbcnv: state.cbcnv ,trinhdo: state.trinhdo, khoa: state.khoa });
const mapActionsToProps = { getKhoi_luong_gd_caohocInPage, createKhoi_luong_gd_caohoc, updateKhoi_luong_gd_caohoc, deleteKhoi_luong_gd_caohoc, getAllCbcnv, getAllTrinhdo, getAllKhoa  };
export default connect(mapStateToProps, mapActionsToProps)(Khoi_luong_gd_caohocPage);
