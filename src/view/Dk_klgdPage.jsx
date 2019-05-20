import React from 'react';
import { connect } from 'react-redux';
import { getDk_klgdInPage, createDk_klgd, updateDk_klgd, deleteDk_klgd } from './redux/dk_klgd.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllBomon} from './redux/bomon.jsx';
import {getAllCv_klgd} from './redux/cv_klgd.jsx';
import { Link } from 'react-router-dom';
import Dk_klgdModal from './Dk_klgdModel.jsx';
import Pagination from './Pagination.jsx';

class Dk_klgdPage extends React.Component {
    constructor(props) {
        super(props);
        this.dk_klgdModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4, 2);
            this.props.getDk_klgdInPage();
        });
        this.props.getAllBomon();
        this.props.getAllCbcnv();
        this.props.getAllCv_klgd();
    }

    edit(e, item){
        this.dk_klgdModal.current.show(item, this.props.cbcnv.data.items, this.props.bomon.data.items, this.props.cv_klgd.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteDk_klgd(item._id);
        });
        e.preventDefault();
    }

    render() {        
        let table = null;
        if (this.props.dk_klgd && this.props.dk_klgd.page && this.props.dk_klgd.page.list && this.props.dk_klgd.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center' }}>MSNV</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>STT</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Họ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Tên</th> */}
                            <th style={{ width: '30%', textAlign: 'center' }}>Tên bộ môn</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Tên công việc</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Tự đăng kí</th> */}
                            <th style={{ width: '10%', textAlign: 'center' }}>Nhóm lớp</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Số sinh viên</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Số tiết thực</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Số tiết quy đổi</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Từ ngày</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Đến ngày</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú</th> */}
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dk_klgd.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>   
                                {/* <td>{item.STT}</td>  
                                <td>{item.HO}</td>                         
                                <td>{item.TEN}</td>   */}
                                <td>{item.MS_BM.TEN_BM}</td>  
                                <td>{item.MS_CV.TEN_CV}</td>  
                                {/* <td>{item.TU_DK}</td>   */}
                                <td>{item.NHOMLOP}</td>  
                                <td>{item.SO_SV}</td>  
                                <td>{item.SO_TIET_THUC}</td>  
                                {/* <td>{item.SO_TIET_QUY_DOI}</td>  
                                <td>{item.TU_NGAY}</td>  
                                <td>{item.DEN_NGAY}</td> 
                                <td>{item.GHI_CHU}</td>   */}
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
            table = <p>Chưa có đăng kí khối lượng giảng dạy nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.dk_klgd && this.props.dk_klgd.page ?
            this.props.dk_klgd.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin đăng kí khối lượng giảng dạy</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Đăng kí khối lượng giảng dạy</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminDk_klgd'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getDk_klgdInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Dk_klgdModal ref={this.dk_klgdModal} createDk_klgd={this.props.createDk_klgd} updateDk_klgd={this.props.updateDk_klgd} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ dk_klgd: state.dk_klgd, cbcnv: state.cbcnv, bomon: state.bomon, cv_klgd: state.cv_klgd });
const mapActionsToProps = { getDk_klgdInPage, createDk_klgd, updateDk_klgd, deleteDk_klgd, getAllBomon, getAllCbcnv, getAllCv_klgd  };
export default connect(mapStateToProps, mapActionsToProps)(Dk_klgdPage);
