import React from 'react';
import { connect } from 'react-redux';
import { getHesoInPage, createHeso, updateHeso, deleteHeso } from './redux/heso.jsx'
import { Link } from 'react-router-dom';
import HesoModal from './HesoModel.jsx';
import Pagination from './Pagination.jsx';

class HesoPage extends React.Component {
    constructor(props) {
        super(props);
        this.hesoModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(1, 4);
            this.props.getHesoInPage();
        });
    }

    edit(e, item){
        this.hesoModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteHeso(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.heso && this.props.heso.page && this.props.heso.page.list && this.props.heso.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '50%', textAlign: 'center' }}>MLTT</th>
                            <th style={{ width: '50%', textAlign: 'center' }}>Tiền lương</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.heso.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MLTT ? item.MLTT + ' ' : '')}</a>
                                </td>        
                                <td>{item.TL}</td>                    
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
            table = <p>Chưa có hệ số nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.heso && this.props.heso.page ?
            this.props.heso.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Hệ số</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Hệ số</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminHeso'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getHesoInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <HesoModal ref={this.hesoModal} createHeso={this.props.createHeso} updateHeso={this.props.updateHeso} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ heso: state.heso });
const mapActionsToProps = { getHesoInPage, createHeso, updateHeso, deleteHeso  };
export default connect(mapStateToProps, mapActionsToProps)(HesoPage);
