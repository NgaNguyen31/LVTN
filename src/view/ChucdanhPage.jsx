import React from 'react';
import { connect } from 'react-redux';
import { getChucdanhInPage, getChucdanh, updateChucdanh, deleteChucdanh } from './redux/chucdanh.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class ChucdanhPage extends React.Component {
    constructor(props) {
        super(props);
        this.showChucdanh = this.showChucdanh.bind(this);
        this.deleteChucdanh = this.deleteChucdanh.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getChucdanhInPage();
        });
    }

    showChucdanh(e, chucdanhId) {
        console.log(data);
        this.props.getChucdanh(chucdanhId, chucdanh => this.props.showChucdanh(chucdanh));
        e.preventDefault();
    }

    deleteChucdanh(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteChucdanh(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.chucdanh && this.props.chucdanh.page && this.props.chucdanh.page.list && this.props.chucdanh.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số chức danh</th>
                            <th style={{ width: '60%' }}>Tên chức danh</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.chucdanh.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showChucdanh(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteChucdanh(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có chức danh nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.chucdanh && this.props.chucdanh.page ?
            this.props.chucdanh.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Chức danh</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Chức danh</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminChucdanh'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getChucdanhInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ chucdanh: state.chucdanh });
const mapActionsToProps = { getChucdanhInPage, getChucdanh, updateChucdanh, deleteChucdanh };
export default connect(mapStateToProps, mapActionsToProps)(ChucdanhPage);
