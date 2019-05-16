import React from 'react';
import { connect } from 'react-redux';
import { getKihieu_tang_giam_bhxhInPage, createKihieu_tang_giam_bhxh, updateKihieu_tang_giam_bhxh, deleteKihieu_tang_giam_bhxh } from './redux/kihieu_tang_giam_bhxh.jsx'
import { Link } from 'react-router-dom';
import Kihieu_tang_giam_bhxhModal from './Kihieu_tang_giam_bhxhModel.jsx';
import Pagination from './Pagination.jsx';

class Kihieu_tang_giam_bhxhPage extends React.Component {
    constructor(props) {
        super(props);
        this.kihieu_tang_giam_bhxhModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(11, 8);
            this.props.getKihieu_tang_giam_bhxhInPage();
        });
    }

    edit(e, item){
        this.kihieu_tang_giam_bhxhModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteKihieu_tang_giam_bhxh(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.kihieu_tang_giam_bhxh && this.props.kihieu_tang_giam_bhxh.page && this.props.kihieu_tang_giam_bhxh.page.list && this.props.kihieu_tang_giam_bhxh.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '50%', textAlign: 'center' }}>Kí hiệu</th>
                            <th style={{ width: '50%', textAlign: 'center' }}>Diễn giải</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.kihieu_tang_giam_bhxh.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.Ky_hieu ? item.Ky_hieu + ' ' : '')}</a>
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
            table = <p>Chưa có kí hiệu tăng giảm BHXH nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.kihieu_tang_giam_bhxh && this.props.kihieu_tang_giam_bhxh.page ?
            this.props.kihieu_tang_giam_bhxh.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Kí hiệu tăng giảm BHXH</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Kí hiệu tăng giảm BHXH</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminKihieu_tang_giam_bhxh'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getKihieu_tang_giam_bhxhInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Kihieu_tang_giam_bhxhModal ref={this.kihieu_tang_giam_bhxhModal} createKihieu_tang_giam_bhxh={this.props.createKihieu_tang_giam_bhxh} updateKihieu_tang_giam_bhxh={this.props.updateKihieu_tang_giam_bhxh} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ kihieu_tang_giam_bhxh: state.kihieu_tang_giam_bhxh });
const mapActionsToProps = { getKihieu_tang_giam_bhxhInPage, createKihieu_tang_giam_bhxh, updateKihieu_tang_giam_bhxh, deleteKihieu_tang_giam_bhxh  };
export default connect(mapStateToProps, mapActionsToProps)(Kihieu_tang_giam_bhxhPage);
