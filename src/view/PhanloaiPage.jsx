import React from 'react';
import { connect } from 'react-redux';
import { getPhanloaiInPage, createPhanloai, updatePhanloai, deletePhanloai } from './redux/phanloai.jsx'
import { Link } from 'react-router-dom';
import PhanloaiModal from './PhanloaiModel.jsx';
import Pagination from './Pagination.jsx';

class PhanloaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.phanloaiModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(5, 15);
            this.props.getPhanloaiInPage();
        });
    }

    edit(e, item){
        this.phanloaiModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deletePhanloai(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.phanloai && this.props.phanloai.page && this.props.phanloai.page.list && this.props.phanloai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '50%', textAlign: 'center' }}>ORD</th>
                            <th style={{ width: '50%', textAlign: 'center' }}>Loại</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.phanloai.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.ORD ? item.ORD + ' ' : '')}</a>
                                </td>        
                                <td>{item.LOAI}</td>                    
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
            table = <p>Chưa có phân loại nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.phanloai && this.props.phanloai.page ?
            this.props.phanloai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin phân loại</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Phân loại</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminPhanloai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getPhanloaiInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <PhanloaiModal ref={this.phanloaiModal} createPhanloai={this.props.createPhanloai} updatePhanloai={this.props.updatePhanloai} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ phanloai: state.phanloai });
const mapActionsToProps = { getPhanloaiInPage, createPhanloai, updatePhanloai, deletePhanloai  };
export default connect(mapStateToProps, mapActionsToProps)(PhanloaiPage);
