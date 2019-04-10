import React from 'react';
import { connect } from 'react-redux';
import { getLoaiInPage, getLoai, updateLoai, deleteLoai } from './redux/loai.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class LoaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.showLoai = this.showLoai.bind(this);
        this.deleteLoai = this.deleteLoai.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getLoaiInPage();
        });
    }

    showLoai(e, loaiId) {
        console.log(data);
        this.props.getLoai(loaiId, loai => this.props.showLoai(loai));
        e.preventDefault();
    }

    deleteLoai(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteLoai(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.loai && this.props.loai.page && this.props.loai.page.list && this.props.loai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số loại</th>
                            <th style={{ width: '60%' }}>Tên loại</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.loai.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showLoai(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteLoai(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có loại nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.loai && this.props.loai.page ?
            this.props.loai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Loại</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Loại</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminLoai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getLoaiInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ loai: state.loai });
const mapActionsToProps = { getLoaiInPage, getLoai, updateLoai, deleteLoai };
export default connect(mapStateToProps, mapActionsToProps)(LoaiPage);
