import React from 'react';
import { connect } from 'react-redux';
import { getQt_gtrinhInPage, getQt_gtrinh, updateQt_gtrinh, deleteQt_gtrinh } from './redux/qt_gtrinh.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Qt_gtrinhPage extends React.Component {
    constructor(props) {
        super(props);
        this.showQt_gtrinh = this.showQt_gtrinh.bind(this);
        this.deleteQt_gtrinh = this.deleteQt_gtrinh.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getQt_gtrinhInPage();
        });
    }

    showQt_gtrinh(e, qt_gtrinhId) {
        console.log(data);
        this.props.getQt_gtrinh(qt_gtrinhId, qt_gtrinh => this.props.showQt_gtrinh(qt_gtrinh));
        e.preventDefault();
    }

    deleteQt_gtrinh(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_gtrinh(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.qt_gtrinh && this.props.qt_gtrinh.page && this.props.qt_gtrinh.page.list && this.props.qt_gtrinh.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số quản trị giáo trình</th>
                            <th style={{ width: '60%' }}>Tên quản trị giáo trình</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_gtrinh.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showQt_gtrinh(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteQt_gtrinh(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có quản trị giáo trình nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_gtrinh && this.props.qt_gtrinh.page ?
            this.props.qt_gtrinh.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Quản trị giáo trình</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị giáo trình</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_gtrinh'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_gtrinhInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_gtrinh: state.qt_gtrinh });
const mapActionsToProps = { getQt_gtrinhInPage, getQt_gtrinh, updateQt_gtrinh, deleteQt_gtrinh };
export default connect(mapStateToProps, mapActionsToProps)(Qt_gtrinhPage);
