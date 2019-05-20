import React from 'react';
import { connect } from 'react-redux';
import { getCbcnv_hd_dv_tu_traInPage, createCbcnv_hd_dv_tu_tra, getCbcnv_hd_dv_tu_tra, updateCbcnv_hd_dv_tu_tra, deleteCbcnv_hd_dv_tu_tra } from './redux/cbcnv_hd_dv_tu_tra.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllTrinhdo} from './redux/trinhdo.jsx';
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';
import Cbcnv_hd_dv_tu_traModal from './Cbcnv_hd_dv_tu_traModel.jsx';

class Cbcnv_hd_dv_tu_traPage extends React.Component {
    constructor(props) {
        super(props);
        this.Cbcnv_hd_dv_tu_traModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(2, 1);
            this.props.getCbcnv_hd_dv_tu_traInPage();
        });
        this.props.getAllTrinhdo();
        this.props.getAllCbcnv();
    }

    edit(e,item){        
        this.Cbcnv_hd_dv_tu_traModal.current.show(item, this.props.cbcnv.data.items, this.props.trinhdo.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteCbcnv_hd_dv_tu_tra(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.cbcnv_hd_dv_tu_tra && this.props.cbcnv_hd_dv_tu_tra.page && this.props.cbcnv_hd_dv_tu_tra.page.list && this.props.cbcnv_hd_dv_tu_tra.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center'  }}>MSNV</th>
                            {/* <th style={{ width: 'auto' }}>Họ</th>
                            <th style={{ width: 'auto' }}>Tên</th>
                            <th style={{ width: 'auto' }}>Ngày sinh</th>
                            <th style={{ width: 'auto' }}>Nơi sinh</th> */}
                            <th style={{ width: '20%', textAlign: 'center'  }}>Ngày vào</th>
                            {/* <th style={{ width: 'auto' }}>Ngày nghỉ</th> */}
                            <th style={{ width: '10%', textAlign: 'center'  }}>Trình độ</th>
                            <th style={{ width: '20%', textAlign: 'center'  }}>Đơn vị</th>
                            <th style={{ width: '40%', textAlign: 'center'  }}>Địa chỉ</th>
                            {/* <th style={{ width: 'auto' }}>Ghi chú</th> */}
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cbcnv_hd_dv_tu_tra.page.list.map((item, index) => (
                            <tr key={index}>         
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MSNV ? item.MSNV.MS_NV + ' ' : '')}</a>
                                </td> 
                                {/* <td>{item.HO}</td>      
                                <td>{item.TEN}</td>
                                <td>{item.NGAY_SINH}</td>                            
                                <td>{item.NOI_SINH}</td> */}
                                <td>{item.NGAY_VAO}</td>
                                {/* <td>{item.NGAY_NGHI}</td>     */}
                                <td>{item.TRINH_DO.Ten_day_du}</td>
                                <td>{item.DON_VI}</td>                     
                                <td>{item.DIA_CHI}</td>                     
                                {/* <td>{item.GHI_CHU}</td>                      */}
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
            table = <p>Chưa có cán bộ nước ngoài nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.cbcnv_hd_dv_tu_tra && this.props.cbcnv_hd_dv_tu_tra.page ?
            this.props.cbcnv_hd_dv_tu_tra.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin CBCNV hoạt động dịch vụ tự trả</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>CBCNV hoạt động dịch vụ tự trả</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminCbcnv_hd_dv_tu_tra'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getCbcnv_hd_dv_tu_traInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Cbcnv_hd_dv_tu_traModal ref={this.Cbcnv_hd_dv_tu_traModal} createCbcnv_hd_dv_tu_tra={this.props.createCbcnv_hd_dv_tu_tra} updateCbcnv_hd_dv_tu_tra={this.props.updateCbcnv_hd_dv_tu_tra} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ cbcnv_hd_dv_tu_tra: state.cbcnv_hd_dv_tu_tra, cbcnv: state.cbcnv, trinhdo: state.trinhdo });
const mapActionsToProps = { getCbcnv_hd_dv_tu_traInPage,createCbcnv_hd_dv_tu_tra ,getCbcnv_hd_dv_tu_tra, updateCbcnv_hd_dv_tu_tra, deleteCbcnv_hd_dv_tu_tra, getAllCbcnv, getAllTrinhdo };
export default connect(mapStateToProps, mapActionsToProps)(Cbcnv_hd_dv_tu_traPage);

