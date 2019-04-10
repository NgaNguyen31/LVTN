import React from 'react';
import { connect } from 'react-redux';
import { getNuocInPage, getNuoc, updateNuoc, deleteNuoc } from './redux/nuoc.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class NuocPage extends React.Component {
    constructor(props) {
        super(props);
        this.showNuoc = this.showNuoc.bind(this);
        this.deleteNuoc = this.deleteNuoc.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getNuocInPage();
        });
    }

    showNuoc(e, nuocId) {
        console.log(data);
        this.props.getNuoc(nuocId, nuoc => this.props.showNuoc(nuoc));
        e.preventDefault();
    }

    deleteNuoc(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteNuoc(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.nuoc && this.props.nuoc.page && this.props.nuoc.page.list && this.props.nuoc.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số nước</th>
                            <th style={{ width: '60%' }}>Tên nước</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.nuoc.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showNuoc(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteNuoc(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có nước nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.nuoc && this.props.nuoc.page ?
            this.props.nuoc.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Nước</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Nước</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminNuoc'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getNuocInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ nuoc: state.nuoc });
const mapActionsToProps = { getNuocInPage, getNuoc, updateNuoc, deleteNuoc };
export default connect(mapStateToProps, mapActionsToProps)(NuocPage);
