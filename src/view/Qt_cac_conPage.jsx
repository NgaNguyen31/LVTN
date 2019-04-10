import React from 'react';
import { connect } from 'react-redux';
import { getQt_cac_conInPage, getQt_cac_con, updateQt_cac_con, deleteQt_cac_con } from './redux/qt_cac_con.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_cac_conPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_cac_con = this.showQt_cac_con.bind(this);
        this.deleteQt_cac_con = this.deleteQt_cac_con.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_cac_conInPage();
        });
    }

    showQt_cac_con(e, qt_cac_conId) {
        console.log(data);
        this.props.getQt_cac_con(qt_cac_conId, qt_cac_con => this.props.showQt_cac_con(qt_cac_con));
        e.preventDefault();
    }

    deleteQt_cac_con(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_cac_con(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_cac_con && this.props.qt_cac_con.page && this.props.qt_cac_con.page.list && this.props.qt_cac_con.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị các con</th>
                            <th style={{ width: '60%' }}>Tên quản trị các con</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_cac_con.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_cac_con(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_cac_con(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị các con nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_cac_con && this.props.qt_cac_con.page ?
            this.props.qt_cac_con.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị các con</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị các con</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_cac_con'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_cac_conInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_cac_con: state.qt_cac_con });
const mapActionsToProps = { getQt_cac_conInPage, getQt_cac_con, updateQt_cac_con, deleteQt_cac_con };
export default connect(mapStateToProps, mapActionsToProps)(Qt_cac_conPage);
