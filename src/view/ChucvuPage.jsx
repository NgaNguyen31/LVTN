import React from 'react';
import { connect } from 'react-redux';
import { getChucvuInPage, createChucvu, updateChucvu, deleteChucvu } from './redux/chucvu.jsx'
import { Link } from 'react-router-dom';
import ChucvuModal from './ChucvuModel.jsx';
import Pagination from './Pagination.jsx';

class ChucvuPage extends React.Component {
    constructor(props) {
        super(props);
        this.chucvuModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(10, 5);
            this.props.getChucvuInPage();
        });
    }

    edit(e, item){
        this.chucvuModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteChucvu(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.chucvu && this.props.chucvu.page && this.props.chucvu.page.list && this.props.chucvu.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '30%', textAlign: 'center' }}>Chức vụ</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Phân cấp chức vụ</th>
                            <th style={{ width: '40%', textAlign: 'center' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.chucvu.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.CHUC_VU ? item.CHUC_VU + ' ' : '')}</a>
                                </td>             
                                <td>{item.PC_CVU}</td>               
                                <td>{item.Ghi_chu}</td>               
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
            table = <p>Chưa có chức vụ nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.chucvu && this.props.chucvu.page ?
            this.props.chucvu.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin chức vụ</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>chức vụ</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminChucvu'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getChucvuInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <ChucvuModal ref={this.chucvuModal} createChucvu={this.props.createChucvu} updateChucvu={this.props.updateChucvu} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ chucvu: state.chucvu });
const mapActionsToProps = { getChucvuInPage, createChucvu, updateChucvu, deleteChucvu  };
export default connect(mapStateToProps, mapActionsToProps)(ChucvuPage);
