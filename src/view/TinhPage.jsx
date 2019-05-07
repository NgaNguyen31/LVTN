import React from 'react';
import { connect } from 'react-redux';
import { getTinhInPage, createTinh, updateTinh, deleteTinh } from './redux/tinh.jsx'
import { Link } from 'react-router-dom';
import TinhModal from './TinhModel.jsx';
import Pagination from './Pagination.jsx';

class TinhPage extends React.Component {
    constructor(props) {
        super(props);
        this.tinhModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(11, 4);
            this.props.getTinhInPage();
        });
    }

    edit(e, item){
        this.tinhModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteTinh(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.tinh && this.props.tinh.page && this.props.tinh.page.list && this.props.tinh.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '50%', textAlign: 'center' }}>Tên tỉnh</th>
                            <th style={{ width: '50%', textAlign: 'center' }}>Mã số vùng</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tinh.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.TEN_TINH ? item.TEN_TINH + ' ' : '')}</a>
                                </td>        
                                <td>{item.MS_VUNG}</td>                    
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
            table = <p>Chưa có tỉnh nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.tinh && this.props.tinh.page ?
            this.props.tinh.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin tỉnh</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Tỉnh</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminTinh'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getTinhInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <TinhModal ref={this.tinhModal} createTinh={this.props.createTinh} updateTinh={this.props.updateTinh} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ tinh: state.tinh });
const mapActionsToProps = { getTinhInPage, createTinh, updateTinh, deleteTinh  };
export default connect(mapStateToProps, mapActionsToProps)(TinhPage);
