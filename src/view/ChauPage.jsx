import React from 'react';
import { connect } from 'react-redux';
import { getChauInPage, createChau, updateChau, deleteChau } from './redux/chau.jsx'
import { Link } from 'react-router-dom';
import ChauModal from './ChauModel.jsx';
import Pagination from './Pagination.jsx';

class ChauPage extends React.Component {
    constructor(props) {
        super(props);
        this.chauModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(1, 4);
            this.props.getChauInPage();
        });
    }

    edit(e, item){
        this.chauModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteChau(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.chau && this.props.chau.page && this.props.chau.page.list && this.props.chau.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '100%', textAlign: 'center' }}>Tên châu</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.chau.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.tenchau ? item.tenchau + ' ' : '')}</a>
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
            table = <p>Chưa có châu nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.chau && this.props.chau.page ?
            this.props.chau.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Châu</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Châu</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminChau'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getChauInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <ChauModal ref={this.chauModal} createChau={this.props.createChau} updateChau={this.props.updateChau} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ chau: state.chau });
const mapActionsToProps = { getChauInPage, createChau, updateChau, deleteChau  };
export default connect(mapStateToProps, mapActionsToProps)(ChauPage);
