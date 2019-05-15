import React from 'react';
import { connect } from 'react-redux';
import { getQt_ctacInPage, createQt_ctac, updateQt_ctac, deleteQt_ctac, getAllQt_ctac } from './redux/qt_ctac.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllChucvu} from './redux/chucvu.jsx';
import { Link } from 'react-router-dom';
import Qt_ctacModal from './Qt_ctacModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_ctacPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_ctacModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(9, 3);
            this.props.getQt_ctacInPage();
        });
        this.props.getAllCbcnv();
        this.props.getAllChucvu();
    }

    edit(e, item){
        this.qt_ctacModal.current.show(item, this.props.cbcnv.data.items, this.props.chucvu.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_ctac(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_ctac && this.props.qt_ctac.page && this.props.qt_ctac.page.list && this.props.qt_ctac.page.list.length > 0) {
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
                            <th style={{ width: 'auto', textAlign: 'center' }}>Chức vụ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Nơi công tác</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Bộ môn công tác</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Công việc</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_ctac.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.STT}</td>
                                <td>{item.TU_THANG}</td>
                                <td>{item.TU_NAM}</td>
                                <td>{item.DEN_THANG}</td>
                                <td>{item.DEN_NAM}</td>
                                <td>{item.CHUC_VU.CHUC_VU}</td>
                                <td>{item.NOI_CONG_TAC}</td>
                                <td>{item.BO_MON_CT}</td>
                                <td>{item.CONG_VIEC}</td>
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
            table = <p>Chưa có quản trị công tác nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_ctac && this.props.qt_ctac.page ?
            this.props.qt_ctac.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị công tác</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị công tác</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_ctac'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_ctacInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_ctacModal ref={this.qt_ctacModal} createQt_ctac={this.props.createQt_ctac} updateQt_ctac={this.props.updateQt_ctac} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_ctac: state.qt_ctac, cbcnv: state.cbcnv, chucvu: state.chucvu});
const mapActionsToProps = { getQt_ctacInPage, createQt_ctac, updateQt_ctac, deleteQt_ctac, getAllQt_ctac, getAllCbcnv, getAllChucvu};
export default connect(mapStateToProps, mapActionsToProps)(Qt_ctacPage);
