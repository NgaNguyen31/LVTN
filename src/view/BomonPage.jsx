import React from 'react';
import { connect } from 'react-redux';
import { getBomonInPage, createBomon, updateBomon, deleteBomon, getAllBomon } from './redux/bomon.jsx';
import {getAllKhoa} from './redux/khoa.jsx';
import { Link } from 'react-router-dom';
import BomonModal from './BomonModel.jsx';
import Pagination from './Pagination.jsx';

class BomonPage extends React.Component {
    constructor(props) {
        super(props);
        this.bomonModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(1, 4);
            this.props.getBomonInPage();
        });
        this.props.getAllKhoa();
    }

    edit(e, item){
        this.bomonModal.current.show(item, this.props.khoa.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteBomon(item._id);
        });
        e.preventDefault();
    }

    render() {           
        let table = null;              
        if (this.props.bomon && this.props.bomon.page && this.props.bomon.page.list && this.props.bomon.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '30%', textAlign: 'center' }}>Tên bộ môn</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Tên tiếng anh</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Mã số khoa</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Năm thành lập</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bomon.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.TEN_BM ? item.TEN_BM + ' ' : '')}</a>
                                </td> 
                                <td>{item.TEN_TIENG_ANH}</td>          
                                <td>{item.MS_KHOA}</td>
                                <td>{item.NAM_THANH_LAP}</td>
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
            table = <p>Chưa có bộ môn nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.bomon && this.props.bomon.page ?
            this.props.bomon.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Bộ môn</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Bộ môn</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminBomon'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getBomonInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <BomonModal ref={this.bomonModal} createBomon={this.props.createBomon} updateBomon={this.props.updateBomon} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ bomon: state.bomon, khoa: state.khoa});
const mapActionsToProps = { getBomonInPage, createBomon, updateBomon, deleteBomon, getAllBomon, getAllKhoa };
export default connect(mapStateToProps, mapActionsToProps)(BomonPage);
