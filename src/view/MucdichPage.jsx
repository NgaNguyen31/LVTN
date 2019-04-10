import React from 'react';
import { connect } from 'react-redux';
import { getMucdichInPage, getMucdich, updateMucdich, deleteMucdich } from './redux/mucdich.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class MucdichPage extends React.Component {
    constructor(props) {
        super(props);
        this.showMucdich = this.showMucdich.bind(this);
        this.deleteMucdich = this.deleteMucdich.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getMucdichInPage();
        });
    }

    showMucdich(e, mucdichId) {
        console.log(data);
        this.props.getMucdich(mucdichId, mucdich => this.props.showMucdich(mucdich));
        e.preventDefault();
    }

    deleteMucdich(e, item) {
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
                            <th style={{ width: '40%' }}>Mã số mục đích</th>
                            <th style={{ width: '60%' }}>Tên mục đích</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.mucdich.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showMucdich(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteMucdich(e, item)}>
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
            </main>
        );
    }
}

const mapStateToProps = state => ({ mucdich: state.mucdich });
const mapActionsToProps = { getMucdichInPage, getMucdich, updateMucdich, deleteMucdich };
export default connect(mapStateToProps, mapActionsToProps)(MucdichPage);
