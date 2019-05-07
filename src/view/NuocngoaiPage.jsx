import React from 'react';
import { connect } from 'react-redux';
import { getNuocngoaiInPage, getNuocngoai, updateNuocngoai, deleteNuocngoai } from './redux/nuocngoai.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class NuocngoaiPage extends React.Component {
    constructor(props) {
        super(props);
        this.showNuocngoai = this.showNuocngoai.bind(this);
        this.deleteNuocngoai = this.deleteNuocngoai.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(11, 2);
            this.props.getNuocngoaiInPage();
        });
    }

    showNuocngoai(e, nuocngoaiId) {
        console.log(data);
        this.props.getNuocngoai(nuocngoaiId, nuocngoai => this.props.showNuocngoai(nuocngoai));
        e.preventDefault();
    }

    deleteNuocngoai(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteNuocngoai(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.nuocngoai && this.props.nuocngoai.page && this.props.nuocngoai.page.list && this.props.nuocngoai.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>MS nước</th>
                            <th style={{ width: '60%' }}>Tên nước</th>
                            <th style={{ width: '60%' }}>MS khu vực</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.nuocngoai.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showNuocngoai(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteNuocngoai(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có nước ngoài nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.nuocngoai && this.props.nuocngoai.page ?
            this.props.nuocngoai.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Nước ngoài</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Nước ngoài</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminNuocngoai'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getNuocngoaiInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ nuocngoai: state.nuocngoai });
const mapActionsToProps = { getNuocngoaiInPage, getNuocngoai, updateNuocngoai, deleteNuocngoai };
export default connect(mapStateToProps, mapActionsToProps)(NuocngoaiPage);
