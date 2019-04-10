import React from 'react';
import { connect } from 'react-redux';
import { getMucdich1InPage, getMucdich1, updateMucdich1, deleteMucdich1 } from './redux/mucdich1.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Mucdich1Page extends React.Component {
    constructor(props) {
        super(props);
        this.showMucdich1 = this.showMucdich1.bind(this);
        this.deleteMucdich1 = this.deleteMucdich1.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getMucdich1InPage();
        });
    }

    showMucdich1(e, mucdich1Id) {
        console.log(data);
        this.props.getMucdich1(mucdich1Id, mucdich1 => this.props.showMucdich1(mucdich1));
        e.preventDefault();
    }

    deleteMucdich1(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteMucdich1(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.mucdich1 && this.props.mucdich1.page && this.props.mucdich1.page.list && this.props.mucdich1.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số mục đích 1</th>
                            <th style={{ width: '60%' }}>Tên mục đích 1</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.mucdich1.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showMucdich1(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteMucdich1(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có mục đích 1 nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.mucdich1 && this.props.mucdich1.page ?
            this.props.mucdich1.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Mục đích 1</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Mục đích 1</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminMucdich1'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getMucdich1InPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ mucdich1: state.mucdich1 });
const mapActionsToProps = { getMucdich1InPage, getMucdich1, updateMucdich1, deleteMucdich1 };
export default connect(mapStateToProps, mapActionsToProps)(Mucdich1Page);
