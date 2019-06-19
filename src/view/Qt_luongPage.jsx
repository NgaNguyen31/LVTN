import React from 'react';
import { connect } from 'react-redux';
import { getQt_luongInPage, createQt_luong, updateQt_luong, deleteQt_luong, getAllQt_luong } from './redux/qt_luong.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllNgach} from './redux/ngach.jsx';
import { Link } from 'react-router-dom';
import Qt_luongModal from './Qt_luongModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_luongPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_luongModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(3, 10);
            this.props.getQt_luongInPage();
        });
        this.props.getAllCbcnv();
        this.props.getAllNgach();
    }

    edit(e, item){
        this.qt_luongModal.current.show(item, this.props.cbcnv.data.items, this.props.ngach.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_luong(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_luong && this.props.qt_luong.page && this.props.qt_luong.page.list && this.props.qt_luong.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>STT</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>QĐ lương</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ngày QĐ</th> */}
                            <th style={{ width: '20%', textAlign: 'center' }}>Ngày hưởng</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Mốc năng lượng</th> */}
                            <th style={{ width: '10%', textAlign: 'center' }}>Ngạch</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Hệ số</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Bậc</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>% vượt khủng</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Lương khoản chính</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Tỷ lệ</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú lương</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú khác</th> */}
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_luong.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.STT}</td>
                                {/* <td>{item.QD_luong}</td>
                                <td>{item.Ngay_QD}</td> */}
                                <td>{T.dateToText(item.Ngay_huong,'dd/mm/yyyy')}</td>
                                {/* <td>{item.Moc_nang_luong}</td> */}
                                <td>{item.Ngach.NGACH}</td>
                                <td>{item.Heso}</td>
                                <td>{item.Bac}</td>
                                <td>{item.PT_Vuot_Khung}</td>
                                <td>{item.LG_Khoan_Chinh}</td>
                                <td>{item.Ty_le}</td>
                                {/* <td>{item.GHI_CHU_LUONG}</td>
                                <td>{item.GHI_CHU_KHAC}</td> */}
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
            table = <p>Chưa có quản trị lương nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_luong && this.props.qt_luong.page ?
            this.props.qt_luong.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị lương</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị lương</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_luong'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_luongInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_luongModal ref={this.qt_luongModal} createQt_luong={this.props.createQt_luong} updateQt_luong={this.props.updateQt_luong} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_luong: state.qt_luong, cbcnv: state.cbcnv, ngach: state.ngach});
const mapActionsToProps = { getQt_luongInPage, createQt_luong, updateQt_luong, deleteQt_luong, getAllQt_luong, getAllCbcnv, getAllNgach};
export default connect(mapStateToProps, mapActionsToProps)(Qt_luongPage);
