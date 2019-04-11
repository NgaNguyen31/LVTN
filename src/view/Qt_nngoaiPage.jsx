import React from 'react';
import { connect } from 'react-redux';
import { getQt_nngoaiInPage, getQt_nngoai, updateQt_nngoai, deleteQt_nngoai } from './redux/qt_nngoai.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_nngoaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_nngoai = this.showQt_nngoai.bind(this);
        this.deleteQt_nngoai = this.deleteQt_nngoai.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_nngoaiInPage();
        });
    }

    showQt_nngoai(e, qt_nngoaiId) {
        console.log(data);
        this.props.getQt_nngoai(qt_nngoaiId, qt_nngoai => this.props.showQt_nngoai(qt_nngoai));
        e.preventDefault();
    }

    deleteQt_nngoai(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_nngoai(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_nngoai && this.props.qt_nngoai.page && this.props.qt_nngoai.page.list && this.props.qt_nngoai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: 'auto' }}>STT</th>
                            <th style={{ width: '40%' }}>MS NV</th>
                            <th style={{ width: 'auto' }}>Họ</th>
                            <th style={{ width: 'auto' }}>Tên</th>
                            <th style={{ width: 'auto' }}>Số quyết định</th>
                            <th style={{ width: 'auto' }}>Ngày quyết định</th>
                            <th style={{ width: 'auto' }}>Đơn vị</th>
                            <th style={{ width: 'auto' }}>Ngày đi</th>
                            <th style={{ width: 'auto' }}>Ngày về</th>
                            <th style={{ width: 'auto' }}>Ngày về thực</th>
                            <th style={{ width: 'auto' }}>Số QĐ tiếp nhận</th>
                            <th style={{ width: 'auto' }}>Ngày QĐ tiếp nhận</th>
                            <th style={{ width: 'auto' }}>Mục đích</th>
                            <th style={{ width: 'auto' }}>Nội dung</th>
                            <th style={{ width: 'auto' }}>Ngành học</th>
                            <th style={{ width: 'auto' }}>Gia hạn</th>
                            <th style={{ width: 'auto' }}>Nước đến</th>
                            <th style={{ width: 'auto' }}>Nơi đến</th>
                            <th style={{ width: 'auto' }}>Chi phí</th>
                            <th style={{ width: 'auto' }}>Ghi chú</th>
                            <th style={{ width: 'auto' }}>Hoàn trả KP BHXH</th>
                            <th style={{ width: 'auto' }}>Ngày nhập</th>
                            <th style={{ width: 'auto' }}>BHXH</th>                            
                            <th style={{ width: 'auto' }}>Field2</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_nngoai.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_nngoai(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_nngoai(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị nước ngoài nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_nngoai && this.props.qt_nngoai.page ?
            this.props.qt_nngoai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị nước ngoài</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị nước ngoài</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_nngoai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_nngoaiInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_nngoai: state.qt_nngoai });
const mapActionsToProps = { getQt_nngoaiInPage, getQt_nngoai, updateQt_nngoai, deleteQt_nngoai };
export default connect(mapStateToProps, mapActionsToProps)(Qt_nngoaiPage);
