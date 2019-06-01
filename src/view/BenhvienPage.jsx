import React from 'react';
import { connect } from 'react-redux';
import { getBenhvienInPage, createBenhvien, updateBenhvien, deleteBenhvien } from './redux/benhvien.jsx'
import { Link } from 'react-router-dom';
import BenhvienModal from './BenhvienModel.jsx';
import Pagination from './Pagination.jsx';

class BenhvienPage extends React.Component {
    constructor(props) {
        super(props);
        this.benhvienModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4, 0);
            this.props.getBenhvienInPage();
        });
    }

    edit(e, item){
        this.benhvienModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteBenhvien(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.benhvien && this.props.benhvien.page && this.props.benhvien.page.list && this.props.benhvien.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '100%', textAlign: 'center' }}>Tên bệnh viện</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.benhvien.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.Noi_kham ? item.Noi_kham + ' ' : '')}</a>
                                </td>                            
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
            table = <p>Chưa có bệnh viện nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.benhvien && this.props.benhvien.page ?
            this.props.benhvien.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Bệnh viện</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Bệnh viện</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminBenhvien'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getBenhvienInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <BenhvienModal ref={this.benhvienModal} createBenhvien={this.props.createBenhvien} updateBenhvien={this.props.updateBenhvien} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ benhvien: state.benhvien });
const mapActionsToProps = { getBenhvienInPage, createBenhvien, updateBenhvien, deleteBenhvien  };
export default connect(mapStateToProps, mapActionsToProps)(BenhvienPage);
