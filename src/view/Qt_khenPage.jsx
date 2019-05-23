import React from 'react';
import { connect } from 'react-redux';
import { getQt_khenInPage, createQt_khen, updateQt_khen, deleteQt_khen, getAllQt_khen } from './redux/qt_khen.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import { Link } from 'react-router-dom';
import Qt_khenModal from './Qt_khenModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_khenPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_khenModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(3, 8);
            this.props.getQt_khenInPage();
        });
        this.props.getAllCbcnv();
    }

    edit(e, item){
        this.qt_khenModal.current.show(item, this.props.cbcnv.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_khen(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_khen && this.props.qt_khen.page && this.props.qt_khen.page.list && this.props.qt_khen.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center' }}>MSNV</th>
                            {/* <th style={{ width: '20%', textAlign: 'center' }}>STT</th> */}
                            <th style={{ width: '20%', textAlign: 'center' }}>Năm</th>
                            <th style={{ width: '25%', textAlign: 'center' }}>Hình thức</th>
                            <th style={{ width: '25%', textAlign: 'center' }}>Cấp khen</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Lý do</th> */}
                            <th style={{ width: '20%', textAlign: 'center' }}>Danh hiệu</th>
                            {/* <th style={{ width: '20%', textAlign: 'center' }}>Ghi chú</th> */}
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_khen.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                {/* <td>{item.STT}</td> */}
                                <td>{T.dateToText(item.NAM,'dd/mm/yyyy')}</td>
                                <td>{item.HINH_THUC}</td>
                                <td>{item.CAP_KHEN}</td>
                                {/* <td>{item.LY_DO}</td> */}
                                <td>{item.DANH_HIEU}</td>
                                {/* <td>{item.GHI_CHU}</td> */}
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
            table = <p>Chưa có quản trị khen nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_khen && this.props.qt_khen.page ?
            this.props.qt_khen.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị khen</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị khen</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_khen'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_khenInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_khenModal ref={this.qt_khenModal} createQt_khen={this.props.createQt_khen} updateQt_khen={this.props.updateQt_khen} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_khen: state.qt_khen, cbcnv: state.cbcnv});
const mapActionsToProps = { getQt_khenInPage, createQt_khen, updateQt_khen, deleteQt_khen, getAllQt_khen, getAllCbcnv};
export default connect(mapStateToProps, mapActionsToProps)(Qt_khenPage);
