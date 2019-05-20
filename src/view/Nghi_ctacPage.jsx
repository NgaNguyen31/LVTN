import React from 'react';
import { connect } from 'react-redux';
import { getNghi_ctacInPage, createNghi_ctac, updateNghi_ctac, deleteNghi_ctac } from './redux/nghi_ctac.jsx'
import { Link } from 'react-router-dom';
import Nghi_ctacModal from './Nghi_ctacModel.jsx';
import Pagination from './Pagination.jsx';

class Nghi_ctacPage extends React.Component {
    constructor(props) {
        super(props);
        this.nghi_ctacModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(5, 12);
            this.props.getNghi_ctacInPage();
        });
    }

    edit(e, item){
        this.nghi_ctacModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteNghi_ctac(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.nghi_ctac && this.props.nghi_ctac.page && this.props.nghi_ctac.page.list && this.props.nghi_ctac.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '50%', textAlign: 'center' }}>Nghỉ</th>
                            <th style={{ width: '50%', textAlign: 'center' }}>Diễn giải</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.nghi_ctac.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.NGHI ? item.NGHI + ' ' : '')}</a>
                                </td>        
                                <td>{item.Dien_giai}</td>                    
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
            table = <p>Chưa có loại nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.nghi_ctac && this.props.nghi_ctac.page ?
            this.props.nghi_ctac.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Nghỉ công tác</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Nghỉ công tác</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminNghi_ctac'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getNghi_ctacInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Nghi_ctacModal ref={this.nghi_ctacModal} createNghi_ctac={this.props.createNghi_ctac} updateNghi_ctac={this.props.updateNghi_ctac} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ nghi_ctac: state.nghi_ctac });
const mapActionsToProps = { getNghi_ctacInPage, createNghi_ctac, updateNghi_ctac, deleteNghi_ctac  };
export default connect(mapStateToProps, mapActionsToProps)(Nghi_ctacPage);
