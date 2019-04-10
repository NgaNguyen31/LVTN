import React from 'react';
import { connect } from 'react-redux';
import { getQt_tnghiemInPage, getQt_tnghiem, updateQt_tnghiem, deleteQt_tnghiem } from './redux/qt_tnghiem.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_tnghiemPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_tnghiem = this.showQt_tnghiem.bind(this);
        this.deleteQt_tnghiem = this.deleteQt_tnghiem.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_tnghiemInPage();
        });
    }

    showQt_tnghiem(e, qt_tnghiemId) {
        console.log(data);
        this.props.getQt_tnghiem(qt_tnghiemId, qt_tnghiem => this.props.showQt_tnghiem(qt_tnghiem));
        e.preventDefault();
    }

    deleteQt_tnghiem(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_tnghiem(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_tnghiem && this.props.qt_tnghiem.page && this.props.qt_tnghiem.page.list && this.props.qt_tnghiem.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị thí nghiệm</th>
                            <th style={{ width: '60%' }}>Tên quản trị thí nghiệm</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_tnghiem.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_tnghiem(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_tnghiem(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị thí nghiệm nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_tnghiem && this.props.qt_tnghiem.page ?
            this.props.qt_tnghiem.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị thí nghiệm</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị thí nghiệm</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_tnghiem'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_tnghiemInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_tnghiem: state.qt_tnghiem });
const mapActionsToProps = { getQt_tnghiemInPage, getQt_tnghiem, updateQt_tnghiem, deleteQt_tnghiem };
export default connect(mapStateToProps, mapActionsToProps)(Qt_tnghiemPage);
