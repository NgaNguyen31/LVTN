import React from 'react';
import { connect } from 'react-redux';
import { getChucvuInPage, getChucvu, updateChucvu, deleteChucvu } from './redux/chucvu.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class ChucvuPage extends React.Component {
    constructor(props) {
        super(props);
        this.showChucvu = this.showChucvu.bind(this);
        this.deleteChucvu = this.deleteChucvu.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getChucvuInPage();
        });
    }

    showChucvu(e, chucvuId) {
        console.log(data);
        this.props.getChucvu(chucvuId, chucvu => this.props.showChucvu(chucvu));
        e.preventDefault();
    }

    deleteChucvu(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteChucvu(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.chucvu && this.props.chucvu.page && this.props.chucvu.page.list && this.props.chucvu.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>MS chức vụ</th>
                            <th style={{ width: '60%' }}>Chức vụ</th>
                            <th style={{ width: 'auto' }}>PC Chức vụ</th>
                            <th style={{ width: 'auto' }}>Ghi chú</th>
                            <th style={{ width: '60%' }} nowrap='true'>Xóa</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.chucvu.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showChucvu(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteChucvu(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có chức vụ nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.chucvu && this.props.chucvu.page ?
            this.props.chucvu.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Chức vụ</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Chức vụ</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminChucvu'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getChucvuInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ chucvu: state.chucvu });
const mapActionsToProps = { getChucvuInPage, getChucvu, updateChucvu, deleteChucvu };
export default connect(mapStateToProps, mapActionsToProps)(ChucvuPage);
