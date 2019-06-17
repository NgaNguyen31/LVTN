import React from 'react';
import { connect } from 'react-redux';
import { login } from './redux/system.jsx'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidMount() {
        this.componentDidUpdate();
        $(document).ready(() => setTimeout(() => {
            $('.login-content [data-toggle="flip"]').click(function () {
                $('.login-box').toggleClass('flipped');
                return false;
            });
        }, 250));
    }

    componentDidUpdate() {
        if (this.props.system && this.props.system.user) {
            const role = this.props.system.user.role.trim().toLowerCase();
            this.props.history.push('/' + role);
        }
    }

    onLogin(e) {
        e.preventDefault();
        const data = { email: $('#loginEmail').val(), password: $('#loginPassword').val() };
        this.props.login(data, response => {
            this.setState({ loginError: response.error ? 'Email hoặc mật khẩu không đúng!' : '' })
        });
    }

    render() {
        return [
            <section key={0} className='material-half-bg'>
                <div className='cover' />
            </section>,
            <section key={1} className='login-content'>
                <div className='logo'>
                    <h1>PTCHC</h1>
                </div>
                <div className='login-box'>
                    <form className='login-form' onSubmit={this.onLogin}>
                        <h3 className='login-head'>
                            <i className='fa fa-lg fa-fw fa-user' />Đăng nhập
                        </h3>
                        <div className='form-group'>
                            <label className='control-label'>Email</label>
                            <input className='form-control' type='text' placeholder='Email' id='loginEmail' autoFocus />
                        </div>
                        <div className='form-group'>
                            <label className='control-label'>Mật khẩu</label>
                            <input className='form-control' type='password' placeholder='Password' id='loginPassword' />
                        </div>
                        <div className='form-group btn-container'>
                            <p style={{ color: 'red' }}>{this.state.loginError}</p>
                            <button className='btn btn-primary btn-block'>
                                <i className='fa fa-sign-in fa-lg fa-fw' />Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        ];
    }
}

const mapStateToProps = state => ({ system: state.system });
export default connect(mapStateToProps, { login })(LoginPage);