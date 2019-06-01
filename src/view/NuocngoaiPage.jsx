import React from 'react';
import { connect } from 'react-redux';
import { getNuocngoaiInPage, createNuocngoai, updateNuocngoai, deleteNuocngoai, getAllNuocngoai } from './redux/nuocngoai.jsx';
import {getAllKhuvuc} from './redux/khuvuc.jsx';
import { Link } from 'react-router-dom';
import NuocngoaiModal from './NuocngoaiModel.jsx';
import Pagination from './Pagination.jsx';

class NuocngoaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.nuocngoaiModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4, 13);
            this.props.getNuocngoaiInPage();
        });
        this.props.getAllKhuvuc();
    }

    edit(e, item){
        this.nuocngoaiModal.current.show(item, this.props.khuvuc.data.items);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteNuocngoai(item._id);
        });
        e.preventDefault();
    }
    

    render() {                   
        let table = null;              
        if (this.props.nuocngoai && this.props.nuocngoai.page && this.props.nuocngoai.page.list && this.props.nuocngoai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '50%', textAlign: 'center' }}>Tên nước</th>
                            <th style={{ width: '50%', textAlign: 'center' }}>Tên KV</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.nuocngoai.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.TEN_NUOC ? item.TEN_NUOC + ' ' : '')}</a>
                                </td>       
                                <td>{item.MS_KVUC.TEN_KVUC}</td>
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
            table = <p>Chưa có nước ngoài nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.nuocngoai && this.props.nuocngoai.page ?
            this.props.nuocngoai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin nước ngoài</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Nước ngoài</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminNuocngoai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getNuocngoaiInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <NuocngoaiModal ref={this.nuocngoaiModal} createNuocngoai={this.props.createNuocngoai} updateNuocngoai={this.props.updateNuocngoai} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ nuocngoai: state.nuocngoai, khuvuc: state.khuvuc});
const mapActionsToProps = { getNuocngoaiInPage, createNuocngoai, updateNuocngoai, deleteNuocngoai, getAllNuocngoai, getAllKhuvuc};
export default connect(mapStateToProps, mapActionsToProps)(NuocngoaiPage);
