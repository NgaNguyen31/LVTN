import React from 'react';
import { connect } from 'react-redux';
import { getKhoaInPage, createKhoa, updateKhoa, deleteKhoa } from './redux/khoa.jsx'
import { Link } from 'react-router-dom';
import KhoaModal from './KhoaModel.jsx';
import Pagination from './Pagination.jsx';

class KhoaPage extends React.Component {
    constructor(props) {
        super(props);
        this.khoaModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(10, 10);
            this.props.getKhoaInPage();
        });
    }

    edit(e, item){
        this.khoaModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteKhoa(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.khoa && this.props.khoa.page && this.props.khoa.page.list && this.props.khoa.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                        <th style={{ width: '40%', textAlign: 'center' }}>Tên khoa</th>
                            <th style={{ width: '40%', textAlign: 'center' }}>Tên tiếng anh</th>
                            <th style={{ width: '20%', textAlign: 'center' }}>Tên khoa tắt</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.khoa.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.TEN_KHOA ? item.TEN_KHOA + ' ' : '')}</a>
                                </td>     
                                <td>{item.TEN_TIENG_ANH}</td>
                                <td>{item.TEN_KHOA_TAT}</td>
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.edit(e, item)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.delete(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có khoa nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.khoa && this.props.khoa.page ?
            this.props.khoa.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Khoa</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Khoa</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKhoa'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKhoaInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <KhoaModal ref={this.khoaModal} createKhoa={this.props.createKhoa} updateKhoa={this.props.updateKhoa} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ khoa: state.khoa });
const mapActionsToProps = { getKhoaInPage, createKhoa, updateKhoa, deleteKhoa  };
export default connect(mapStateToProps, mapActionsToProps)(KhoaPage);
