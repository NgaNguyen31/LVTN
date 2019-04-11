import React from 'react';
import { connect } from 'react-redux';
import { getBomonInPage, getBomon, updateBomon, deleteBomon } from './redux/bomon.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class BomonPage extends React.Component {
    constructor(props) {
        super(props);
        this.showBomon = this.showBomon.bind(this);
        this.deleteBomon = this.deleteBomon.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getBomonInPage();
        });
    }

    showBomon(e, bomonId) {
        console.log(data);
        this.props.getBomon(bomonId, bomon => this.props.showBomon(bomon));
        e.preventDefault();
    }

    deleteBomon(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteBomon(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.bomon && this.props.bomon.page && this.props.bomon.page.list && this.props.bomon.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>MS BM</th>
                            <th style={{ width: '60%' }}>Tên BM</th>
                            <th style={{ width: 'auto' }}>Tên tiếng anh</th>
                            <th style={{ width: 'auto' }}>MS kho</th>
                            <th style={{ width: 'auto' }}>Năm thành lập</th>
                            <th style={{ width: 'auto' }}>Ghi chú</th>
                            <th style={{ width: 'auto' }} nowrap='true'>Xóa</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bomon.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showBomon(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteBomon(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có bộ môn nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.bomon && this.props.bomon.page ?
            this.props.bomon.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Bộ môn</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Bộ môn</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminBomon'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getBomonInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ bomon: state.bomon });
const mapActionsToProps = { getBomonInPage, getBomon, updateBomon, deleteBomon };
export default connect(mapStateToProps, mapActionsToProps)(BomonPage);
