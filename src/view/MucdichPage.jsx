import React from 'react';
import { connect } from 'react-redux';
import { getMucdichInPage, createMucdich, updateMucdich, deleteMucdich } from './redux/mucdich.jsx'
import { Link } from 'react-router-dom';
import MucdichModal from './MucdichModel.jsx';
import Pagination from './Pagination.jsx';

class MucdichPage extends React.Component {
    constructor(props) {
        super(props);
        this.mucdichModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(11, 10);
            this.props.getMucdichInPage();
        });
    }

    edit(e, item){
        this.mucdichModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteMucdich(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.mucdich && this.props.mucdich.page && this.props.mucdich.page.list && this.props.mucdich.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '100%', textAlign: 'center' }}>Mục đích</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.mucdich.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.MUC_DICH ? item.MUC_DICH + ' ' : '')}</a>
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
            table = <p>Chưa có mục đích nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.mucdich && this.props.mucdich.page ?
            this.props.mucdich.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Mục đích</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Mục đích</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminMucdich'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getMucdichInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <MucdichModal ref={this.mucdichModal} createMucdich={this.props.createMucdich} updateMucdich={this.props.updateMucdich} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ mucdich: state.mucdich });
const mapActionsToProps = { getMucdichInPage, createMucdich, updateMucdich, deleteMucdich  };
export default connect(mapStateToProps, mapActionsToProps)(MucdichPage);
