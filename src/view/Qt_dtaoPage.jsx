import React from 'react';
import { connect } from 'react-redux';
import { getQt_dtaoInPage, getQt_dtao, updateQt_dtao, deleteQt_dtao } from './redux/qt_dtao.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_dtaoPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_dtao = this.showQt_dtao.bind(this);
        this.deleteQt_dtao = this.deleteQt_dtao.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_dtaoInPage();
        });
    }

    showQt_dtao(e, qt_dtaoId) {
        console.log(data);
        this.props.getQt_dtao(qt_dtaoId, qt_dtao => this.props.showQt_dtao(qt_dtao));
        e.preventDefault();
    }

    deleteQt_dtao(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_dtao(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_dtao && this.props.qt_dtao.page && this.props.qt_dtao.page.list && this.props.qt_dtao.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>MS NV</th>
                            <th style={{ width: 'auto' }}>STT</th>
                            <th style={{ width: 'auto' }}>Từ tháng</th>
                            <th style={{ width: 'auto' }}>Từ năm</th>
                            <th style={{ width: 'auto' }}>Đến tháng</th>
                            <th style={{ width: 'auto' }}>Đến năm</th>
                            <th style={{ width: 'auto' }}>Cấp DT</th>
                            <th style={{ width: 'auto' }}>Chuyên ngành</th>
                            <th style={{ width: 'auto' }}>Nơi DT</th>
                            <th style={{ width: 'auto' }}>Quốc gia</th>
                            <th style={{ width: 'auto' }}>Hình thức</th>
                            <th style={{ width: 'auto' }}>Loại TN</th>
                            <th style={{ width: 'auto' }}>Năm</th>
                            <th style={{ width: 'auto' }}>Có nộp bằng</th>
                            <th style={{ width: 'auto' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_dtao.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_dtao(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_dtao(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị đào tạo nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_dtao && this.props.qt_dtao.page ?
            this.props.qt_dtao.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị đào tạo</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị đào tạo</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_dtao'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_dtaoInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_dtao: state.qt_dtao });
const mapActionsToProps = { getQt_dtaoInPage, getQt_dtao, updateQt_dtao, deleteQt_dtao };
export default connect(mapStateToProps, mapActionsToProps)(Qt_dtaoPage);
