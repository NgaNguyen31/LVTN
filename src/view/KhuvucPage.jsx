import React from 'react';
import { connect } from 'react-redux';
import { getKhuvucInPage, getKhuvuc, updateKhuvuc, deleteKhuvuc } from './redux/khuvuc.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class KhuvucPage extends React.Component {
    constructor(props) {
        super(props);
        this.showKhuvuc = this.showKhuvuc.bind(this);
        this.deleteKhuvuc = this.deleteKhuvuc.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getKhuvucInPage();
        });
    }

    showKhuvuc(e, khuvucId) {
        console.log(data);
        this.props.getKhuvuc(khuvucId, khuvuc => this.props.showKhuvuc(khuvuc));
        e.preventDefault();
    }

    deleteKhuvuc(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteKhuvuc(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.khuvuc && this.props.khuvuc.page && this.props.khuvuc.page.list && this.props.khuvuc.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số khu vực</th>
                            <th style={{ width: '60%' }}>Tên khu vực</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.khuvuc.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showKhuvuc(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteKhuvuc(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có khu vực nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.khuvuc && this.props.khuvuc.page ?
            this.props.khuvuc.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Khu vực</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Khu vực</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKhuvuc'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKhuvucInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ khuvuc: state.khuvuc });
const mapActionsToProps = { getKhuvucInPage, getKhuvuc, updateKhuvuc, deleteKhuvuc };
export default connect(mapStateToProps, mapActionsToProps)(KhuvucPage);
