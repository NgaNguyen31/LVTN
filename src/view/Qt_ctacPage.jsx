import React from 'react';
import { connect } from 'react-redux';
import { getQt_ctacInPage, getQt_ctac, updateQt_ctac, deleteQt_ctac } from './redux/qt_ctac.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_ctacPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_ctac = this.showQt_ctac.bind(this);
        this.deleteQt_ctac = this.deleteQt_ctac.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_ctacInPage();
        });
    }

    showQt_ctac(e, qt_ctacId) {
        console.log(data);
        this.props.getQt_ctac(qt_ctacId, qt_ctac => this.props.showQt_ctac(qt_ctac));
        e.preventDefault();
    }

    deleteQt_ctac(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_ctac(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_ctac && this.props.qt_ctac.page && this.props.qt_ctac.page.list && this.props.qt_ctac.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị công tác</th>
                            <th style={{ width: '60%' }}>Tên quản trị công tác</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_ctac.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_ctac(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_ctac(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị công tác nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_ctac && this.props.qt_ctac.page ?
            this.props.qt_ctac.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị công tác</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị công tác</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_ctac'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_ctacInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_ctac: state.qt_ctac });
const mapActionsToProps = { getQt_ctacInPage, getQt_ctac, updateQt_ctac, deleteQt_ctac };
export default connect(mapStateToProps, mapActionsToProps)(Qt_ctacPage);
