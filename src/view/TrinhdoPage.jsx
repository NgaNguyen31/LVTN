import React from 'react';
import { connect } from 'react-redux';
import { getTrinhdoInPage, getTrinhdo, updateTrinhdo, deleteTrinhdo } from './redux/trinhdo.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class TrinhdoPage extends React.Component {
    constructor(props) {
        super(props);
        this.showTrinhdo = this.showTrinhdo.bind(this);
        this.deleteTrinhdo = this.deleteTrinhdo.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getTrinhdoInPage();
        });
    }

    showTrinhdo(e, trinhdoId) {
        this.props.getTrinhdo(trinhdoId, trinhdo => this.props.showTrinhdo(trinhdo));
        e.preventDefault();
    }

    deleteTrinhdo(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteTrinhdo(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.trinhdo && this.props.trinhdo.page && this.props.trinhdo.page.list && this.props.trinhdo.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Trình độ</th>
                            <th style={{ width: 'auto' }}>STT</th>                            
                            <th style={{ width: 'auto' }}>ORD</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.trinhdo.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showTrinhdo(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteTrinhdo(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có trình độ nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.trinhdo && this.props.trinhdo.page ?
            this.props.trinhdo.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Trình độ</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Trình độ</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminTrinhdo'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getTrinhdoInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ trinhdo: state.trinhdo });
const mapActionsToProps = { getTrinhdoInPage, getTrinhdo, updateTrinhdo, deleteTrinhdo };
export default connect(mapStateToProps, mapActionsToProps)(TrinhdoPage);
