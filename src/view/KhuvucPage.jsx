import React from 'react';
import { connect } from 'react-redux';
import { getKhuvucInPage, createKhuvuc, updateKhuvuc, deleteKhuvuc, getAllKhuvuc } from './redux/khuvuc.jsx';
import { Link } from 'react-router-dom';
import KhuvucModal from './KhuvucModel.jsx';
import Pagination from './Pagination.jsx';

class KhuvucPage extends React.Component {
    constructor(props) {
        super(props);
        this.khuvucModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4, 7);
            this.props.getKhuvucInPage();
        });
    }

    edit(e, item){
        this.khuvucModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteKhuvuc(item._id);
        });
        e.preventDefault();
    }

    render() {                   
        let table = null;              
        if (this.props.khuvuc && this.props.khuvuc.page && this.props.khuvuc.page.list && this.props.khuvuc.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '50%', textAlign: 'center' }}>Tên khu vực</th>
                            <th style={{ width: '50%', textAlign: 'center' }}>Mã số châu</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.khuvuc.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.TEN_KVUC ? item.TEN_KVUC + ' ' : '')}</a>
                                </td>       
                                <td>{item.MS_CHAU}</td>
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.edit(e, item)}>
                                        <i className='fa fa-lg fa-edit' />
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
            table = <p>Chưa có khu vực nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.khuvuc && this.props.khuvuc.page ?
            this.props.khuvuc.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin khu vực</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Khu vực</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKhuvuc'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKhuvucInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <KhuvucModal ref={this.khuvucModal} createKhuvuc={this.props.createKhuvuc} updateKhuvuc={this.props.updateKhuvuc} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ khuvuc: state.khuvuc});
const mapActionsToProps = { getKhuvucInPage, createKhuvuc, updateKhuvuc, deleteKhuvuc, getAllKhuvuc };
export default connect(mapStateToProps, mapActionsToProps)(KhuvucPage);
