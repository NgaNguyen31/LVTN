import React from 'react';
import { connect } from 'react-redux';
import { getNgachInPage, getNgach, updateNgach, deleteNgach } from './redux/ngach.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class NgachPage extends React.Component {
    constructor(props) {
        super(props);
        this.showNgach = this.showNgach.bind(this);
        this.deleteNgach = this.deleteNgach.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getNgachInPage();
        });
    }

    showNgach(e, ngachId) {
        console.log(data);
        this.props.getNgach(ngachId, ngach => this.props.showNgach(ngach));
        e.preventDefault();
    }

    deleteNgach(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteNgach(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.ngach && this.props.ngach.page && this.props.ngach.page.list && this.props.ngach.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số ngạch</th>
                            <th style={{ width: '60%' }}>Tên ngạch</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.ngach.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showNgach(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteNgach(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có ngạch nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.ngach && this.props.ngach.page ?
            this.props.ngach.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Ngạch</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Ngạch</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminNgach'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getNgachInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ ngach: state.ngach });
const mapActionsToProps = { getNgachInPage, getNgach, updateNgach, deleteNgach };
export default connect(mapStateToProps, mapActionsToProps)(NgachPage);