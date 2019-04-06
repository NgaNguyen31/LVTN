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
const allReducers = combineReducers({ system, user, category, news, event, job, contact, chau, });
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