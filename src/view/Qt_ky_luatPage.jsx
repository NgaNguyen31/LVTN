import React from 'react';
import { connect } from 'react-redux';
import { getQt_ky_luatInPage, getQt_ky_luat, updateQt_ky_luat, deleteQt_ky_luat } from './redux/qt_ky_luat.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_ky_luatPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_ky_luat = this.showQt_ky_luat.bind(this);
        this.deleteQt_ky_luat = this.deleteQt_ky_luat.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_ky_luatInPage();
        });
    }

    showQt_ky_luat(e, qt_ky_luatId) {
        console.log(data);
        this.props.getQt_ky_luat(qt_ky_luatId, qt_ky_luat => this.props.showQt_ky_luat(qt_ky_luat));
        e.preventDefault();
    }

    deleteQt_ky_luat(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_ky_luat(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_ky_luat && this.props.qt_ky_luat.page && this.props.qt_ky_luat.page.list && this.props.qt_ky_luat.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị kỷ luật</th>
                            <th style={{ width: '60%' }}>Tên quản trị kỷ luật</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_ky_luat.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_ky_luat(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_ky_luat(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị kỷ luật nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_ky_luat && this.props.qt_ky_luat.page ?
            this.props.qt_ky_luat.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị kỷ luật</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị kỷ luật</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_ky_luat'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_ky_luatInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_ky_luat: state.qt_ky_luat });
const mapActionsToProps = { getQt_ky_luatInPage, getQt_ky_luat, updateQt_ky_luat, deleteQt_ky_luat };
export default connect(mapStateToProps, mapActionsToProps)(Qt_ky_luatPage);
