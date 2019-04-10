import React from 'react';
import { connect } from 'react-redux';
import { getQt_boiduongInPage, getQt_boiduong, updateQt_boiduong, deleteQt_boiduong } from './redux/qt_boiduong.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_boiduongPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_boiduong = this.showQt_boiduong.bind(this);
        this.deleteQt_boiduong = this.deleteQt_boiduong.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_boiduongInPage();
        });
    }

    showQt_boiduong(e, qt_boiduongId) {
        console.log(data);
        this.props.getQt_boiduong(qt_boiduongId, qt_boiduong => this.props.showQt_boiduong(qt_boiduong));
        e.preventDefault();
    }

    deleteQt_boiduong(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_boiduong(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_boiduong && this.props.qt_boiduong.page && this.props.qt_boiduong.page.list && this.props.qt_boiduong.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị bồi dưỡng</th>
                            <th style={{ width: '60%' }}>Tên quản trị bồi dưỡng</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_boiduong.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_boiduong(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_boiduong(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị bồi dưỡng nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_boiduong && this.props.qt_boiduong.page ?
            this.props.qt_boiduong.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị bồi dưỡng</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị bồi dưỡng</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_boiduong'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_boiduongInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_boiduong: state.qt_boiduong });
const mapActionsToProps = { getQt_boiduongInPage, getQt_boiduong, updateQt_boiduong, deleteQt_boiduong };
export default connect(mapStateToProps, mapActionsToProps)(Qt_boiduongPage);
