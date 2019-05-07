import React from 'react';
import { connect } from 'react-redux';
import { getChucdanhInPage, createChucdanh, updateChucdanh, deleteChucdanh, getAllChucdanh } from './redux/chucdanh.jsx';
import {getAllPhanloai} from './redux/phanloai.jsx';
import { Link } from 'react-router-dom';
import ChucdanhModal from './ChucdanhModel.jsx';
import Pagination from './Pagination.jsx';

class ChucdanhPage extends React.Component {
    constructor(props) {
        super(props);
        this.chucdanhModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(10, 4);
            this.props.getChucdanhInPage();
        });
        this.props.getAllPhanloai();
    }

    edit(e, item){
        this.chucdanhModal.current.show(item, this.props.phanloai.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteChucdanh(item._id);
        });
        e.preventDefault();
    }

    render() {           
        let table = null;              
        if (this.props.chucdanh && this.props.chucdanh.page && this.props.chucdanh.page.list && this.props.chucdanh.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '30%', textAlign: 'center' }}>Chức danh</th>
                            <th style={{ width: '40%', textAlign: 'center' }}>Tên đầy đủ</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>ORD</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.chucdanh.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.chuc_danh ? item.chuc_danh + ' ' : '')}</a>
                                </td> 
                                <td>{item.ten_day_du}</td>          
                                <td>{item.ord.reduce((pre, value) => pre + ' ' + value.LOAI, ' ')}</td>
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
            table = <p>Chưa có chức danh nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.chucdanh && this.props.chucdanh.page ?
            this.props.chucdanh.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin chức danh</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Chức danh</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminChucdanh'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getChucdanhInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <ChucdanhModal ref={this.chucdanhModal} createChucdanh={this.props.createChucdanh} updateChucdanh={this.props.updateChucdanh} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ chucdanh: state.chucdanh, phanloai: state.phanloai});
const mapActionsToProps = { getChucdanhInPage, createChucdanh, updateChucdanh, deleteChucdanh, getAllChucdanh, getAllPhanloai };
export default connect(mapStateToProps, mapActionsToProps)(ChucdanhPage);
