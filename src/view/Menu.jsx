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
                            <span className='app-menu__label'>Cài đặt</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='app-menu__item' to='/admin/user'>
                            <i className='app-menu__icon fa fa-user' />
                            <span className='app-menu__label'>Người dùng</span>
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
                            <span className='app-menu__label'>Liên hệ</span>
                        </Link>
                    </li>

                    <li className='treeview'>
                        <a className='app-menu__item' href='#' data-toggle='treeview'>
                            <i className='app-menu__icon fa fa-file' />
                            <span className='app-menu__label'>Tin tức</span>
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
                            <span className='app-menu__label'>Sự kiện</span>
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
                            <span className='app-menu__label'>Công việc</span>
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
                            <i className='app-menu__icon fa fa-pagelines' />
                            <span className='app-menu__label'>Thông tin CBCNV</span>
                            <i className='treeview-indicator fa fa-angle-right' />
                        </a>
                        <ul className='treeview-menu'>
                            <li>
                                <Link className='treeview-item' to='/admin/cb_nngoai'>
                                    <i className='icon fa fa-circle-o' />Cán bộ nước ngoài
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/cbcnv_hd_dv_tu_tra'>
                                    <i className='icon fa fa-circle-o' />Cán bộ công nhân viên hoạt động tự trả
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/cbcnv_hd_khoa'>
                                    <i className='icon fa fa-circle-o' />Cán bộ công nhân viên hoạt động khoa
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/cbcnv'>
                                    <i className='icon fa fa-circle-o' />Cán bộ công nhân viên
                                </Link>
                            </li>                            
                            <li>
                                <Link className='treeview-item' to='/admin/pctn_nghe_2018'>
                                    <i className='icon fa fa-circle-o' />PCTN nghe 2018
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className='treeview'>
                        <a className='app-menu__item' href='#' data-toggle='treeview'>
                            <i className='app-menu__icon fa fa-pagelines' />
                            <span className='app-menu__label'>Thông tin quản trị</span>
                            <i className='treeview-indicator fa fa-angle-right' />
                        </a>
                        <ul className='treeview-menu'>
                        <li>
                                <Link className='treeview-item' to='/admin/qt_bbao'>
                                    <i className='icon fa fa-circle-o' />Bài báo
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_boiduong'>
                                    <i className='icon fa fa-circle-o' />Bồi dưỡng
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_cac_con'>
                                    <i className='icon fa fa-circle-o' />Các con
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_ctac'>
                                    <i className='icon fa fa-circle-o' />Công tác
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_cvu'>
                                    <i className='icon fa fa-circle-o' />Chức vụ
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_dtai'>
                                    <i className='icon fa fa-circle-o' />Đề tài
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_dtao'>
                                    <i className='icon fa fa-circle-o' />Đào tạo
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_gtrinh'>
                                    <i className='icon fa fa-circle-o' />Giáo trình
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_khen'>
                                    <i className='icon fa fa-circle-o' />Khen
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_ky_luat'>
                                    <i className='icon fa fa-circle-o' />Kỷ luật
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_luong'>
                                    <i className='icon fa fa-circle-o' />Lương
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_nngoai'>
                                    <i className='icon fa fa-circle-o' />Nước ngoài
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_nngu'>
                                    <i className='icon fa fa-circle-o' />Ngoại ngữ
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/qt_tnghiem'>
                                    <i className='icon fa fa-circle-o' />Thí nghiệm
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
                            {/* <li>
                                <Link className='treeview-item' to='/admin/chau'>
                                    <i className='icon fa fa-circle-o' />Châu
                                </Link>
                            </li> */}
                            <li>
                                <Link className='treeview-item' to='/admin/bomon'>
                                    <i className='icon fa fa-circle-o' />Bộ môn
                                    
                                </Link>
                            </li>                            
                            <li>
                                <Link className='treeview-item' to='/admin/chucdanh'>
                                    <i className='icon fa fa-circle-o' />Chức danh
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/dk_klgd'>
                                    <i className='icon fa fa-circle-o' />Đăng kí khối lượng giảng dạy
                                </Link>
                            </li>                        
                            <li>
                                <Link className='treeview-item' to='/admin/khoi_luong_gd_caohoc'>
                                    <i className='icon fa fa-circle-o' />Khối lượng giảng dạy cao học
                                </Link>
                            </li>                            
                            <li>
                                <Link className='treeview-item' to='/admin/kiemnhiem'>
                                    <i className='icon fa fa-circle-o' />Kiêm nhiệm
                                </Link>
                            </li>                           
                            <li>
                                <Link className='treeview-item' to='/admin/nuocngoai'>
                                    <i className='icon fa fa-circle-o' />Nước ngoài
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/trinhdo'>
                                    <i className='icon fa fa-circle-o' />Trình độ
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className='treeview'>
                        <a className='app-menu__item' href='#' data-toggle='treeview'>
                            <i className='app-menu__icon fa fa-star' />
                            <span className='app-menu__label'>Thông tin cơ bản</span>
                            <i className='treeview-indicator fa fa-angle-right' />
                        </a>
                        <ul className='treeview-menu'>
                            <li>
                                <Link className='treeview-item' to='/admin/benhvien'>
                                    <i className='icon fa fa-circle-o' />Bệnh viện
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/chinhsach'>
                                    <i className='icon fa fa-circle-o' />Chính sách
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/chucvu'>
                                    <i className='icon fa fa-circle-o' />Chức vụ
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/cv_klgd'>
                                    <i className='icon fa fa-circle-o' />Công việc khối lượng giảng dạy
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/dantoc'>
                                    <i className='icon fa fa-circle-o' />Dân tộc
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/heso'>
                                    <i className='icon fa fa-circle-o' />Hệ số
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/khoa'>
                                    <i className='icon fa fa-circle-o' />Khoa
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/khuvuc'>
                                    <i className='icon fa fa-circle-o' />Khu vực
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/kihieu_tang_giam_bhxh'>
                                    <i className='icon fa fa-circle-o' />Kí hiệu tăng giảm bảo hiểm xã hội
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/loai'>
                                    <i className='icon fa fa-circle-o' />Loại
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/mucdich'>
                                    <i className='icon fa fa-circle-o' />Mục đích
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/ngach'>
                                    <i className='icon fa fa-circle-o' />Ngạch
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/nghi_ctac'>
                                    <i className='icon fa fa-circle-o' />Nghỉ công tác
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/ngoaingu'>
                                    <i className='icon fa fa-circle-o' />Ngoại ngữ
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/nuoc'>
                                    <i className='icon fa fa-circle-o' />Nước
                                </Link>
                            </li>                                                        
                            <li>
                                <Link className='treeview-item' to='/admin/phanloai'>
                                    <i className='icon fa fa-circle-o' />Phân loại
                                </Link>
                            </li>                            
                            <li>
                                <Link className='treeview-item' to='/admin/tinh'>
                                    <i className='icon fa fa-circle-o' />Tỉnh
                                </Link>
                            </li>
                            <li>
                                <Link className='treeview-item' to='/admin/tongiao'>
                                    <i className='icon fa fa-circle-o' />Tôn giáo
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