import React from 'react';
import { connect } from 'react-redux';
import { getDantocInPage, getDantoc, updateDantoc, deleteDantoc } from './redux/dantoc.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class DantocPage extends React.Component {
    constructor(props) {
        super(props);
        this.showDantoc = this.showDantoc.bind(this);
        this.deleteDantoc = this.deleteDantoc.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getDantocInPage();
        });
    }

    showDantoc(e, dantocId) {
        console.log(data);
        this.props.getDantoc(dantocId, dantoc => this.props.showDantoc(dantoc));
        e.preventDefault();
    }

    deleteDantoc(e, item) {
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
                            <th style={{ width: '40%' }}>Dân tộc</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dantoc.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showDantoc(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteDantoc(e, item)}>
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
            </main>
        );
    }
}

const mapStateToProps = state => ({ dantoc: state.dantoc });
const mapActionsToProps = { getDantocInPage, getDantoc, updateDantoc, deleteDantoc };
export default connect(mapStateToProps, mapActionsToProps)(DantocPage);
