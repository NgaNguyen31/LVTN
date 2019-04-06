import React from 'react';
import { connect } from 'react-redux';
import { getEventInPage, createEvent, updateEvent, swapEvent, deleteEvent } from './redux/event.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.create = this.create.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.swap = this.swap.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(6, 1);
            this.props.getEventInPage();
        });
    }

    create(e) {
        this.props.createEvent(data => this.props.history.push('/admin/event/edit/' + data.item._id));
        e.preventDefault();
    }

    swap(e, item, isMoveUp) {
        this.props.swapEvent(item._id, isMoveUp);
        e.preventDefault();
    }

    changeActive(item, index) {
        this.props.updateEvent(item._id, { active: !item.active });
    }

    delete(e, item) {
        T.confirm('Event', 'Are you sure you want to delete this event?', 'warning', true, isConfirm => {
            isConfirm && this.props.deleteEvent(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.event && this.props.event.page && this.props.event.page.list && this.props.event.page.list.length > 0) {
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
                        {this.props.event.page.list.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={'/admin/event/edit/' + item._id} data-id={item._id}>
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
                                    <Link to={'/admin/event/edit/' + item._id} data-id={item._id} className='btn btn-primary'>
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
            table = <p>No event!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.event && this.props.event.page ?
            this.props.event.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-star' /> Event List</h1>
                        <p></p>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Event List</li>
                    </ul>
                </div>

                <div className='row tile'>
                    {table}
                </div>
                <Pagination name='pageEvent'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getEventInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }}
                    onClick={this.create}>
                    <i className='fa fa-lg fa-plus' />
                </button>
            </main>
        );
    }
}

const mapStateToProps = state => ({ event: state.event });
const mapActionsToProps = { getEventInPage, createEvent, updateEvent, swapEvent, deleteEvent };
export default connect(mapStateToProps, mapActionsToProps)(EventPage);