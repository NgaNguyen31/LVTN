import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category.jsx';

export default class NewsCategoryPage extends React.Component {
    componentDidMount() {
        $(document).ready(() => T.selectMenu(5, 0));
    }

    render() {
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-file' /> News Category</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>News Category</li>
                    </ul>
                </div>
                <Category type='news' uploadType='newsCategoryImage' />
            </main>
        );
    }
}