import React from 'react';
import { connect } from 'react-redux';
import { getQt_luongInPage, getQt_luong, updateQt_luong, deleteQt_luong } from './redux/qt_luong.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_luongPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_luong = this.showQt_luong.bind(this);
        this.deleteQt_luong = this.deleteQt_luong.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_luongInPage();
        });
    }

    showQt_luong(e, qt_luongId) {
        console.log(data);
        this.props.getQt_luong(qt_luongId, qt_luong => this.props.showQt_luong(qt_luong));
        e.preventDefault();
    }

    deleteQt_luong(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_luong(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_luong && this.props.qt_luong.page && this.props.qt_luong.page.list && this.props.qt_luong.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị lương</th>
                            <th style={{ width: '60%' }}>Tên quản trị lương</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_luong.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_luong(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_luong(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị lương nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_luong && this.props.qt_luong.page ?
            this.props.qt_luong.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị lương</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị lương</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_luong'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_luongInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_luong: state.qt_luong });
const mapActionsToProps = { getQt_luongInPage, getQt_luong, updateQt_luong, deleteQt_luong };
export default connect(mapStateToProps, mapActionsToProps)(Qt_luongPage);
