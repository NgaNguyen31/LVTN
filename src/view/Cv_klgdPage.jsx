import React from 'react';
import { connect } from 'react-redux';
import { getCv_klgdInPage, getCv_klgd, updateCv_klgd, deleteCv_klgd } from './redux/cv_klgd.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class Cv_klgdPage extends React.Component {
    constructor(props) {
        super(props);
        this.showCv_klgd = this.showCv_klgd.bind(this);
        this.deleteCv_klgd = this.deleteCv_klgd.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getCv_klgdInPage();
        });
    }

    showCv_klgd(e, cv_klgdId) {
        console.log(data);
        this.props.getCv_klgd(cv_klgdId, cv_klgd => this.props.showCv_klgd(cv_klgd));
        e.preventDefault();
    }

    deleteCv_klgd(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin này?', true, isConfirm => {
            isConfirm && this.props.deleteCv_klgd(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.cv_klgd && this.props.cv_klgd.page && this.props.cv_klgd.page.list && this.props.cv_klgd.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Mã số công việc khối lượng giảng dạy</th>
                            <th style={{ width: '60%' }}>Tên công việc khối lượng giảng dạy</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cv_klgd.page.list.map((item, index) => (
                            <tr key={index}>                               
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showCv_klgd(e, item._id)}>
                                        <i className='fa fa-lg fa-envelope-open-o' />
                                    </a>
                                    <a className='btn btn-danger' href='#' onClick={e => this.deleteCv_klgd(e, item)}>
                                        <i className='fa fa-lg fa-trash' />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Chưa có công việc khối lượng giảng dạy nào!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.cv_klgd && this.props.cv_klgd.page ?
            this.props.cv_klgd.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Thông tin Công việc khối lượng giảng dạy</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Công việc khối lượng giảng dạy</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminCv_klgd'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getCv_klgdInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ cv_klgd: state.cv_klgd });
const mapActionsToProps = { getCv_klgdInPage, getCv_klgd, updateCv_klgd, deleteCv_klgd };
export default connect(mapStateToProps, mapActionsToProps)(Cv_klgdPage);
