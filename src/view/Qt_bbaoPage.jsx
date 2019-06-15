import React from 'react';
import { connect } from 'react-redux';
import { getQt_bbaoInPage, createQt_bbao, updateQt_bbao, deleteQt_bbao, getAllQt_bbao } from './redux/qt_bbao.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import { Link } from 'react-router-dom';
import Qt_bbaoModal from './Qt_bbaoModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_bbaoPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_bbaoModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(3, 0);
            this.props.getQt_bbaoInPage();
        });
        this.props.getAllCbcnv();
    }

    edit(e, item){
        this.qt_bbaoModal.current.show(item, this.props.cbcnv.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_bbao(item._id);
        $(document).ready(() => setTimeout(() => {
                $(this.qt_bbaoModal.current).on('shown.bs.modal', () => $('#MS_NV').focus());
            }, 0));
        });
        e.preventDefault();
    }
    

    render() {              
        // console.log(this.props.qt_bbao);
             
        let table = null;              
        if (this.props.qt_bbao && this.props.qt_bbao.page && this.props.qt_bbao.page.list && this.props.qt_bbao.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>STT</th>
                            <th style={{ width: '40%', textAlign: 'center' }}>Bài báo</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Tên tạp chí</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Năm</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_bbao.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.STT}</td>
                                <td>{item.BAI_BAO}</td>
                                <td>{item.TEN_TCHI}</td>
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
            table = <p>Chưa có quản trị bài báo nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_bbao && this.props.qt_bbao.page ?
            this.props.qt_bbao.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị bài báo</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị bài báo</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_bbao'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_bbaoInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_bbaoModal ref={this.qt_bbaoModal} createQt_bbao={this.props.createQt_bbao} updateQt_bbao={this.props.updateQt_bbao} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_bbao: state.qt_bbao, cbcnv: state.cbcnv});
const mapActionsToProps = { getQt_bbaoInPage, createQt_bbao, updateQt_bbao, deleteQt_bbao, getAllQt_bbao, getAllCbcnv};
export default connect(mapStateToProps, mapActionsToProps)(Qt_bbaoPage);
