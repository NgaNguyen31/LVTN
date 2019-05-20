import React from 'react';
import { connect } from 'react-redux';
import { getQt_cac_conInPage, createQt_cac_con, updateQt_cac_con, deleteQt_cac_con, getAllQt_cac_con } from './redux/qt_cac_con.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import { Link } from 'react-router-dom';
import Qt_cac_conModal from './Qt_cac_conModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_cac_conPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_cac_conModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(3, 2);
            this.props.getQt_cac_conInPage();
        });
        this.props.getAllCbcnv();
    }

    edit(e, item){
        this.qt_cac_conModal.current.show(item, this.props.cbcnv.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_cac_con(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_cac_con && this.props.qt_cac_con.page && this.props.qt_cac_con.page.list && this.props.qt_cac_con.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center' }}>MSNV</th>
                            {/* <th style={{ width: '20%', textAlign: 'center' }}>STT</th> */}
                            <th style={{ width: '25%', textAlign: 'center' }}>Tên </th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Năm sinh</th>
                            <th style={{ width: '25%', textAlign: 'center' }}>Chức vụ</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Công tác</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_cac_con.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                {/* <td>{item.STT}</td> */}
                                <td>{item.TEN}</td>
                                <td>{item.NAM_SINH}</td>
                                <td>{item.CVU}</td>
                                <td>{item.CTAC}</td>
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
            table = <p>Chưa có quản trị các con nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_cac_con && this.props.qt_cac_con.page ?
            this.props.qt_cac_con.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị các con</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị các con</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_cac_con'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_cac_conInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_cac_conModal ref={this.qt_cac_conModal} createQt_cac_con={this.props.createQt_cac_con} updateQt_cac_con={this.props.updateQt_cac_con} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_cac_con: state.qt_cac_con, cbcnv: state.cbcnv});
const mapActionsToProps = { getQt_cac_conInPage, createQt_cac_con, updateQt_cac_con, deleteQt_cac_con, getAllQt_cac_con, getAllCbcnv};
export default connect(mapStateToProps, mapActionsToProps)(Qt_cac_conPage);
