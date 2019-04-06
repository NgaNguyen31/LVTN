import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(1);
        });
    }

    render() {
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-cog' /> Settings</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Settings</li>
                    </ul>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => ({ system: state.system });
const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(SettingsPage);