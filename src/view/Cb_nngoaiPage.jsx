import React from 'react';
import { connect } from 'react-redux';
import { getCb_nngoaiInPage, getCb_nngoai, updateCb_nngoai, deleteCb_nngoai } from './redux/cb_nngoai.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Cb_nngoaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.showCb_nngoai = this.showCb_nngoai.bind(this);
        this.deleteCb_nngoai = this.deleteCb_nngoai.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getCb_nngoaiInPage();
        });
    }

    showCb_nngoai(e, cb_nngoaiId) {
        console.log(data);
        this.props.getCb_nngoai(cb_nngoaiId, cb_nngoai => this.props.showCb_nngoai(cb_nngoai));
        e.preventDefault();
    }

    deleteCb_nngoai(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteCb_nngoai(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.cb_nngoai && this.props.cb_nngoai.page && this.props.cb_nngoai.page.list && this.props.cb_nngoai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số cán bộ nước ngoài</th>
                            <th style={{ width: '60%' }}>Tên cán bộ nước ngoài</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cb_nngoai.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showCb_nngoai(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteCb_nngoai(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có cán bộ nước ngoài nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.cb_nngoai && this.props.cb_nngoai.page ?
            this.props.cb_nngoai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Cán bộ nước ngoài</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Cán bộ nước ngoài</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminCb_nngoai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getCb_nngoaiInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ cb_nngoai: state.cb_nngoai });
const mapActionsToProps = { getCb_nngoaiInPage, getCb_nngoai, updateCb_nngoai, deleteCb_nngoai };
export default connect(mapStateToProps, mapActionsToProps)(Cb_nngoaiPage);
