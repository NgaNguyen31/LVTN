import React from 'react';
import { connect } from 'react-redux';
import { getKhoaInPage, getKhoa, updateKhoa, deleteKhoa } from './redux/khoa.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class KhoaPage extends React.Component {
    constructor(props) {
        super(props);
        this.showKhoa = this.showKhoa.bind(this);
        this.deleteKhoa = this.deleteKhoa.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getKhoaInPage();
        });
    }

    showKhoa(e, khoaId) {
        console.log(data);
        this.props.getKhoa(khoaId, khoa => this.props.showKhoa(khoa));
        e.preventDefault();
    }

    deleteKhoa(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteKhoa(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.khoa && this.props.khoa.page && this.props.khoa.page.list && this.props.khoa.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số khoa</th>
                            <th style={{ width: '60%' }}>Tên khoa</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.khoa.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showKhoa(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteKhoa(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có khoa nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.khoa && this.props.khoa.page ?
            this.props.khoa.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Khoa</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Khoa</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKhoa'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKhoaInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ khoa: state.khoa });
const mapActionsToProps = { getKhoaInPage, getKhoa, updateKhoa, deleteKhoa };
export default connect(mapStateToProps, mapActionsToProps)(KhoaPage);
