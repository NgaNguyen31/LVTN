import React from 'react';
import { connect } from 'react-redux';
import { updateProfile } from './redux/system.jsx'
import { Link } from 'react-router-dom';
import ImageBox from './ImageBox.jsx';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveProfile = this.saveProfile.bind(this);

        this.firstname = React.createRef();
        this.lastname = React.createRef();
        this.email = React.createRef();
        this.phoneNumber = React.createRef();
        this.password1 = React.createRef();
        this.password2 = React.createRef();
        this.imageBox = React.createRef();
    }

    componentDidMount() {
        $(document).ready(() => {
            setTimeout(() => {
                if (this.props.system && this.props.system.user) {
                    const image = this.props.system.user.image ? this.props.system.user.image : '/img/avatar.jpg';
                    this.setState({ image });
                }
            }, 500);
        });
    }

    saveProfile() {
        const firstname = $(this.firstname.current).val().trim(),
            lastname = $(this.lastname.current).val().trim(),
            email = $(this.email.current).val().trim(),
            phoneNumber = $(this.phoneNumber.current).val().trim();
        if (firstname == '') {
            T.notify('Your firstname is empty!', 'danger');
            $(this.firstname.current).focus();
        } else if (lastname == '') {
            T.notify('Your lastname is empty!', 'danger');
            $(this.lastname.current).focus();
        } else if (email == '') {
            T.notify('Your email is empty!', 'danger');
            $(this.email.current).focus();
        } else {
            this.props.updateProfile({ firstname, lastname, email, phoneNumber });
        }
    }

    render() {
        const { firstname, lastname, email, phoneNumber } = this.props.system && this.props.system.user ?
            this.props.system.user : { firstname: '', lastname: '', email: '', phoneNumber: '' };

        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-user' /> Profile</h1>
                        <p></p>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Profile</li>
                    </ul>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='tile'>
                            <h3 className='tile-title'>Common information</h3>
                            <div className='tile-body'>
                                <div className='form-group'>
                                    <label className='control-label'>Firstname</label>
                                    <input className='form-control' type='text' placeholder='Firstname' ref={this.firstname} defaultValue={firstname} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Lastname</label>
                                    <input className='form-control' type='text' placeholder='Lastname' ref={this.lastname} defaultValue={lastname} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Email</label>
                                    <input className='form-control' type='email' placeholder='Email' ref={this.email} defaultValue={email} />
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>Phone number</label>
                                    <input className='form-control' type='text' placeholder='Phone number' ref={this.phoneNumber} defaultValue={phoneNumber} />
                                </div>
                            </div>
                            <div className='tile-footer' style={{ textAlign: 'right' }}>
                                <button className='btn btn-primary' type='button' onClick={this.saveProfile}>Save</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='tile'>
                            <h3 className='tile-title'>Avatar</h3>
                            <div className='tile-body'>
                                <div className='form-group'>
                                    <ImageBox ref={this.imageBox} postUrl='/admin/upload' uploadType='ProfileImage' userData='profile' image={this.state.image} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => ({ system: state.system });
const mapActionsToProps = { updateProfile };
export default connect(mapStateToProps, mapActionsToProps)(ProfilePage);