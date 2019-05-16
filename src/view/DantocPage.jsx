import React from 'react';
import { connect } from 'react-redux';
import { getDantocInPage, createDantoc, updateDantoc, deleteDantoc } from './redux/dantoc.jsx'
import { Link } from 'react-router-dom';
import DantocModal from './DantocModel.jsx';
import Pagination from './Pagination.jsx';

class DantocPage extends React.Component {
    constructor(props) {
        super(props);
        this.dantocModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(11, 4);
            this.props.getDantocInPage();
        });
    }

    edit(e, item){
        this.dantocModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteDantoc(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.dantoc && this.props.dantoc.page && this.props.dantoc.page.list && this.props.dantoc.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '100%', textAlign: 'center' }}>Tên dân tộc</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dantoc.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.Dan_toc ? item.Dan_toc + ' ' : '')}</a>
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
            table = <p>Chưa có dân tộc nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.dantoc && this.props.dantoc.page ?
            this.props.dantoc.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Dân tộc</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Dân tộc</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminDantoc'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getDantocInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <DantocModal ref={this.dantocModal} createDantoc={this.props.createDantoc} updateDantoc={this.props.updateDantoc} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ dantoc: state.dantoc });
const mapActionsToProps = { getDantocInPage, createDantoc, updateDantoc, deleteDantoc  };
export default connect(mapStateToProps, mapActionsToProps)(DantocPage);
