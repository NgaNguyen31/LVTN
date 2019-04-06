import React from 'react';
import { connect } from 'react-redux';
import { getNewsInPage, createNews, updateNews, swapNews, deleteNews } from './redux/news.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.create = this.create.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.swap = this.swap.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(5, 1);
            this.props.getNewsInPage();
        });
    }

    create(e) {
        this.props.createNews(data => this.props.history.push('/admin/news/edit/' + data.item._id));
        e.preventDefault();
    }

    swap(e, item, isMoveUp) {
        this.props.swapNews(item._id, isMoveUp);
        e.preventDefault();
    }

    changeActive(item, index) {
        this.props.updateNews(item._id, { active: !item.active });
    }

    delete(e, item) {
        T.confirm('News', 'Are you sure you want to delete this news?', 'warning', true, isConfirm => {
            isConfirm && this.props.deleteNews(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.news && this.props.news.page && this.props.news.page.list && this.props.news.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th style={{ width: '80%' }}>Title</th>
                            <th style={{ width: '20%', textAlign: 'center' }}>Avatar</th>
                            <th style={{ width: 'auto' }} nowrap='true'>Active</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.news.page.list.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={'/admin/news/edit/' + item._id} data-id={item._id}>
                                        {item.title}
                                    </Link>
                                </td>
                                <td style={{ width: '20%', textAlign: 'center' }}>
                                    <img src={item.image} alt='avatar' style={{ height: '32px' }} />
                                </td>
                                <td className='toggle' style={{ textAlign: 'center' }} >
                                    <label>
                                        <input type='checkbox' checked={item.active} onChange={() => this.changeActive(item, index)} /><span className='button-indecator' />
                                    </label>
                                </td>
                                <td className='btn-group'>
                                    <a className='btn btn-success' href='#' onClick={e => this.swap(e, item, true)}>
                                        <i className='fa fa-lg fa-arrow-up' />
                                    </a>
                                    <a className='btn btn-success' href='#' onClick={e => this.swap(e, item, false)}>
                                        <i className='fa fa-lg fa-arrow-down' />
                                    </a>
                                    <Link to={'/admin/news/edit/' + item._id} data-id={item._id} className='btn btn-primary'>
                                        <i className='fa fa-lg fa-edit' />
                                    </Link>
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
            table = <p>No news!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.news && this.props.news.page ?
            this.props.news.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-file' /> News List</h1>
                        <p></p>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>News List</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='pageNews'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getNewsInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }}
                    onClick={this.create}>
                    <i className='fa fa-lg fa-plus' />
                </button>
            </main>
        );
    }
}

const mapStateToProps = state => ({ news: state.news });
const mapActionsToProps = { getNewsInPage, createNews, updateNews, swapNews, deleteNews };
export default connect(mapStateToProps, mapActionsToProps)(NewsPage);