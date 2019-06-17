import React from 'react';
import { connect } from 'react-redux';
import { getQt_gtrinhInPage, createQt_gtrinh, updateQt_gtrinh, deleteQt_gtrinh, getAllQt_gtrinh } from './redux/qt_gtrinh.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import { Link } from 'react-router-dom';
import Qt_gtrinhModal from './Qt_gtrinhModel.jsx';
import Pagination from './Pagination.jsx';

class Qt_gtrinhPage extends React.Component {
    constructor(props) {
        super(props);
        this.qt_gtrinhModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(3, 7);
            this.props.getQt_gtrinhInPage();
        });
        this.props.getAllCbcnv();
    }

    edit(e, item){
        this.qt_gtrinhModal.current.show(item, this.props.cbcnv.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteQt_gtrinh(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.qt_gtrinh && this.props.qt_gtrinh.page && this.props.qt_gtrinh.page.list && this.props.qt_gtrinh.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>STT</th>
                            <th style={{ width: '50%', textAlign: 'center' }}>Giáo trình</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Năm XB</th>
                            <th style={{ width: '20%', textAlign: 'center' }}>Nhà XB</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.qt_gtrinh.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.STT}</td>
                                <td>{item.G_Trinh}</td>
                                <td>{T.dateToText(item.NamXB,'dd/mm/yyyy')}</td>
                                <td>{item.NhaXB}</td>
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
            table = <p>Chưa có quản trị giáo trình nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.qt_gtrinh && this.props.qt_gtrinh.page ?
            this.props.qt_gtrinh.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin quản trị giáo trình</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Quản trị giáo trình</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminQt_gtrinh'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getQt_gtrinhInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Qt_gtrinhModal ref={this.qt_gtrinhModal} createQt_gtrinh={this.props.createQt_gtrinh} updateQt_gtrinh={this.props.updateQt_gtrinh} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ qt_gtrinh: state.qt_gtrinh, cbcnv: state.cbcnv});
const mapActionsToProps = { getQt_gtrinhInPage, createQt_gtrinh, updateQt_gtrinh, deleteQt_gtrinh, getAllQt_gtrinh, getAllCbcnv};
export default connect(mapStateToProps, mapActionsToProps)(Qt_gtrinhPage);
