import React from 'react';
import { connect } from 'react-redux';
import { getUserInPage, createUser, updateUser, deleteUser } from './redux/user.jsx'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';
import UserModal from './UserModal.jsx';
import UserPasswordModal from './UserPasswordModal.jsx';
import Pagination from './Pagination.jsx';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.userModal = React.createRef();
        this.passwordModal = React.createRef();

        this.edit = this.edit.bind(this);
        this.changeRole = this.changeRole.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(1, 4);
            this.props.getUserInPage();
        });
    }

    edit(e, item) {
        this.userModal.current.show(item);
        e.preventDefault();
    }

    changeRole(item, selectedRole) {
        selectedRole = selectedRole.toLowerCase();
        if (T.roles.indexOf(selectedRole) !== -1) {
            this.props.updateUser(item._id, { role: selectedRole });
        }
    }

    changePassword(e, item) {
        this.passwordModal.current.show(item);
        e.preventDefault();
    }

    changeActive(item, index) {
        this.props.updateUser(item._id, { active: !item.active });
    }

    delete(e, item) {
        T.confirm('Xóa người dùng', 'Bạn có chắc chắn muốn xóa người dùng này chứ?', true, isConfirm => {
            isConfirm && this.props.deleteUser(item._id);
        });
        e.preventDefault();
    }

    render() {
        let table = null;
        if (this.props.user && this.props.user.page && this.props.user.page.list && this.props.user.page.list.length > 0) {
            table = (
                <table className='table table-hover table-bordered' ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%', textAlign: 'center' }}>Họ tên</th>
                            <th style={{ width: '60%', textAlign: 'center' }}>Email</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Ảnh đại diện</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Vai trò</th>
                            <th style={{ width: 'auto' }} nowrap='true'>Trạng thái</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.user.page.list.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <a href='#' onClick={e => this.edit(e, item)}>{(item.firstname ? item.firstname + ' ' : '') + item.lastname}</a>
                                </td>
                                <td>{item.email}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <img src={item.image ? item.image : '/img/avatar.jpg'} alt='avatar' style={{ height: '32px' }} />
                                </td>
                                <td style={{ textAlign: 'center' }} >
                                    <Dropdown text={item.role} items={T.roles} onSelected={selectedRole => this.changeRole(item, selectedRole)} />
                                </td>
                                <td className='toggle' style={{ textAlign: 'center' }} >
                                    <label>
                                        <input type='checkbox' checked={item.active} onChange={() => this.changeActive(item, index)} /><span className='button-indecator' />
                                    </label>
                                </td>
                                <td className='btn-group'>
                                    <a className='btn btn-primary' href='#' onClick={e => this.edit(e, item)}>
                                        <i className='fa fa-lg fa-edit' />
                                    </a>
                                    <a className='btn btn-info' href='#' onClick={e => this.changePassword(e, item)}>
                                        <i className='fa fa-lg fa-key' />
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
            table = <p>Không có người dùng!</p>;
        }

        const { pageNumber, pageSize, pageTotal, totalItem } = this.props.user ?
            this.props.user.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-user' /> Người dùng</h1>
                        <p></p>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Người dùng</li>
                    </ul>
                </div>

                <div className='row tile'>{table}</div>
                <Pagination name='adminUser' pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem}
                    getPage={this.props.getUserInPage} />

                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }} onClick={this.edit}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <UserModal ref={this.userModal} createUser={this.props.createUser} updateUser={this.props.updateUser} />
                <UserPasswordModal updateUser={this.props.updateUser} ref={this.passwordModal} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });
const mapActionsToProps = { getUserInPage, createUser, updateUser, deleteUser };
export default connect(mapStateToProps, mapActionsToProps)(UserPage);