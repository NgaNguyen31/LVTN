import React from 'react';
import { connect } from 'react-redux';
import { getKiemnhiemInPage, createKiemnhiem, updateKiemnhiem, deleteKiemnhiem, getAllKiemnhiem } from './redux/kiemnhiem.jsx';
import {getAllCbcnv} from './redux/cbcnv.jsx';
import {getAllBomon} from './redux/bomon.jsx';
import {getAllChucvu} from './redux/chucvu.jsx';
import { Link } from 'react-router-dom';
import KiemnhiemModal from './KiemnhiemModel.jsx';
import Pagination from './Pagination.jsx';

class KiemnhiemPage extends React.Component {
    constructor(props) {
        super(props);
        this.kiemnhiemModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.changeActive = this.changeActive.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4, 4);
            this.props.getKiemnhiemInPage();
        });
        this.props.getAllCbcnv();
        this.props.getAllBomon();
        this.props.getAllChucvu();
    }

    edit(e, item){
        this.kiemnhiemModal.current.show(item, this.props.cbcnv.data.items, this.props.bomon.data.items, this.props.chucvu.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteKiemnhiem(item._id);
        });
        e.preventDefault();
    }
    
    changeActive(item, index) {
        this.props.updateKiemnhiem(item._id, { active: !item.Xoa });
    }

    render() {                   
        let table = null;              
        if (this.props.kiemnhiem && this.props.kiemnhiem.page && this.props.kiemnhiem.page.list && this.props.kiemnhiem.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center' }}>MSNV</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Tên BM</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Tên CVụ</th>
                            <th style={{ width: '20%', textAlign: 'center' }}>Ngày chức vụ</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Ghi chú</th> */}
                            <th style={{ width: '10%', textAlign: 'center' }}>Xóa</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.kiemnhiem.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MS_NV ? item.MS_NV.MS_NV + ' ' : '')}</a>
                                </td>       
                                <td>{item.MS_BM.TEN_BM}</td>
                                <td>{item.MS_CVU.CHUC_VU}</td>
                                <td>{item.NGAY_CVU}</td>
                                {/* <td>{item.GHICHU}</td> */}
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
            table = <p>Chưa có kiêm nhiệm nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.kiemnhiem && this.props.kiemnhiem.page ?
            this.props.kiemnhiem.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin kiêm nhiệm</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Kiêm nhiệm</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKiemnhiem'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKiemnhiemInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <KiemnhiemModal ref={this.kiemnhiemModal} createKiemnhiem={this.props.createKiemnhiem} updateKiemnhiem={this.props.updateKiemnhiem} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ kiemnhiem: state.kiemnhiem, cbcnv: state.cbcnv, bomon: state.bomon, chucvu: state.chucvu});
const mapActionsToProps = { getKiemnhiemInPage, createKiemnhiem, updateKiemnhiem, deleteKiemnhiem, getAllKiemnhiem, getAllCbcnv, getAllBomon, getAllChucvu };
export default connect(mapStateToProps, mapActionsToProps)(KiemnhiemPage);
