import React from 'react';
import { connect } from 'react-redux';
import { getQt_cvuInPage, createQt_cvu, updateQt_cvu, deleteQt_cvu, getAllQt_cvu } from './redux/qt_cvu.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllChucvu} from './redux/chucvu.jsx';
import {getAllBomon} from './redux/bomon.jsx';
import { Link } from 'react-router-dom';
import Qt_cvuModal from './Qt_cvuModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_cvuPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_cvuModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(9, 4);
            this.props.getQt_cvuInPage();
        });
        this.props.getAllCbcnv();
        this.props.getAllChucvu();
        this.props.getAllBomon();
    }

    edit(e, item){
        this.qt_cvuModal.current.show(item, this.props.cbcnv.data.items, this.props.chucvu.data.items, this.props.bomon.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_cvu(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_cvu && this.props.qt_cvu.page && this.props.qt_cvu.page.list && this.props.qt_cvu.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: 'auto', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>STT</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>QĐ bổ nhiệm</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày QĐ bổ nhiệm</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Mã chức vụ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Chức vụ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Hệ số PCCV</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày bổ nhiệm</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú BHXH</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày thôi chức vụ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>QĐ thôi chức vụ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày QĐ thôi chức vụ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>MSBM</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_cvu.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.STT}</td>
                                <td>{item.QD_BO_NHIEM}</td>
                                <td>{item.NGAY_QD_BNHIEM}</td>
                                <td>{item.MA_CV? item.MA_CV.CHUC_VU: ''}</td>
                                <td>{item.CHUC_VU}</td>
                                <td>{item.HE_SO_PCCV}</td>
                                <td>{item.NGAY_BO_NHIEM}</td>
                                <td>{item.GHI_CHU_BHXH}</td>
                                <td>{item.NGAY_THOICV}</td>
                                <td>{item.QD_THOI_CVU}</td>
                                <td>{item.NGAY_QD_THOI_CV}</td>
                                <td>{item.MS_BOMON? item.MS_BOMON.TEN_BM: ''}</td>
                                <td>{item.GHI_CHU}</td>
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
            table = <p>Chưa có quản trị chức vụ nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_cvu && this.props.qt_cvu.page ?
            this.props.qt_cvu.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị chức vụ</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị chức vụ</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_cvu'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_cvuInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_cvuModal ref={this.qt_cvuModal} createQt_cvu={this.props.createQt_cvu} updateQt_cvu={this.props.updateQt_cvu} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_cvu: state.qt_cvu, cbcnv: state.cbcnv, chucvu: state.chucvu, bomon: state.bomon});
const mapActionsToProps = { getQt_cvuInPage, createQt_cvu, updateQt_cvu, deleteQt_cvu, getAllQt_cvu, getAllCbcnv, getAllChucvu, getAllBomon};
export default connect(mapStateToProps, mapActionsToProps)(Qt_cvuPage);
