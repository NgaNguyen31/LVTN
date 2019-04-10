import React from 'react';
import { connect } from 'react-redux';
import { getNgoainguInPage, getNgoaingu, updateNgoaingu, deleteNgoaingu } from './redux/ngoaingu.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class NgoainguPage extends React.Component {
    constructor(props) {
        super(props);
        this.showNgoaingu = this.showNgoaingu.bind(this);
        this.deleteNgoaingu = this.deleteNgoaingu.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getNgoainguInPage();
        });
    }

    showNgoaingu(e, ngoainguId) {
        console.log(data);
        this.props.getNgoaingu(ngoainguId, ngoaingu => this.props.showNgoaingu(ngoaingu));
        e.preventDefault();
    }

    deleteNgoaingu(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteNgoaingu(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.ngoaingu && this.props.ngoaingu.page && this.props.ngoaingu.page.list && this.props.ngoaingu.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số ngoại ngữ</th>
                            <th style={{ width: '60%' }}>Tên ngoại ngữ</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.ngoaingu.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showNgoaingu(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteNgoaingu(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có ngoại ngữ nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.ngoaingu && this.props.ngoaingu.page ?
            this.props.ngoaingu.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Ngoại ngữ</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Ngoại ngữ</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminNgoaingu'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getNgoainguInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ ngoaingu: state.ngoaingu });
const mapActionsToProps = { getNgoainguInPage, getNgoaingu, updateNgoaingu, deleteNgoaingu };
export default connect(mapStateToProps, mapActionsToProps)(NgoainguPage);
