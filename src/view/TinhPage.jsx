import React from 'react';
import { connect } from 'react-redux';
import { getTinhInPage, getTinh, updateTinh, deleteTinh } from './redux/tinh.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class TinhPage extends React.Component {
    constructor(props) {
        super(props);
        this.showTinh = this.showTinh.bind(this);
        this.deleteTinh = this.deleteTinh.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getTinhInPage();
        });
    }

    showTinh(e, tinhId) {
        console.log(data);
        this.props.getTinh(tinhId, tinh => this.props.showTinh(tinh));
        e.preventDefault();
    }

    deleteTinh(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteTinh(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.tinh && this.props.tinh.page && this.props.tinh.page.list && this.props.tinh.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số tỉnh</th>
                            <th style={{ width: '60%' }}>Tên tỉnh</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tinh.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showTinh(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteTinh(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có tỉnh nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.tinh && this.props.tinh.page ?
            this.props.tinh.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Tỉnh</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Tỉnh</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminTinh'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getTinhInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ tinh: state.tinh });
const mapActionsToProps = { getTinhInPage, getTinh, updateTinh, deleteTinh };
export default connect(mapStateToProps, mapActionsToProps)(TinhPage);
