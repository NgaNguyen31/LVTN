import React from 'react';
import { connect } from 'react-redux';
import { getQt_bbaoInPage, getQt_bbao, updateQt_bbao, deleteQt_bbao } from './redux/qt_bbao.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_bbaoPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_bbao = this.showQt_bbao.bind(this);
        this.deleteQt_bbao = this.deleteQt_bbao.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_bbaoInPage();
        });
    }

    showQt_bbao(e, qt_bbaoId) {
        console.log(data);
        this.props.getQt_bbao(qt_bbaoId, qt_bbao => this.props.showQt_bbao(qt_bbao));
        e.preventDefault();
    }

    deleteQt_bbao(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_bbao(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_bbao && this.props.qt_bbao.page && this.props.qt_bbao.page.list && this.props.qt_bbao.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị bài báo</th>
                            <th style={{ width: '60%' }}>Tên quản trị bài báo</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_bbao.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_bbao(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_bbao(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị bài báo nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_bbao && this.props.qt_bbao.page ?
            this.props.qt_bbao.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị bài báo</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị bài báo</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_bbao'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_bbaoInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_bbao: state.qt_bbao });
const mapActionsToProps = { getQt_bbaoInPage, getQt_bbao, updateQt_bbao, deleteQt_bbao };
export default connect(mapStateToProps, mapActionsToProps)(Qt_bbaoPage);
