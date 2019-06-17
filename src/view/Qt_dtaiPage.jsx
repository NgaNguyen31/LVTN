import React from 'react';
import { connect } from 'react-redux';
import { getQt_dtaiInPage, createQt_dtai, updateQt_dtai, deleteQt_dtai, getAllQt_dtai } from './redux/qt_dtai.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import { Link } from 'react-router-dom';
import Qt_dtaiModal from './Qt_dtaiModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_dtaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_dtaiModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(3, 5);
            this.props.getQt_dtaiInPage();
        });
        this.props.getAllCbcnv();
    }

    edit(e, item){
        this.qt_dtaiModal.current.show(item, this.props.cbcnv.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_dtai(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_dtai && this.props.qt_dtai.page && this.props.qt_dtai.page.list && this.props.qt_dtai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%%', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>STT</th>
                            <th style={{ width: '20%', textAlign: 'center' }}>Đề tài</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Chủ nhiệm đề tài</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Cấp</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Ngày kết thúc</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Năm</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_dtai.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.STT}</td>
                                <td>{item.DE_TAI}</td>
                                <td>{item.CHU_NHIEM_DE_TAI}</td>
                                <td>{item.CAP}</td>
                                <td>{T.dateToText(item.NGAY_KETTHUC,'dd/mm/yyyy')}</td>
                                <td>{T.dateToText(item.NAM,'dd/mm/yyyy')}</td>
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
            table = <p>Chưa có quản trị đề tài nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_dtai && this.props.qt_dtai.page ?
            this.props.qt_dtai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị đề tài</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị đề tài</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_dtai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_dtaiInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_dtaiModal ref={this.qt_dtaiModal} createQt_dtai={this.props.createQt_dtai} updateQt_dtai={this.props.updateQt_dtai} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_dtai: state.qt_dtai, cbcnv: state.cbcnv});
const mapActionsToProps = { getQt_dtaiInPage, createQt_dtai, updateQt_dtai, deleteQt_dtai, getAllQt_dtai, getAllCbcnv};
export default connect(mapStateToProps, mapActionsToProps)(Qt_dtaiPage);
