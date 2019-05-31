import React from 'react';
import { connect } from 'react-redux';
import { getCv_klgdInPage, createCv_klgd, updateCv_klgd, deleteCv_klgd } from './redux/cv_klgd.jsx'
import { Link } from 'react-router-dom';
import Cv_klgdModal from './Cv_klgdModel.jsx';
import Pagination from './Pagination.jsx';

class Cv_klgdPage extends React.Component {
    constructor(props) {
        super(props);
        this.cv_klgdModal = React.createRef();
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(5, 2);
            this.props.getCv_klgdInPage();
        });
    }

    edit(e, item){
        this.cv_klgdModal.current.show(item);
        e.preventDefault();
    }

    delete(e, item) {
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
                            <th style={{ width: '40%', textAlign: 'center' }}>Tên công việc khối lượng giảng dạy</th>
                            <th style={{ width: '60%', textAlign: 'center' }}>Ghi chú</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cv_klgd.page.list.map((item, index) => (
                            <tr key={index}>   
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.TEN_CV ? item.TEN_CV + ' ' : '')}</a>
                                </td>   
                                <td>{item.GHI_CHU}</td>                         
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

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <Cv_klgdModal ref={this.cv_klgdModal} createCv_klgd={this.props.createCv_klgd} updateCv_klgd={this.props.updateCv_klgd} />    
            </main>
        );
    }
}

const mapStateToProps = state => ({ cv_klgd: state.cv_klgd });
const mapActionsToProps = { getCv_klgdInPage, createCv_klgd, updateCv_klgd, deleteCv_klgd  };
export default connect(mapStateToProps, mapActionsToProps)(Cv_klgdPage);
