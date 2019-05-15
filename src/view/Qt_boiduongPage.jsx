import React from 'react';
import { connect } from 'react-redux';
import { getQt_boiduongInPage, createQt_boiduong, updateQt_boiduong, deleteQt_boiduong, getAllQt_boiduong } from './redux/qt_boiduong.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import { Link } from 'react-router-dom';
import Qt_boiduongModal from './Qt_boiduongModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_boiduongPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_boiduongModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(9, 1);
            this.props.getQt_boiduongInPage();
        });
        this.props.getAllCbcnv();
    }

    edit(e, item){
        this.qt_boiduongModal.current.show(item, this.props.cbcnv.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_boiduong(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_boiduong && this.props.qt_boiduong.page && this.props.qt_boiduong.page.list && this.props.qt_boiduong.page.list.length > 0) {
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
                            <th style={{ width: 'auto', textAlign: 'center' }}>Nội dung bồi dưỡng</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Nơi bồi dưỡng</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Hình thức</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Chứng chỉ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Nộp chứng chỉ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_boiduong.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.STT}</td>
                                <td>{item.TU_THANG}</td>
                                <td>{item.TU_NAM}</td>
                                <td>{item.DEN_THANG}</td>
                                <td>{item.DEN_NAM}</td>
                                <td>{item.NOI_DUNG_BD}</td>
                                <td>{item.NOI_BOI_DUONG}</td>
                                <td>{item.HINH_THUC}</td>
                                <td>{item.CHUNG_CHI}</td>
                                <td>{item.NOP_CC}</td>
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
            table = <p>Chưa có quản trị bồi dưỡng nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_boiduong && this.props.qt_boiduong.page ?
            this.props.qt_boiduong.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị bồi dưỡng</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị bồi dưỡng</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_boiduong'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_boiduongInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_boiduongModal ref={this.qt_boiduongModal} createQt_boiduong={this.props.createQt_boiduong} updateQt_boiduong={this.props.updateQt_boiduong} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_boiduong: state.qt_boiduong, cbcnv: state.cbcnv});
const mapActionsToProps = { getQt_boiduongInPage, createQt_boiduong, updateQt_boiduong, deleteQt_boiduong, getAllQt_boiduong, getAllCbcnv};
export default connect(mapStateToProps, mapActionsToProps)(Qt_boiduongPage);
