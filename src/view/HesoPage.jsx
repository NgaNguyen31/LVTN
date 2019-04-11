import React from 'react';
import { connect } from 'react-redux';
import { getHesoInPage, getHeso, updateHeso, deleteHeso } from './redux/heso.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class HesoPage extends React.Component {
    constructor(props) {
        super(props);
        this.showHeso = this.showHeso.bind(this);
        this.deleteHeso = this.deleteHeso.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getHesoInPage();
        });
    }

    showHeso(e, hesoId) {
        console.log(data);
        this.props.getHeso(hesoId, heso => this.props.showHeso(heso));
        e.preventDefault();
    }

    deleteHeso(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteHeso(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.heso && this.props.heso.page && this.props.heso.page.list && this.props.heso.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>MLTT</th>
                            <th style={{ width: '60%' }}>TL</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.heso.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showHeso(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteHeso(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có hệ số nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.heso && this.props.heso.page ?
            this.props.heso.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Hệ số</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Hệ số</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminHeso'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getHesoInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ heso: state.heso });
const mapActionsToProps = { getHesoInPage, getHeso, updateHeso, deleteHeso };
export default connect(mapStateToProps, mapActionsToProps)(HesoPage);
