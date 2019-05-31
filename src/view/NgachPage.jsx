import React from 'react';
import { connect } from 'react-redux';
import { getNgachInPage, createNgach, updateNgach, deleteNgach } from './redux/ngach.jsx'
import { Link } from 'react-router-dom';
import NgachModal from './NgachModel.jsx';
import Pagination from './Pagination.jsx';

class NgachPage extends React.Component {
    constructor(props) {
        super(props);
        this.ngachModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(5, 8);
            this.props.getNgachInPage();
        });
    }

    edit(e, item){
        this.ngachModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteNgach(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.ngach && this.props.ngach.page && this.props.ngach.page.list && this.props.ngach.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '50%', textAlign: 'center' }}>Ngạch</th>
                            <th style={{ width: '50%', textAlign: 'center' }}>Tên ngạch</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.ngach.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.NGACH ? ('00000' + item.NGACH).slice(-5) + ' ' : '')}</a>
                                </td>        
                                <td>{item.TEN_NGACH}</td>                    
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

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.ngach && this.props.ngach.page ?
            this.props.ngach.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Ngạch</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Ngạch</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminNgach'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getNgachInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <NgachModal ref={this.ngachModal} createNgach={this.props.createNgach} updateNgach={this.props.updateNgach} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ ngach: state.ngach });
const mapActionsToProps = { getNgachInPage, createNgach, updateNgach, deleteNgach  };
export default connect(mapStateToProps, mapActionsToProps)(NgachPage);
