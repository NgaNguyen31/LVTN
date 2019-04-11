import React from 'react';
import { connect } from 'react-redux';
import { getCbcnv_hd_dv_tu_traInPage, getCbcnv_hd_dv_tu_tra, updateCbcnv_hd_dv_tu_tra, deleteCbcnv_hd_dv_tu_tra } from './redux/cbcnv_hd_dv_tu_tra.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Cbcnv_hd_dv_tu_traPage extends React.Component {
    constructor(props) {
        super(props);
        this.showCbcnv_hd_dv_tu_tra = this.showCbcnv_hd_dv_tu_tra.bind(this);
        this.deleteCbcnv_hd_dv_tu_tra = this.deleteCbcnv_hd_dv_tu_tra.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {};
    }

    handleInput(type, field, args) {
        return e => {
            switch(type) {
                default:
                    e.preventDefault();
                    return;
            }
            e.preventDefault();
        }
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getCbcnv_hd_dv_tu_traInPage();
        });
    }

    showCbcnv_hd_dv_tu_tra(e, cbcnv_hd_dv_tu_traId) {
        console.log(data);
        this.props.getCbcnv_hd_dv_tu_tra(cbcnv_hd_dv_tu_traId, cbcnv_hd_dv_tu_tra => this.props.showCbcnv_hd_dv_tu_tra(cbcnv_hd_dv_tu_tra));
        e.preventDefault();
    }

    deleteCbcnv_hd_dv_tu_tra(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteCbcnv_hd_dv_tu_tra(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.cbcnv_hd_dv_tu_tra && this.props.cbcnv_hd_dv_tu_tra.page && this.props.cbcnv_hd_dv_tu_tra.page.list && this.props.cbcnv_hd_dv_tu_tra.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số nhân viên</th>
                            <th style={{ width: 'auto' }}>Họ</th>
                            <th style={{ width: 'auto' }}>Tên</th>
                            <th style={{ width: 'auto' }}>Ngày sinh</th>
                            <th style={{ width: 'auto' }}>Nơi sinh</th>
                            <th style={{ width: 'auto' }}>Ngày vào</th>
                            <th style={{ width: 'auto' }}>Ngày nghỉ</th>
                            <th style={{ width: 'auto' }}>Trình độ</th>
                            <th style={{ width: 'auto' }}>Đơn vị</th>
                            <th style={{ width: 'auto' }}>Địa chỉ</th>
                            <th style={{ width: 'auto' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cbcnv_hd_dv_tu_tra.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showCbcnv_hd_dv_tu_tra(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteCbcnv_hd_dv_tu_tra(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có cán bộ công nhân viên hợp động dịch vụ tự trả nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.cbcnv_hd_dv_tu_tra && this.props.cbcnv_hd_dv_tu_tra.page ?
            this.props.cbcnv_hd_dv_tu_tra.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Cán bộ công nhân viên hợp động dịch vụ tự trả</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Cán bộ công nhân viên hợp động dịch vụ tự trả</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminCbcnv_hd_dv_tu_tra'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getCbcnv_hd_dv_tu_traInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ cbcnv_hd_dv_tu_tra: state.cbcnv_hd_dv_tu_tra });
const mapActionsToProps = { getCbcnv_hd_dv_tu_traInPage, getCbcnv_hd_dv_tu_tra, updateCbcnv_hd_dv_tu_tra, deleteCbcnv_hd_dv_tu_tra };
export default connect(mapStateToProps, mapActionsToProps)(Cbcnv_hd_dv_tu_traPage);
