import React from 'react';
import { getSystemEmails, saveSystemEmails } from './redux/system.jsx'
import { Link } from 'react-router-dom';
import Editor from './CkEditor4.jsx';

class EmailItem extends React.Component {
    constructor(props) {
        super(props);

        this.title = React.createRef();
        this.editor = React.createRef();
    }

    set(title, text, html) {
        this.title.current.value = title;
        this.editor.current.html(html);
    }

    get() {
        return {
            title: this.title.current.value,
            text: this.editor.current.text(),
            html: this.editor.current.html(),
        }
    }

    render() {
        const className = this.props.active ? 'tab-pane fade active show' : 'tab-pane fade';
        return (
            <div className={className} id={this.props.id}>
                <div className='tile-body'>
                    <div className='form-group'>
                        <label className='control-label'>Subject</label>
                        <input className='form-control' type='text' defaultValue='' ref={this.title} placeholder='Subject' />
                    </div>
                    <div className='form-group'>
                        <label className='control-label'>HTML</label>
                        <small className='form-text text-muted'>Parameters: {this.props.params}</small>
                        <Editor ref={this.editor} placeholder='Nội dung email' />
                    </div>
                </div>
            </div>
        );
    }
}

export default class EmailPage extends React.Component {
    constructor(props) {
        super(props);
        this.emailContact = React.createRef();

        this.save = this.save.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(3);

            getSystemEmails(data => {
                this.emailContact.current.set(data.emailContactTitle, data.emailContactText, data.emailContactHtml);
            });
        });
    }

    save() {
        const emailType = $('ul.nav.nav-tabs li.nav-item a.nav-link.active').attr('href').substring(1);
        const email = this[emailType].current.get();
        saveSystemEmails(emailType, email);
    }

    render() {
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-cog' /> Email</h1>
                        <p></p>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Email</li>
                    </ul>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <div className='tile'>
                            <ul className='nav nav-tabs'>
                                <li className='nav-item'>
                                    <a className='nav-link active' data-toggle='tab' href='#emailContact'>Contact email</a>
                                </li>
                            </ul>
                            <div className='tab-content' style={{ marginTop: '12px' }}>
                                <EmailItem ref={this.emailContact} id='emailContact' active={true} params='{name}, {firstname}, {lastname}, {subject}, {message}' />
                            </div>

                        </div>
                    </div>
                </div>
                <button type='button' className='btn btn-primary btn-circle' style={{ position: 'fixed', right: '10px', bottom: '10px' }}
                    onClick={this.save}>
                    <i className='fa fa-lg fa-save' />
                </button>
            </main>
        );
    }
}