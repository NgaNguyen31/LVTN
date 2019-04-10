import React from 'react';
import { connect } from 'react-redux';
import { getNghi_ctacInPage, getNghi_ctac, updateNghi_ctac, deleteNghi_ctac } from './redux/nghi_ctac.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Nghi_ctacPage extends React.Component {
    constructor(props) {
        super(props);
        this.showNghi_ctac = this.showNghi_ctac.bind(this);
        this.deleteNghi_ctac = this.deleteNghi_ctac.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getNghi_ctacInPage();
        });
    }

    showNghi_ctac(e, nghi_ctacId) {
        console.log(data);
        this.props.getNghi_ctac(nghi_ctacId, nghi_ctac => this.props.showNghi_ctac(nghi_ctac));
        e.preventDefault();
    }

    deleteNghi_ctac(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteNghi_ctac(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.nghi_ctac && this.props.nghi_ctac.page && this.props.nghi_ctac.page.list && this.props.nghi_ctac.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số nghỉ công tác</th>
                            <th style={{ width: '60%' }}>Tên nghỉ công tác</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.nghi_ctac.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showNghi_ctac(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteNghi_ctac(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có nghỉ công tác nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.nghi_ctac && this.props.nghi_ctac.page ?
            this.props.nghi_ctac.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Nghỉ công tác</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Nghỉ công tác</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminNghi_ctac'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getNghi_ctacInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ nghi_ctac: state.nghi_ctac });
const mapActionsToProps = { getNghi_ctacInPage, getNghi_ctac, updateNghi_ctac, deleteNghi_ctac };
export default connect(mapStateToProps, mapActionsToProps)(Nghi_ctacPage);
