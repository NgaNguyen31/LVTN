import React from 'react';
import { connect } from 'react-redux';
import { getKihieu_tang_giam_bhxhInPage, getKihieu_tang_giam_bhxh, updateKihieu_tang_giam_bhxh, deleteKihieu_tang_giam_bhxh } from './redux/kihieu_tang_giam_bhxh.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Kihieu_tang_giam_bhxhPage extends React.Component {
    constructor(props) {
        super(props);
        this.showKihieu_tang_giam_bhxh = this.showKihieu_tang_giam_bhxh.bind(this);
        this.deleteKihieu_tang_giam_bhxh = this.deleteKihieu_tang_giam_bhxh.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getKihieu_tang_giam_bhxhInPage();
        });
    }

    showKihieu_tang_giam_bhxh(e, kihieu_tang_giam_bhxhId) {
        console.log(data);
        this.props.getKihieu_tang_giam_bhxh(kihieu_tang_giam_bhxhId, kihieu_tang_giam_bhxh => this.props.showKihieu_tang_giam_bhxh(kihieu_tang_giam_bhxh));
        e.preventDefault();
    }

    deleteKihieu_tang_giam_bhxh(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteKihieu_tang_giam_bhxh(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.kihieu_tang_giam_bhxh && this.props.kihieu_tang_giam_bhxh.page && this.props.kihieu_tang_giam_bhxh.page.list && this.props.kihieu_tang_giam_bhxh.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Ký hiệu </th>
                            <th style={{ width: '60%' }}>Diễn giải</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.kihieu_tang_giam_bhxh.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showKihieu_tang_giam_bhxh(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteKihieu_tang_giam_bhxh(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có kí hiệu tăng giảm BHXH nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.kihieu_tang_giam_bhxh && this.props.kihieu_tang_giam_bhxh.page ?
            this.props.kihieu_tang_giam_bhxh.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Kí hiệu tăng giảm BHXH</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Kí hiệu tăng giảm BHXH</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKihieu_tang_giam_bhxh'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKihieu_tang_giam_bhxhInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ kihieu_tang_giam_bhxh: state.kihieu_tang_giam_bhxh });
const mapActionsToProps = { getKihieu_tang_giam_bhxhInPage, getKihieu_tang_giam_bhxh, updateKihieu_tang_giam_bhxh, deleteKihieu_tang_giam_bhxh };
export default connect(mapStateToProps, mapActionsToProps)(Kihieu_tang_giam_bhxhPage);
