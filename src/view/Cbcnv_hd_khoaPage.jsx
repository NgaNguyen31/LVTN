import React from 'react';
import { connect } from 'react-redux';
import { getCbcnv_hd_khoaInPage, createCbcnv_hd_khoa, getCbcnv_hd_khoa, updateCbcnv_hd_khoa, deleteCbcnv_hd_khoa } from './redux/cbcnv_hd_khoa.jsx'
import {getAllBomon} from './redux/bomon.jsx';
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';
import Cbcnv_hd_khoaModal from './Cbcnv_hd_khoaModel.jsx';

class Cbcnv_hd_khoaPage extends React.Component {
    constructor(props) {
        super(props);
        this.Cbcnv_hd_khoaModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.changeActive = this.changeActive.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(2, 2);
            this.props.getCbcnv_hd_khoaInPage();
        });
        this.props.getAllBomon();
    }

    edit(e,item){        
        this.Cbcnv_hd_khoaModal.current.show(item, this.props.bomon.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteCbcnv_hd_khoa(item._id);
        });
        e.preventDefault();
    }

    changeActive(item, index) {
        this.props.updateCbcnv_hd_khoa(item._id, { active: !item.Xoa });
    }

    render() {
        let table = null;
        if (this.props.cbcnv_hd_khoa && this.props.cbcnv_hd_khoa.page && this.props.cbcnv_hd_khoa.page.list && this.props.cbcnv_hd_khoa.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center'  }}>MSBM</th>
                            <th style={{ width: '25%', textAlign: 'center'  }}>Họ</th>
                            <th style={{ width: '15%', textAlign: 'center'  }}>Tên</th>
                            <th style={{ width: '15%', textAlign: 'center'  }}>Giới tính</th>
                            <th style={{ width: '20%', textAlign: 'center'  }}>Năm sinh</th>
                            {/* <th style={{ width: 'auto' }}>Thẻ BHYT</th>
                            <th style={{ width: 'auto' }}>Nơi khám</th>
                            <th style={{ width: 'auto' }}>LCB</th>
                            <th style={{ width: 'auto' }}>PC</th> */}
                            <th style={{ width: '15%', textAlign: 'center'  }}>Xóa</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cbcnv_hd_khoa.page.list.map((item, index) => (
                            <tr key={index}>         
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MSBM ? item.MSBM.TEN_BM + ' ' : '')}</a>
                                </td> 
                                <td>{item.HO}</td>      
                                <td>{item.TEN}</td>
                                <td>{item.PHAI}</td>                            
                                <td>{T.dateToText(item.NAM_SINH,'dd/mm/yyyy')}</td>
                                {/* <td>{item.The_BHYT}</td>
                                <td>{item.Noi_kham}</td>    
                                <td>{item.LCB}</td>
                                <td>{item.PC}</td>                      */}
                                <td className='toggle' style={{ textAlign: 'center' }} >
                                    <label>
                                        <input type='checkbox' checked={item.Xoa} onChange={() => this.changeActive(item, index)} /><span className='button-indecator' />
                                    </label>
                                </td>              
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
            table = <p>Chưa có cbcnv hoạt động khoa nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.cbcnv_hd_khoa && this.props.cbcnv_hd_khoa.page ?
            this.props.cbcnv_hd_khoa.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Cbcnv hoạt động khoa</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Cbcnv hoạt động khoa</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminCbcnv_hd_khoa'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getCbcnv_hd_khoaInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Cbcnv_hd_khoaModal ref={this.Cbcnv_hd_khoaModal} createCbcnv_hd_khoa={this.props.createCbcnv_hd_khoa} updateCbcnv_hd_khoa={this.props.updateCbcnv_hd_khoa} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ cbcnv_hd_khoa: state.cbcnv_hd_khoa, bomon: state.bomon});
const mapActionsToProps = { getCbcnv_hd_khoaInPage,createCbcnv_hd_khoa ,getCbcnv_hd_khoa, updateCbcnv_hd_khoa, deleteCbcnv_hd_khoa, getAllBomon };
export default connect(mapStateToProps, mapActionsToProps)(Cbcnv_hd_khoaPage);
