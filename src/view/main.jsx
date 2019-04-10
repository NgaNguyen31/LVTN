import './scss/bootstrap/bootstrap.scss';
import './scss/admin/main.scss';
import './scss/main.scss';
import T from './js/common';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import system, { getSystemState, updateSystemState } from './redux/system.jsx';
import user, { changeUser } from './redux/user.jsx';
import chau from './redux/chau.jsx';
import dantoc from './redux/dantoc.jsx';
import benhvien from './redux/benhvien.jsx';
import bomon from './redux/bomon.jsx';
import cb_nngoai from './redux/cb_nngoai.jsx';
import cbcnv_hd_dv_tu_tra from './redux/cbcnv_hd_dv_tu_tra.jsx';
import cbcnv_hd_khoa from './redux/cbcnv_hd_khoa.jsx';
import cbcnv from './redux/cbcnv.jsx';
import chucdanh from './redux/chucdanh.jsx';
import chucvu from './redux/chucvu.jsx';
import cv_klgd from './redux/cv_klgd.jsx';
import dk_klgd from './redux/dk_klgd.jsx';
import heso from './redux/heso.jsx';
import khoa from './redux/khoa.jsx';
import khoi_luong_gd_caohoc from './redux/khoi_luong_gd_caohoc.jsx';
import khuvuc from './redux/khuvuc.jsx';
import kiemnhiem from './redux/kiemnhiem.jsx';
import kihieu_tang_giam_bhxh from './redux/kihieu_tang_giam_bhxh.jsx';
import loai from './redux/loai.jsx';
import mucdich from './redux/mucdich.jsx';
import mucdich1 from './redux/mucdich1.jsx';
import ngach from './redux/ngach.jsx';
import nghi_ctac from './redux/nghi_ctac.jsx';
import ngoaingu from './redux/ngoaingu.jsx';
import nuoc from './redux/nuoc.jsx';
import nuocngoai from './redux/nuocngoai.jsx';
import pctn_nghe_2018 from './redux/pctn_nghe_2018.jsx';
import phanloai from './redux/phanloai.jsx';
import qt_bbao from './redux/qt_bbao.jsx';
import qt_boiduong from './redux/qt_boiduong.jsx';
import qt_cac_con from './redux/qt_cac_con.jsx';
import qt_ctac from './redux/qt_ctac.jsx';
import qt_cvu from './redux/qt_cvu.jsx';
import qt_dtao from './redux/qt_dtao.jsx';
import qt_dtai from './redux/qt_dtai.jsx';
import qt_gtrinh from './redux/qt_gtrinh.jsx';
import qt_khen from './redux/qt_khen.jsx';
import qt_ky_luat from './redux/qt_ky_luat.jsx';
import qt_luong from './redux/qt_luong.jsx';
import qt_nngoai from './redux/qt_nngoai.jsx';
import qt_nngu from './redux/qt_nngu.jsx';
import qt_tnghiem from './redux/qt_tnghiem.jsx';
import trinhdo from './redux/trinhdo.jsx';
import tinh from './redux/tinh.jsx';
import tongiao from './redux/tongiao.jsx';
import category, { changeCategory } from './redux/category.jsx';
import news from './redux/news.jsx';
import event from './redux/event.jsx';
import job from './redux/job.jsx';
import contact, { addContact, changeContact } from './redux/contact.jsx';

import Loadable from 'react-loadable';
import Loading from './Loading.jsx';
import Header from './Header.jsx';
import Menu from './Menu.jsx';
import ContactModal from './ContactModal.jsx';

