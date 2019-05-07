import React from 'react';
import { connect } from 'react-redux';
import { getCb_nngoaiInPage, createCb_nngoai, getCb_nngoai, updateCb_nngoai, deleteCb_nngoai } from './redux/cb_nngoai.jsx'
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllNuoc} from './redux/nuoc.jsx';
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';
import Cb_nngoaiModal from './Cb_nngoaiModel.jsx';

class Cb_nngoaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.Cb_nngoaiModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(9, 2);
            this.props.getCb_nngoaiInPage();
        });
        this.props.getAllNuoc();
        this.props.getAllCbcnv();
    }

    edit(e,item){        
        this.Cb_nngoaiModal.current.show(item, this.props.cbcnv.data.items, this.props.nuoc.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteCb_nngoai(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.cb_nngoai && this.props.cb_nngoai.page && this.props.cb_nngoai.page.list && this.props.cb_nngoai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Họ và tên</th>
                            <th style={{ width: '60%' }}>Nước</th>
                            <th style={{ width: 'auto' }}>Ngày đi</th>
                            <th style={{ width: 'auto' }}>Ngày về</th>
                            <th style={{ width: 'auto' }}>Thời gian</th>
                            <th style={{ width: 'auto' }}>Mục đích</th>
                            <th style={{ width: 'auto' }}>Gia hạn</th>
                            <th style={{ width: 'auto' }}>Số công văn</th>
                            <th style={{ width: 'auto' }}>Ngày công văn</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cb_nngoai.page.list.map((item, index) => (
                            <tr key={index}>         
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.Hovaten ? item.Hovaten + ' ' : '')}</a>
                                </td> 
                                <td>{item.Nuoc}</td>      
                                <td>{item.Ngaydi}</td>
                                <td>{item.Ngayve}</td>                            
                                <td>{item.Thoigian}</td>
                                <td>{item.Mucdich}</td>
                                <td>{item.Giahan}</td>    
                                <td>{item.SoCVan}</td>
                                <td>{item.NgayCVan}</td>                     
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
            table = <p>Chưa có cán bộ nước ngoài nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.cb_nngoai && this.props.cb_nngoai.page ?
            this.props.cb_nngoai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Cán bộ nước ngoài</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Cán bộ nước ngoài</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminCb_nngoai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getCb_nngoaiInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Cb_nngoaiModal ref={this.Cb_nngoaiModal} createCb_nngoai={this.props.createCb_nngoai} updateCb_nngoai={this.props.updateCb_nngoai} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ cb_nngoai: state.cb_nngoai, cbcnv: state.cbcnv, nuoc: state.nuoc });
const mapActionsToProps = { getCb_nngoaiInPage,createCb_nngoai ,getCb_nngoai, updateCb_nngoai, deleteCb_nngoai, getAllCbcnv, getAllNuoc };
export default connect(mapStateToProps, mapActionsToProps)(Cb_nngoaiPage);
