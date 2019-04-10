import React from 'react';
import { connect } from 'react-redux';
import { getQt_dtaiInPage, getQt_dtai, updateQt_dtai, deleteQt_dtai } from './redux/qt_dtai.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_dtaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_dtai = this.showQt_dtai.bind(this);
        this.deleteQt_dtai = this.deleteQt_dtai.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_dtaiInPage();
        });
    }

    showQt_dtai(e, qt_dtaiId) {
        console.log(data);
        this.props.getQt_dtai(qt_dtaiId, qt_dtai => this.props.showQt_dtai(qt_dtai));
        e.preventDefault();
    }

    deleteQt_dtai(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_dtai(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_dtai && this.props.qt_dtai.page && this.props.qt_dtai.page.list && this.props.qt_dtai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị đề tài</th>
                            <th style={{ width: '60%' }}>Tên quản trị đề tài</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_dtai.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_dtai(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_dtai(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị đề tài nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_dtai && this.props.qt_dtai.page ?
            this.props.qt_dtai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị đề tài</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị đề tài</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_dtai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_dtaiInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_dtai: state.qt_dtai });
const mapActionsToProps = { getQt_dtaiInPage, getQt_dtai, updateQt_dtai, deleteQt_dtai };
export default connect(mapStateToProps, mapActionsToProps)(Qt_dtaiPage);
