import React from 'react';
import { connect } from 'react-redux';
import { getQt_nngoaiInPage, createQt_nngoai, updateQt_nngoai, deleteQt_nngoai, getAllQt_nngoai } from './redux/qt_nngoai.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllMucdich} from './redux/mucdich.jsx';
import {getAllNuoc} from './redux/nuoc.jsx';
import { Link } from 'react-router-dom';
import Qt_nngoaiModal from './Qt_nngoaiModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_nngoaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_nngoaiModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(9, 10);
            this.props.getQt_nngoaiInPage();
        });
        this.props.getAllCbcnv();
        this.props.getAllMucdich();
        this.props.getAllNuoc();
    }

    edit(e, item){
        this.qt_nngoaiModal.current.show(item, this.props.cbcnv.data.items, this.props.mucdich.data.items, this.props.nuoc.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_nngoai(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_nngoai && this.props.qt_nngoai.page && this.props.qt_nngoai.page.list && this.props.qt_nngoai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '30%', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Họ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Tên</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Số QĐ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày QĐ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Đơn vị</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày đi</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày về</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày vè thực</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Số QĐ tiếp nhận</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày QĐ tiếp nhận</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Mục đích</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Nội dung</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngành học</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Gia hạn</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Nước đến</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Nơi đến</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Chi phí</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Hoàn trả KP BHXH</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày nhập</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>BHXH</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_nngoai.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.HO}</td>
                                <td>{item.TEN}</td>
                                <td>{item.SO_QUYET_DINH}</td>
                                <td>{item.NGAY_QDINH}</td>
                                <td>{item.DON_VI}</td>
                                <td>{item.NGAY_DI}</td>
                                <td>{item.NGAY_VE}</td>
                                <td>{item.NGAY_VE_THUC}</td>
                                <td>{item.SO_QD_TIEP_NHAN}</td>
                                <td>{item.NGAY_QD_TIEP_NHAN}</td>
                                <td>{item.MUC_DICH.MUC_DICH}</td>
                                <td>{item.NOI_DUNG}</td>
                                <td>{item.NGANH_HOC}</td>
                                <td>{item.GIA_HAN}</td>
                                <td>{item.NUOC_DEN.reduce((pre, value) => pre + ' ' +  value.TEN_NUOC, ' ')}</td>
                                <td>{item.NOI_DEN}</td>
                                <td>{item.CHI_PHI}</td>
                                <td>{item.GHI_CHU}</td>
                                <td>{item.HOAN_TRA_KP_BHXH}</td>
                                <td>{item.NGAY_NHAP}</td>
                                <td>{item.BHXH}</td>
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
            table = <p>Chưa có quản trị nước ngoài nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_nngoai && this.props.qt_nngoai.page ?
            this.props.qt_nngoai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị nước ngoài</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị nước ngoài</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_nngoai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_nngoaiInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_nngoaiModal ref={this.qt_nngoaiModal} createQt_nngoai={this.props.createQt_nngoai} updateQt_nngoai={this.props.updateQt_nngoai} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_nngoai: state.qt_nngoai, cbcnv: state.cbcnv, mucdich: state.mucdich, nuoc: state.nuoc});
const mapActionsToProps = { getQt_nngoaiInPage, createQt_nngoai, updateQt_nngoai, deleteQt_nngoai, getAllQt_nngoai, getAllCbcnv, getAllMucdich, getAllNuoc};
export default connect(mapStateToProps, mapActionsToProps)(Qt_nngoaiPage);
