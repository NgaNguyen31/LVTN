import React from 'react';
import { connect } from 'react-redux';
import { getCbcnv_hd_khoaInPage, getCbcnv_hd_khoa, updateCbcnv_hd_khoa, deleteCbcnv_hd_khoa } from './redux/cbcnv_hd_khoa.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Cbcnv_hd_khoaPage extends React.Component {
    constructor(props) {
        super(props);
        this.showCbcnv_hd_khoa = this.showCbcnv_hd_khoa.bind(this);
        this.deleteCbcnv_hd_khoa = this.deleteCbcnv_hd_khoa.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getCbcnv_hd_khoaInPage();
        });
    }

    showCbcnv_hd_khoa(e, cbcnv_hd_khoaId) {
        console.log(data);
        this.props.getCbcnv_hd_khoa(cbcnv_hd_khoaId, cbcnv_hd_khoa => this.props.showCbcnv_hd_khoa(cbcnv_hd_khoa));
        e.preventDefault();
    }

    deleteCbcnv_hd_khoa(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteCbcnv_hd_khoa(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.cbcnv_hd_khoa && this.props.cbcnv_hd_khoa.page && this.props.cbcnv_hd_khoa.page.list && this.props.cbcnv_hd_khoa.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số bộ môn</th>
                            <th style={{ width: 'auto' }}>Họ</th>
                            <th style={{ width: 'auto' }}>Tên</th>
                            <th style={{ width: 'auto' }}>Phái</th>
                            <th style={{ width: 'auto' }}>Năm sinh</th>
                            <th style={{ width: 'auto' }}>Thẻ BHYT</th>
                            <th style={{ width: 'auto' }}>Nơi khám</th>
                            <th style={{ width: 'auto' }}>LCB</th>
                            <th style={{ width: 'auto' }}>PC</th>
                            <th style={{ width: 'auto' }} nowrap='true'>Active</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cbcnv_hd_khoa.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showCbcnv_hd_khoa(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteCbcnv_hd_khoa(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có cán bộ công nhân viên hợp động khoa nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.cbcnv_hd_khoa && this.props.cbcnv_hd_khoa.page ?
            this.props.cbcnv_hd_khoa.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Cán bộ công nhân viên hợp động khoa</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Cán bộ công nhân viên hợp động khoa</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminCbcnv_hd_khoa'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getCbcnv_hd_khoaInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ cbcnv_hd_khoa: state.cbcnv_hd_khoa });
const mapActionsToProps = { getCbcnv_hd_khoaInPage, getCbcnv_hd_khoa, updateCbcnv_hd_khoa, deleteCbcnv_hd_khoa };
export default connect(mapStateToProps, mapActionsToProps)(Cbcnv_hd_khoaPage);
