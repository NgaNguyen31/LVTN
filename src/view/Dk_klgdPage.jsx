import React from 'react';
import { connect } from 'react-redux';
import { getDk_klgdInPage, getDk_klgd, updateDk_klgd, deleteDk_klgd } from './redux/dk_klgd.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Dk_klgdPage extends React.Component {
    constructor(props) {
        super(props);
        this.showDk_klgd = this.showDk_klgd.bind(this);
        this.deleteDk_klgd = this.deleteDk_klgd.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getDk_klgdInPage();
        });
    }

    showDk_klgd(e, dk_klgdId) {
        console.log(data);
        this.props.getDk_klgd(dk_klgdId, dk_klgd => this.props.showDk_klgd(dk_klgd));
        e.preventDefault();
    }

    deleteDk_klgd(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteDk_klgd(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.dk_klgd && this.props.dk_klgd.page && this.props.dk_klgd.page.list && this.props.dk_klgd.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số đăng kí khối lượng giảng dạy</th>
                            <th style={{ width: '60%' }}>Tên đăng kí khối lượng giảng dạy</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dk_klgd.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showDk_klgd(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteDk_klgd(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có đăng kí khối lượng giảng dạy nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.dk_klgd && this.props.dk_klgd.page ?
            this.props.dk_klgd.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Đăng kí khối lượng giảng dạy</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Đăng kí khối lượng giảng dạy</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminDk_klgd'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getDk_klgdInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ dk_klgd: state.dk_klgd });
const mapActionsToProps = { getDk_klgdInPage, getDk_klgd, updateDk_klgd, deleteDk_klgd };
export default connect(mapStateToProps, mapActionsToProps)(Dk_klgdPage);