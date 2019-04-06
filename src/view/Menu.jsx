import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            var treeviewMenu = $('.app-menu');

            // Toggle Sidebar
            $('[data-toggle="sidebar"]').click(function (event) {
                $('.app').toggleClass('sidenav-toggled');
                event.preventDefault();
            });

            // Activate sidebar treeview toggle
            $('[data-toggle="treeview"]').click(function (event) {
                if (!$(this).parent().hasClass('is-expanded')) {
                    treeviewMenu.find('[data-toggle="treeview"]').parent().removeClass('is-expanded');
                }
                $(this).parent().toggleClass('is-expanded');
                event.preventDefault();
            });

            // Set initial active toggle
            $('[data-toggle="treeview."].is-expanded').parent().toggleClass('is-expanded');

            //Activate bootstrip tooltips
            $('[data-toggle="tooltip"]').tooltip();
        }, 500));
    }

    render() {
        let { user } = this.props.system ? this.props.system : {};
        if (user == null) user = { firstname: 'firstname', lastname: 'lastname', image: '/img/avatar.jpg', role: '' };

        return [
            <div key={1} className='app-sidebar__overlay' data-toggle='sidebar' />,
            <aside key={2} className='app-sidebar'>
                <div className='app-sidebar__user'>
                    <img className='app-sidebar__user-avatar' src={user.image} alt='Avatar' style={{ width: '48px', height: 'auto' }} />
                    <div>
                        <p className='app-sidebar__user-name'>{user.firstname + ' ' + user.lastname}</p>
                        <p className='app-sidebar__user-designation'>{user.role}</p>
                    </div>
                </div>
                <ul className='app-menu'>
                    <li>
                        <Link className='app-menu__item' to='/admin'>
                            <i className='app-menu__icon fa fa-dashboard' />
                            <span className='app-menu__label'>Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link className='app-menu__item' to='/admin/settings'>
                            <i className='app-menu__icon fa fa-cog' />
                            <span className='app-menu__label'>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='app-menu__item' to='/admin/user'>
                            <i className='app-menu__icon fa fa-user' />
                            <span className='app-menu__label'>User</span>
                        </Link>
                    </li>

                    <li>
                        <Link className='app-menu__item' to='/admin/email'>
                            <i className='app-menu__icon fa fa-envelope' />
                            <span className='app-menu__label'>Email</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='app-menu__item' to='/admin/contact'>
                            <i className='app-menu__icon fa fa-send' />
                            <span className='app-menu__label'>Contact</span>
                        </Link>
                    </li>

                    <li className='treeview'>
                        <a className='app-menu__item' href='#' data-toggle='treeview'>
                            <i className='app-menu__icon fa fa-file' />
                            <span className='app-menu__label'>News</span>
                            <i className='treeview-indicator fa fa-angle-right' />
                        </a>
                        <ul className='treeview-menu'>
                            <li>
                                <Link className='treeview-item' to='/admin/news/category'>
                                    <i className='icon fa fa-circle-o' />News Category
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/news/list'>
                                    <i className='icon fa fa-circle-o' />News List
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className='treeview'>
                        <a className='app-menu__item' href='#' data-toggle='treeview'>
                            <i className='app-menu__icon fa fa-star' />
                            <span className='app-menu__label'>Event</span>
                            <i className='treeview-indicator fa fa-angle-right' />
                        </a>
                        <ul className='treeview-menu'>
                            <li>
                                <Link className='treeview-item' to='/admin/event/category'>
                                    <i className='icon fa fa-circle-o' />Event Category
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/event/list'>
                                    <i className='icon fa fa-circle-o' />Event List
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className='treeview'>
                        <a className='app-menu__item' href='#' data-toggle='treeview'>
                            <i className='app-menu__icon fa fa-pagelines' />
                            <span className='app-menu__label'>Job</span>
                            <i className='treeview-indicator fa fa-angle-right' />
                        </a>
                        <ul className='treeview-menu'>
                            <li>
                                <Link className='treeview-item' to='/admin/job/category'>
                                    <i className='icon fa fa-circle-o' />Job Category
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/job/list'>
                                    <i className='icon fa fa-circle-o' />Job List
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className='treeview'>
                        <a className='app-menu__item' href='#' data-toggle='treeview'>
                            <i className='app-menu__icon fa fa-star' />
                            <span className='app-menu__label'>Thông tin chung</span>
                            <i className='treeview-indicator fa fa-angle-right' />
                        </a>
                        <ul className='treeview-menu'>
                            <li>
                                <Link className='treeview-item' to='/admin/chau'>
                                    <i className='icon fa fa-circle-o' />Châu
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside >
        ];
    }
}

const mapStateToProps = state => ({ system: state.system });
const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(Menu);