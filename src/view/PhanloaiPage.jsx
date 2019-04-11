import React from 'react';
import { connect } from 'react-redux';
import { getPhanloaiInPage, getPhanloai, updatePhanloai, deletePhanloai } from './redux/phanloai.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class PhanloaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.showPhanloai = this.showPhanloai.bind(this);
        this.deletePhanloai = this.deletePhanloai.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getPhanloaiInPage();
        });
    }

    showPhanloai(e, phanloaiId) {
        console.log(data);
        this.props.getPhanloai(phanloaiId, phanloai => this.props.showPhanloai(phanloai));
        e.preventDefault();
    }

    deletePhanloai(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deletePhanloai(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.phanloai && this.props.phanloai.page && this.props.phanloai.page.list && this.props.phanloai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>ORD</th>
                            <th style={{ width: '60%' }}>Loại</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.phanloai.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showPhanloai(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deletePhanloai(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có phân loại nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.phanloai && this.props.phanloai.page ?
            this.props.phanloai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Phân loại</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Phân loại</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminPhanloai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getPhanloaiInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ phanloai: state.phanloai });
const mapActionsToProps = { getPhanloaiInPage, getPhanloai, updatePhanloai, deletePhanloai };
export default connect(mapStateToProps, mapActionsToProps)(PhanloaiPage);
