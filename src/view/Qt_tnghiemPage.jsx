import React from 'react';
import { connect } from 'react-redux';
import { getQt_tnghiemInPage, createQt_tnghiem, updateQt_tnghiem, deleteQt_tnghiem, getAllQt_tnghiem } from './redux/qt_tnghiem.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import { Link } from 'react-router-dom';
import Qt_tnghiemModal from './Qt_tnghiemModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_tnghiemPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_tnghiemModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.jsUcfirst = this.jsUcfirst.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(3, 13);
            this.props.getQt_tnghiemInPage();
        });
        this.props.getAllCbcnv();
    }

    edit(e, item){
        this.qt_tnghiemModal.current.show(item, this.props.cbcnv.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_tnghiem(item._id);
        });
        e.preventDefault();
    }
    
     jsUcfirst(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {                   
        let table = null;              
        if (this.props.qt_tnghiem && this.props.qt_tnghiem.page && this.props.qt_tnghiem.page.list && this.props.qt_tnghiem.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>STT</th>
                            <th style={{ width: '55%', textAlign: 'center' }}>Bài TN</th>
                            <th style={{ width: '25%', textAlign: 'center' }}>Năm</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_tnghiem.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.STT}</td>
                                <td>{this.jsUcfirst(item.BAI_TN)}</td>
                                <td>{T.dateToText(item.NAM,'dd/mm/yyyy')}</td>
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
            table = <p>Chưa có quản trị thí nghiệm nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_tnghiem && this.props.qt_tnghiem.page ?
            this.props.qt_tnghiem.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị thí nghiệm</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị thí nghiệm</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_tnghiem'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_tnghiemInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_tnghiemModal ref={this.qt_tnghiemModal} createQt_tnghiem={this.props.createQt_tnghiem} updateQt_tnghiem={this.props.updateQt_tnghiem} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_tnghiem: state.qt_tnghiem, cbcnv: state.cbcnv});
const mapActionsToProps = { getQt_tnghiemInPage, createQt_tnghiem, updateQt_tnghiem, deleteQt_tnghiem, getAllQt_tnghiem, getAllCbcnv};
export default connect(mapStateToProps, mapActionsToProps)(Qt_tnghiemPage);
