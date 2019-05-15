import React from 'react';
import { connect } from 'react-redux';
import { getQt_nnguInPage, createQt_nngu, updateQt_nngu, deleteQt_nngu, getAllQt_nngu } from './redux/qt_nngu.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllNgoaingu} from './redux/ngoaingu.jsx';
import { Link } from 'react-router-dom';
import Qt_nnguModal from './Qt_nnguModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_nnguPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_nnguModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(9, 0);
            this.props.getQt_nnguInPage();
        });
        this.props.getAllCbcnv();
        this.props.getAllNgoaingu();
    }

    edit(e, item){
        this.qt_nnguModal.current.show(item, this.props.cbcnv.data.items, this.props.ngoaingu.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_nngu(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_nngu && this.props.qt_nngu.page && this.props.qt_nngu.page.list && this.props.qt_nngu.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '30%', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Ngoại ngữ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Trình độ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_nngu.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.N_NGU.N_NGU}</td>
                                <td>{item.TRINH_DO}</td>
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
            table = <p>Chưa có quản trị ngoại ngữ nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_nngu && this.props.qt_nngu.page ?
            this.props.qt_nngu.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị ngoại ngữ</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị ngoại ngữ</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_nngu'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_nnguInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_nnguModal ref={this.qt_nnguModal} createQt_nngu={this.props.createQt_nngu} updateQt_nngu={this.props.updateQt_nngu} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_nngu: state.qt_nngu, cbcnv: state.cbcnv, ngoaingu: state.ngoaingu});
const mapActionsToProps = { getQt_nnguInPage, createQt_nngu, updateQt_nngu, deleteQt_nngu, getAllQt_nngu, getAllCbcnv, getAllNgoaingu};
export default connect(mapStateToProps, mapActionsToProps)(Qt_nnguPage);
