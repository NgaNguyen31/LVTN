import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category.jsx';

export default class JobCategoryPage extends React.Component {
    componentDidMount() {
        $(document).ready(() => T.selectMenu(7, 0));
    }

    render() {
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-pagelines' /> Job Category</h1>
                        <p></p>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/admin'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Job Category</li>
                    </ul>
                </div>
                <Category type='job' uploadType='jobCategoryImage' />
            </main>
        );
    }
}