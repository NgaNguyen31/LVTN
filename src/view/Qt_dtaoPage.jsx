import React from 'react';
import { connect } from 'react-redux';
import { getQt_dtaoInPage, createQt_dtao, updateQt_dtao, deleteQt_dtao, getAllQt_dtao } from './redux/qt_dtao.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import { Link } from 'react-router-dom';
import Qt_dtaoModal from './Qt_dtaoModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_dtaoPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_dtaoModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(3, 6);
            this.props.getQt_dtaoInPage();
        });
        this.props.getAllCbcnv();
    }

    edit(e, item){
        this.qt_dtaoModal.current.show(item, this.props.cbcnv.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_dtao(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_dtao && this.props.qt_dtao.page && this.props.qt_dtao.page.list && this.props.qt_dtao.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: 'auto', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>STT</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Từ tháng</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Từ năm</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Đến tháng</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Đến năm</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Cấp đào tạo</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Chuyên ngành</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Nơi đào tạo</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Quốc gia</th>                            
                            <th style={{ width: 'auto', textAlign: 'center' }}>Hình thức</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Loại TN</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Năm</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Có nộp bằng</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_dtao.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.STT}</td>
                                <td>{item.TU_THANG}</td>
                                <td>{item.TU_NAM}</td>
                                <td>{item.DEN_THANG}</td>
                                <td>{item.DEN_NAM}</td>
                                <td>{item.cap_dt}</td>
                                <td>{item.CHUYEN_NGANH}</td>
                                <td>{item.NOI_DT}</td>
                                <td>{item.QUOC_GIA}</td>                                
                                <td>{item.HINH_THUC}</td>
                                <td>{item.LOAI_TN}</td>
                                <td>{item.NAM}</td>
                                <td>{item.CO_NOP_BANG}</td>
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
            table = <p>Chưa có quản trị đào tạo nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_dtao && this.props.qt_dtao.page ?
            this.props.qt_dtao.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị đào tạo</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị đào tạo</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_dtao'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_dtaoInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_dtaoModal ref={this.qt_dtaoModal} createQt_dtao={this.props.createQt_dtao} updateQt_dtao={this.props.updateQt_dtao} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_dtao: state.qt_dtao, cbcnv: state.cbcnv});
const mapActionsToProps = { getQt_dtaoInPage, createQt_dtao, updateQt_dtao, deleteQt_dtao, getAllQt_dtao, getAllCbcnv};
export default connect(mapStateToProps, mapActionsToProps)(Qt_dtaoPage);
