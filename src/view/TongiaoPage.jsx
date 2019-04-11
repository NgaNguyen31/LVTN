import React from 'react';
import { connect } from 'react-redux';
import { getTongiaoInPage, getTongiao, updateTongiao, deleteTongiao } from './redux/tongiao.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class TongiaoPage extends React.Component {
    constructor(props) {
        super(props);
        this.showTongiao = this.showTongiao.bind(this);
        this.deleteTongiao = this.deleteTongiao.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getTongiaoInPage();
        });
    }

    showTongiao(e, tongiaoId) {
        console.log(data);
        this.props.getTongiao(tongiaoId, tongiao => this.props.showTongiao(tongiao));
        e.preventDefault();
    }

    deleteTongiao(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteTongiao(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.tongiao && this.props.tongiao.page && this.props.tongiao.page.list && this.props.tongiao.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Tôn giáo</th>
                            <th style={{ width: '60%' }}>Diễn giải</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tongiao.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showTongiao(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteTongiao(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có tôn giáo nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.tongiao && this.props.tongiao.page ?
            this.props.tongiao.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Tôn giáo</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Tôn giáo</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminTongiao'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getTongiaoInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ tongiao: state.tongiao });
const mapActionsToProps = { getTongiaoInPage, getTongiao, updateTongiao, deleteTongiao };
export default connect(mapStateToProps, mapActionsToProps)(TongiaoPage);
