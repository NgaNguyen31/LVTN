import React from 'react';
import { connect } from 'react-redux';
import { getChinhsachInPage, createChinhsach, updateChinhsach, deleteChinhsach } from './redux/chinhsach.jsx'
import { Link } from 'react-router-dom';
import ChinhsachModal from './ChinhsachModel.jsx';
import Pagination from './Pagination.jsx';

class ChinhsachPage extends React.Component {
    constructor(props) {
        super(props);
        this.chinhsachModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(10, 1);
            this.props.getChinhsachInPage();
        });
    }

    edit(e, item){
        this.chinhsachModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteChinhsach(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.chinhsach && this.props.chinhsach.page && this.props.chinhsach.page.list && this.props.chinhsach.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '100%', textAlign: 'center' }}>Tên chính sách</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.chinhsach.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.TEN_CS ? item.TEN_CS + ' ' : '')}</a>
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
            table = <p>Chưa có chính sách nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.chinhsach && this.props.chinhsach.page ?
            this.props.chinhsach.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Chính sách</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Chính sách</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminChinhsach'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getChinhsachInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <ChinhsachModal ref={this.chinhsachModal} createChinhsach={this.props.createChinhsach} updateChinhsach={this.props.updateChinhsach} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ chinhsach: state.chinhsach });
const mapActionsToProps = { getChinhsachInPage, createChinhsach, updateChinhsach, deleteChinhsach  };
export default connect(mapStateToProps, mapActionsToProps)(ChinhsachPage);
