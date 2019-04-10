import React from 'react';
import { connect } from 'react-redux';
import { getQt_nnguInPage, getQt_nngu, updateQt_nngu, deleteQt_nngu } from './redux/qt_nngu.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_nnguPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_nngu = this.showQt_nngu.bind(this);
        this.deleteQt_nngu = this.deleteQt_nngu.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_nnguInPage();
        });
    }

    showQt_nngu(e, qt_nnguId) {
        console.log(data);
        this.props.getQt_nngu(qt_nnguId, qt_nngu => this.props.showQt_nngu(qt_nngu));
        e.preventDefault();
    }

    deleteQt_nngu(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_nngu(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_nngu && this.props.qt_nngu.page && this.props.qt_nngu.page.list && this.props.qt_nngu.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị ngôn ngữ</th>
                            <th style={{ width: '60%' }}>Tên quản trị ngôn ngữ</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_nngu.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_nngu(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_nngu(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị ngôn ngữ nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_nngu && this.props.qt_nngu.page ?
            this.props.qt_nngu.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị ngôn ngữ</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị ngôn ngữ</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_nngu'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_nnguInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_nngu: state.qt_nngu });
const mapActionsToProps = { getQt_nnguInPage, getQt_nngu, updateQt_nngu, deleteQt_nngu };
export default connect(mapStateToProps, mapActionsToProps)(Qt_nnguPage);
