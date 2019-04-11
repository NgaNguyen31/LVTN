import React from 'react';
import { connect } from 'react-redux';
import { getPctn_nghe_2018InPage, getPctn_nghe_2018, updatePctn_nghe_2018, deletePctn_nghe_2018 } from './redux/pctn_nghe_2018.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Pctn_nghe_2018Page extends React.Component {
    constructor(props) {
        super(props);
        this.showPctn_nghe_2018 = this.showPctn_nghe_2018.bind(this);
        this.deletePctn_nghe_2018 = this.deletePctn_nghe_2018.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getPctn_nghe_2018InPage();
        });
    }

    showPctn_nghe_2018(e, pctn_nghe_2018Id) {
        console.log(data);
        this.props.getPctn_nghe_2018(pctn_nghe_2018Id, pctn_nghe_2018 => this.props.showPctn_nghe_2018(pctn_nghe_2018));
        e.preventDefault();
    }

    deletePctn_nghe_2018(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deletePctn_nghe_2018(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.pctn_nghe_2018 && this.props.pctn_nghe_2018.page && this.props.pctn_nghe_2018.page.list && this.props.pctn_nghe_2018.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>SHCC</th>
                            <th style={{ width: 'auto' }}>Họ</th>
                            <th style={{ width: 'auto' }}>Tên</th>
                            <th style={{ width: 'auto' }}>Ngày sinh</th>
                            <th style={{ width: 'auto' }}>MS CDNN</th>
                            <th style={{ width: 'auto' }}>Ngày PCTN cũ</th>
                            <th style={{ width: 'auto' }}>PT PCTN cũ</th>
                            <th style={{ width: 'auto' }}>Ngày PCTN mới</th>
                            <th style={{ width: 'auto' }}>PT PCTN mới</th>
                            <th style={{ width: 'auto' }}>Đơn vị</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.pctn_nghe_2018.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showPctn_nghe_2018(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deletePctn_nghe_2018(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có pctn nghe 2018 nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.pctn_nghe_2018 && this.props.pctn_nghe_2018.page ?
            this.props.pctn_nghe_2018.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Pctn nghe 2018</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Pctn nghe 2018</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminPctn_nghe_2018'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getPctn_nghe_2018InPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ pctn_nghe_2018: state.pctn_nghe_2018 });
const mapActionsToProps = { getPctn_nghe_2018InPage, getPctn_nghe_2018, updatePctn_nghe_2018, deletePctn_nghe_2018 };
export default connect(mapStateToProps, mapActionsToProps)(Pctn_nghe_2018Page);
