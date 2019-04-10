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

    showCbcnv(e, cbcnvId) {
        console.log(data);
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
                            <th style={{ width: '40%' }}>Mã số cán bộ công nhân viên</th>
                            <th style={{ width: '60%' }}>Tên cán bộ công nhân viên</th>
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
