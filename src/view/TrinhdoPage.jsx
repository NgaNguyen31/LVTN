import React from 'react';
import { connect } from 'react-redux';
import { getTrinhdoInPage, getTrinhdo, updateTrinhdo, deleteTrinhdo, createTrinhdo } from './redux/trinhdo.jsx'
import {getAllPhanloai} from './redux/phanloai.jsx';
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';
import TrinhdoModal from './TrinhdoModel.jsx';

class TrinhdoPage extends React.Component {
    constructor(props) {
        super(props);
        this.TrinhdoModal = React.createRef();
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(10, 6);
            this.props.getTrinhdoInPage();
        });
        this.props.getAllPhanloai();
    }

    edit(e, item) {                
        this.TrinhdoModal.current.show(item, this.props.phanloai.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteTrinhdo(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.trinhdo && this.props.trinhdo.page && this.props.trinhdo.page.list && this.props.trinhdo.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Trình độ</th>
                            <th style={{ width: '40%' }}>Tên đầy đủ</th>                            
                            <th style={{ width: '30%' }}>ORD</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.trinhdo.page.list.map((item, index) => (
                            <tr key={index}>         
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.trinh_do ? item.trinh_do + ' ' : '')}</a>
                                </td>     
                                <td>{item.Ten_day_du}</td>                
                                <td>{item.ord.reduce((pre, value) => pre + ' ' + value.LOAI, '')}</td>
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
            table = <p>Chưa có trình độ nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.trinhdo && this.props.trinhdo.page ?
            this.props.trinhdo.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin trình độ</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Trình độ</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminTrinhdo'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getTrinhdoInPage} />
                    
                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <TrinhdoModal ref={this.TrinhdoModal} createTrinhdo={this.props.createTrinhdo} updateTrinhdo={this.props.updateTrinhdo} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ trinhdo: state.trinhdo, phanloai: state.phanloai });
const mapActionsToProps = { getTrinhdoInPage, getTrinhdo, updateTrinhdo, deleteTrinhdo, createTrinhdo, getAllPhanloai };
export default connect(mapStateToProps, mapActionsToProps)(TrinhdoPage);
