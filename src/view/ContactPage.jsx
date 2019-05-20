import React from 'react';
import { connect } from 'react-redux';
import { getContactInPage, getContact, updateContact, deleteContact } from './redux/contact.jsx'
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';

class ContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.showContact = this.showContact.bind(this);
        this.changeRead = this.changeRead.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(4);
            this.props.getContactInPage();
        });
    }

    showContact(e, contactId) {
        this.props.getContact(contactId, contact => this.props.showContactModal(contact));
        e.preventDefault();
    }

    changeRead(item, index) {
        this.props.updateContact(item._id, { read: !item.read });
    }

    delete(e, item) {
        T.confirm('Xóa liên hệ', 'Bạn có chắc bạn muốn xóa thông tin liên hệ này?', true, isConfirm => {
            isConfirm && this.props.deleteContact(item._id);
        });
        e.preventDefault();
    }

    render() {
        const readStyle = { textDecorationLine: 'none', fontWeight: 'normal', color: 'black' },
            unreadStyle = { textDecorationLine: 'none', fontWeight: 'bold' };
        let table = null;
        if (this.props.contact && this.props.contact.page && this.props.contact.page.list && this.props.contact.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '60%' }}>Chủ đề</th>
                            <th style={{ width: '40%' }}>Tên & Email</th>
                            <th style={{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.contact.page.list.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <a href='#' onClick={e => this.showContact(e, item._id)} style={item.read ? readStyle : unreadStyle}>{item.subject}</a>
                                    <br />
                                    {new Date(item.createdDate).getText()}
                                </td>
                                <td>{item.name}<br />{item.email}</td>
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.showContact(e, item._id)}>
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
            table = <p>No message!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.contact && this.props.contact.page ?
            this.props.contact.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa fa-send-o' /> Contact</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Contact</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminContact'
                    pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getContactInPage} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ contact: state.contact });
const mapActionsToProps = { getContactInPage, getContact, updateContact, deleteContact };
export default connect(mapStateToProps, mapActionsToProps)(ContactPage);