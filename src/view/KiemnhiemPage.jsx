import React from 'react';
import { connect } from 'react-redux';
import { getKiemnhiemInPage, getKiemnhiem, updateKiemnhiem, deleteKiemnhiem } from './redux/kiemnhiem.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class KiemnhiemPage extends React.Component {
    constructor(props) {
        super(props);
        this.showKiemnhiem = this.showKiemnhiem.bind(this);
        this.deleteKiemnhiem = this.deleteKiemnhiem.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getKiemnhiemInPage();
        });
    }

    showKiemnhiem(e, kiemnhiemId) {
        console.log(data);
        this.props.getKiemnhiem(kiemnhiemId, kiemnhiem => this.props.showKiemnhiem(kiemnhiem));
        e.preventDefault();
    }

    deleteKiemnhiem(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteKiemnhiem(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.kiemnhiem && this.props.kiemnhiem.page && this.props.kiemnhiem.page.list && this.props.kiemnhiem.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số kiểm nhiệm</th>
                            <th style={{ width: '60%' }}>Tên kiểm nhiệm</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.kiemnhiem.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showKiemnhiem(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteKiemnhiem(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có kiểm nhiệm nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.kiemnhiem && this.props.kiemnhiem.page ?
            this.props.kiemnhiem.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Kiểm nhiệm</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Kiểm nhiệm</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKiemnhiem'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKiemnhiemInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ kiemnhiem: state.kiemnhiem });
const mapActionsToProps = { getKiemnhiemInPage, getKiemnhiem, updateKiemnhiem, deleteKiemnhiem };
export default connect(mapStateToProps, mapActionsToProps)(KiemnhiemPage);
