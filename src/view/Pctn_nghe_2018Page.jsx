import React from 'react';
import { connect } from 'react-redux';
import { getPctn_nghe_2018InPage, createPctn_nghe_2018, updatePctn_nghe_2018, deletePctn_nghe_2018 } from './redux/pctn_nghe_2018.jsx'
import { Link } from 'react-router-dom';
import Pctn_nghe_2018Modal from './Pctn_nghe_2018Model.jsx';
import Pagination from './Pagination.jsx';

class Pctn_nghe_2018Page extends React.Component {
    constructor(props) {
        super(props);
        this.pctn_nghe_2018Modal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        Date.prototype.getDateText = function () {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return months[this.getMonth()] + ' ' + T.get2(this.getDate()) + ', ' + this.getFullYear();
        };
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(2, 7);
            this.props.getPctn_nghe_2018InPage();
        });
    }

    edit(e, item){
        this.pctn_nghe_2018Modal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deletePctn_nghe_2018(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.pctn_nghe_2018 && this.props.pctn_nghe_2018.page && this.props.pctn_nghe_2018.page.list && this.props.pctn_nghe_2018.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: 'center' }}>SHCC</th>
                            <th style={{ width: '20%', textAlign: 'center' }}>Họ</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Tên</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Ngày sinh</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>MS CDNN</th>
                            {/* <th style={{ width: 'auto', textAlign: 'center' }}>Ngày PCTN cũ</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>PT PCTN cũ</th> */}
                            <th style={{ width: '10%', textAlign: 'center' }}>Ngày PCTN mới</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>PT PCTN mới</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Đơn vị</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.pctn_nghe_2018.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.SHCC ? ('000000' + item.SHCC).slice(-6) + ' ' : '')}</a>
                                </td>   
                                {console.log(typeof item.NGAY_SINH)
                                }     
                                <td>{item.HO}</td>                    
                                <td>{item.TEN}</td>                    
                                <td>{T.dateToText(item.NGAY_SINH,'dd/mm/yyyy')}</td>                 
                                <td>{item.MS_CDNN}</td>                    
                                {/* <td>{item.NGAY_PCTN_OLD}</td>                    
                                <td>{item.PT_PCTN_OLD}</td>                     */}
                                <td>{T.dateToText(item.NGAY_PCTN_NEW,'dd/mm/yyyy')}</td>                    
                                <td>{item.PT_PCTN_NEW}</td>                    
                                <td>{item.DON_VI}</td>                    
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
            table = <p>Chưa có pctn nghe 2018 nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.pctn_nghe_2018 && this.props.pctn_nghe_2018.page ?
            this.props.pctn_nghe_2018.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin PCTN Nghe 2018</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>PCTN Nghe 2018</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminPctn_nghe_2018'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getPctn_nghe_2018InPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Pctn_nghe_2018Modal ref={this.pctn_nghe_2018Modal} createPctn_nghe_2018={this.props.createPctn_nghe_2018} updatePctn_nghe_2018={this.props.updatePctn_nghe_2018} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ pctn_nghe_2018: state.pctn_nghe_2018 });
const mapActionsToProps = { getPctn_nghe_2018InPage, createPctn_nghe_2018, updatePctn_nghe_2018, deletePctn_nghe_2018  };
export default connect(mapStateToProps, mapActionsToProps)(Pctn_nghe_2018Page);
