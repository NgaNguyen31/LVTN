import React from 'react';

export default class MessagePage extends React.Component {
    constructor(props) {
        super(props);
        this.goToHomePage = this.goToHomePage.bind(this);
        this.state = {};
    }

    componentDidMount() {
        let pathname = window.location.pathname;
        if (pathname.startsWith('/active-user/')) {
            T.post(window.location.pathname,
                res => this.setState({ message: res.message }),
                error => T.notify('Kích hoạt người dùng bị lỗi!', 'danger'));
        }
    }

    goToHomePage(e) {
        this.props.history.push('/');
        e.preventDefault();
    }

    render() {
        let pathname = window.location.pathname,
            message = 'Xin vui lòng chờ trong giây lát!';
        if (pathname == '/404.html') {
            message = 'Trang web này không tồn tại!';
        } else if (pathname == '/registered') {
            message = 'Cảm ơn bạn đã đăng ký thành viên!<br/>Xin vui lòng kiểm tra email để kích hoạt tài khoản.';
        } else if (this.state.message) {
            message = this.state.message;
        }

        return (
            <div className='central-box'>
                <h3 dangerouslySetInnerHTML={{ __html: message }} />
                Nhấp vào <a href='#' onClick={this.goToHomePage}>đây</a> để trở về trang chủ.
            </div>
        );
    }
}