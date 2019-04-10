import React from 'react';
import { connect } from 'react-redux';
import { getQt_cvuInPage, getQt_cvu, updateQt_cvu, deleteQt_cvu } from './redux/qt_cvu.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_cvuPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_cvu = this.showQt_cvu.bind(this);
        this.deleteQt_cvu = this.deleteQt_cvu.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_cvuInPage();
        });
    }

    showQt_cvu(e, qt_cvuId) {
        console.log(data);
        this.props.getQt_cvu(qt_cvuId, qt_cvu => this.props.showQt_cvu(qt_cvu));
        e.preventDefault();
    }

    deleteQt_cvu(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_cvu(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_cvu && this.props.qt_cvu.page && this.props.qt_cvu.page.list && this.props.qt_cvu.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị chức vụ</th>
                            <th style={{ width: '60%' }}>Tên quản trị chức vụ</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_cvu.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_cvu(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_cvu(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị chức vụ nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_cvu && this.props.qt_cvu.page ?
            this.props.qt_cvu.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị chức vụ</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị chức vụ</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_cvu'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_cvuInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_cvu: state.qt_cvu });
const mapActionsToProps = { getQt_cvuInPage, getQt_cvu, updateQt_cvu, deleteQt_cvu };
export default connect(mapStateToProps, mapActionsToProps)(Qt_cvuPage);
