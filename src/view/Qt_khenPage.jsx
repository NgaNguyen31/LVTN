import React from 'react';
import { connect } from 'react-redux';
import { getQt_khenInPage, getQt_khen, updateQt_khen, deleteQt_khen } from './redux/qt_khen.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_khenPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_khen = this.showQt_khen.bind(this);
        this.deleteQt_khen = this.deleteQt_khen.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_khenInPage();
        });
    }

    showQt_khen(e, qt_khenId) {
        console.log(data);
        this.props.getQt_khen(qt_khenId, qt_khen => this.props.showQt_khen(qt_khen));
        e.preventDefault();
    }

    deleteQt_khen(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_khen(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_khen && this.props.qt_khen.page && this.props.qt_khen.page.list && this.props.qt_khen.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị khen</th>
                            <th style={{ width: '60%' }}>Tên quản trị khen</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_khen.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_khen(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_khen(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị khen nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_khen && this.props.qt_khen.page ?
            this.props.qt_khen.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị khen</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị khen</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_khen'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_khenInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_khen: state.qt_khen });
const mapActionsToProps = { getQt_khenInPage, getQt_khen, updateQt_khen, deleteQt_khen };
export default connect(mapStateToProps, mapActionsToProps)(Qt_khenPage);