// Initialize Redux ----------------------------------------------------------------------------------------------------
const allReducers = combineReducers({ system, user, category, news, event, job, contact, chau, dantoc, chinhsach, benhvien, bomon, cb_nngoai, cbcnv_hd_dv_tu_tra, cbcnv_hd_khoa, cbcnv, chucdanh, chucvu, cv_klgd, dk_klgd, heso, khoa, khoi_luong_gd_caohoc, khuvuc, kiemnhiem, kihieu_tang_giam_bhxh, loai, mucdich, mucdich1, ngach, nghi_ctac, ngoaingu, nuoc, nuocngoai, pctn_nghe_2018, phanloai, qt_bbao, qt_boiduong, qt_cac_con, qt_ctac, qt_cvu, qt_dtai, qt_dtao, qt_gtrinh, qt_khen, qt_ky_luat, qt_luong, qt_nngoai, qt_nngu, qt_tnghiem, tinh, trinhdo, tongiao });
const store = createStore(allReducers, {}, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(getSystemState());
window.T = T;

// Router -------------------------------------------------------------------------------------------------------------
class Router extends React.Component {
    constructor(props) {
        super(props);
        this.contactModal = React.createRef();
        this.showContactModal = this.showContactModal.bind(this);

        const ContactPageTag = Loadable({ loading: Loading, loader: () => import('./ContactPage.jsx') });
        this.routeData = [
            { path: '/admin/settings', component: Loadable({ loading: Loading, loader: () => import('./SettingsPage.jsx') }) },
            { path: '/admin/profile', component: Loadable({ loading: Loading, loader: () => import('./ProfilePage.jsx') }) },
            { path: '/admin/email', component: Loadable({ loading: Loading, loader: () => import('./EmailPage.jsx') }) },
            { path: '/admin/user', component: Loadable({ loading: Loading, loader: () => import('./UserPage.jsx') }) },
            { path: '/admin/contact', component: () => (<ContactPageTag showContactModal={this.showContactModal} />) },
            { path: '/admin/news/category', component: Loadable({ loading: Loading, loader: () => import('./NewsCategoryPage.jsx') }) },
            { path: '/admin/news/list', component: Loadable({ loading: Loading, loader: () => import('./NewsPage.jsx') }) },
            { path: '/admin/news/edit/:newsId', component: Loadable({ loading: Loading, loader: () => import('./NewsEditPage.jsx') }) },
            { path: '/admin/event/category', component: Loadable({ loading: Loading, loader: () => import('./EventCategoryPage.jsx') }) },
            { path: '/admin/event/list', component: Loadable({ loading: Loading, loader: () => import('./EventPage.jsx') }) },
            { path: '/admin/event/edit/:newsId', component: Loadable({ loading: Loading, loader: () => import('./EventEditPage.jsx') }) },
            { path: '/admin/job/category', component: Loadable({ loading: Loading, loader: () => import('./JobCategoryPage.jsx') }) },
            { path: '/admin/job/list', component: Loadable({ loading: Loading, loader: () => import('./JobPage.jsx') }) },
            { path: '/admin/job/edit/:newsId', component: Loadable({ loading: Loading, loader: () => import('./JobEditPage.jsx') }) },
            { path: '/admin/chau', component: Loadable({ loading: Loading, loader: () => import('./ChauPage.jsx') }) },
            { path: '/admin/dantoc', component: Loadable({ loading: Loading, loader: () => import('./DantocPage.jsx') }) },
            { path: '/admin/chinhsach', component: Loadable({ loading: Loading, loader: () => import('./ChinhsachPage.jsx') }) },
            { path: '/admin/bomon', component: Loadable({ loading: Loading, loader: () => import('./BomonPage.jsx') }) },
            { path: '/admin/benhvien', component: Loadable({ loading: Loading, loader: () => import('./BenhvienPage.jsx') }) },
            { path: '/admin/cb_nngoai', component: Loadable({ loading: Loading, loader: () => import('./Cb_nngoaiPage.jsx') }) },
            { path: '/admin/cbcnv_hd_dv_tu_tra', component: Loadable({ loading: Loading, loader: () => import('./Cbcnv_hd_dv_tu_traPage.jsx') }) },
            { path: '/admin/cbcnv_hd_khoa', component: Loadable({ loading: Loading, loader: () => import('./Cbcnv_hd_khoaPage.jsx') }) },
            { path: '/admin/cbcnv', component: Loadable({ loading: Loading, loader: () => import('./CbcnvPage.jsx') }) },
            { path: '/admin/chucdanh', component: Loadable({ loading: Loading, loader: () => import('./ChucdanhPage.jsx') }) },
            { path: '/admin/chucvu', component: Loadable({ loading: Loading, loader: () => import('./ChucvuPage.jsx') }) },
            { path: '/admin/cv_klgd', component: Loadable({ loading: Loading, loader: () => import('./Cv_klgdPage.jsx') }) },
            { path: '/admin/dk_klgd', component: Loadable({ loading: Loading, loader: () => import('./Dk_klgdPage.jsx') }) },
            { path: '/admin/heso', component: Loadable({ loading: Loading, loader: () => import('./HesoPage.jsx') }) },
            { path: '/admin/khoa', component: Loadable({ loading: Loading, loader: () => import('./KhoaPage.jsx') }) },
            { path: '/admin/khoi_luong_gd_caohoc', component: Loadable({ loading: Loading, loader: () => import('./khoi_luong_gd_caohocPage.jsx') }) },
            { path: '/admin/khuvuc', component: Loadable({ loading: Loading, loader: () => import('./KhuvucPage.jsx') }) },
            { path: '/admin/kiemnhiem', component: Loadable({ loading: Loading, loader: () => import('./KiemnhiemPage.jsx') }) },
            { path: '/admin/kihieu_tang_giam_bhxh', component: Loadable({ loading: Loading, loader: () => import('./Kihieu_tang_giam_bhxhPage.jsx') }) },
            { path: '/admin/loai', component: Loadable({ loading: Loading, loader: () => import('./LoaiPage.jsx') }) },
            { path: '/admin/mucdich', component: Loadable({ loading: Loading, loader: () => import('./MucdichPage.jsx') }) },
            { path: '/admin/mucdich1', component: Loadable({ loading: Loading, loader: () => import('./Mucdich1Page.jsx') }) },
            { path: '/admin/ngach', component: Loadable({ loading: Loading, loader: () => import('./NgachPage.jsx') }) },
            { path: '/admin/nghi_ctac', component: Loadable({ loading: Loading, loader: () => import('./Nghi_ctacPage.jsx') }) },
            { path: '/admin/ngoaingu', component: Loadable({ loading: Loading, loader: () => import('./NgoainguPage.jsx') }) },
            { path: '/admin/nuoc', component: Loadable({ loading: Loading, loader: () => import('./NuocPage.jsx') }) },
            { path: '/admin/nuocngoai', component: Loadable({ loading: Loading, loader: () => import('./NuocngoaiPage.jsx') }) },
            { path: '/admin/pctn_nghe_2018', component: Loadable({ loading: Loading, loader: () => import('./Pctn_nghe_2018Page.jsx') }) },
            { path: '/admin/phanloai', component: Loadable({ loading: Loading, loader: () => import('./PhanloaiPage.jsx') }) },
            { path: '/admin/qt_bbao', component: Loadable({ loading: Loading, loader: () => import('./Qt_bbaoPage.jsx') }) },
            { path: '/admin/qt_boiduong', component: Loadable({ loading: Loading, loader: () => import('./Qt_boiduongPage.jsx') }) },
            { path: '/admin/qt_cac_con', component: Loadable({ loading: Loading, loader: () => import('./Qt_cac_conPage.jsx') }) },
            { path: '/admin/qt_ctac', component: Loadable({ loading: Loading, loader: () => import('./Qt_ctacPage.jsx') }) },
            { path: '/admin/qt_cvu', component: Loadable({ loading: Loading, loader: () => import('./Qt_cvuPage.jsx') }) },
            { path: '/admin/qt_dtai', component: Loadable({ loading: Loading, loader: () => import('./Qt_dtaiPage.jsx') }) },
            { path: '/admin/qt_dtao', component: Loadable({ loading: Loading, loader: () => import('./Qt_dtaoPage.jsx') }) },
            { path: '/admin/qt_gtrinh', component: Loadable({ loading: Loading, loader: () => import('./Qt_gtrinhPage.jsx') }) },
            { path: '/admin/qt_khen', component: Loadable({ loading: Loading, loader: () => import('./Qt_khenPage.jsx') }) },
            { path: '/admin/qt_ky_luat', component: Loadable({ loading: Loading, loader: () => import('./Qt_ky_luatPage.jsx') }) },
            { path: '/admin/qt_luong', component: Loadable({ loading: Loading, loader: () => import('./Qt_luongPage.jsx') }) },
            { path: '/admin/qt_nngoai', component: Loadable({ loading: Loading, loader: () => import('./Qt_nngoaiPage.jsx') }) },
            { path: '/admin/qt_nngu', component: Loadable({ loading: Loading, loader: () => import('./Qt_nnguPage.jsx') }) },
            { path: '/admin/qt_tnghiem', component: Loadable({ loading: Loading, loader: () => import('./Qt_tnghiemPage.jsx') }) },
            { path: '/admin/tinh', component: Loadable({ loading: Loading, loader: () => import('./TinhPage.jsx') }) },
            { path: '/admin/tongiao', component: Loadable({ loading: Loading, loader: () => import('./TongiaoPage.jsx') }) },
            { path: '/admin/trinhdo', component: Loadable({ loading: Loading, loader: () => import('./TrinhdoPage.jsx') }) },
            { path: '/admin', component: Loadable({ loading: Loading, loader: () => import('./AdminPage.jsx') }) },
        ];
        this.routes = this.routeData.map((route, index) => (<Route key={index} {...route} />));
    }

    showContactModal(contact) {
        this.contactModal.current.show(contact);
    }

    render() {
        const pathname = window.location.pathname;
        if (pathname == '/' || pathname.startsWith('/index.htm')) {
            return (
                <main className='app'>
                    <Route component={Loadable({ loading: Loading, loader: () => import('./LoginPage.jsx') })} />
                </main >
            );
        } else {
            for (let i = 0; i < this.routeData.length; i++) {
                const route = T.routeMatcher(this.routeData[i].path);
                if (route.parse(pathname)) {
                    return (
                        <div className='app sidebar-mini rtl'>
                            <Header showContactModal={this.showContactModal} />
                            <Menu />
                            <div className='site-content'>
                                <Switch>{this.routes}</Switch>
                            </div>
                            <ContactModal ref={this.contactModal} />
                        </div >
                    );
                }
            }

            return (
                <main className='app'>
                    <Route component={Loadable({ loading: Loading, loader: () => import('./MessagePage.jsx') })} />
                </main >
            );
        }
    }
}

// Main DOM render -----------------------------------------------------------------------------------------------------
class App extends React.Component {
    componentDidMount() {
        T.socket.on('newsCategory-changed', item => store.dispatch(changeCategory(item)));
        T.socket.on('eventCategory-changed', item => store.dispatch(changeCategory(item)));
        T.socket.on('jobCategory-changed', item => store.dispatch(changeCategory(item)));

        T.socket.on('contact-added', item => store.dispatch(addContact(item)));
        T.socket.on('contact-changed', item => store.dispatch(changeContact(item)));

        T.socket.on('user-changed', item => {
            if (this.props.system && this.props.system.user && this.props.system.user._id == item._id) {
                store.dispatch(updateSystemState({ user: item }));
            }
            store.dispatch(changeUser(item));
        });
    }

    render() {
        return <BrowserRouter><Router system={this.props.system} /></BrowserRouter >;
    }
}

const Main = connect(state => ({ system: state.system }), {})(App);
ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('app'));