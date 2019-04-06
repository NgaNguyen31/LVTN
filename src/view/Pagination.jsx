import React from 'react';
import Dropdown from './Dropdown.jsx';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.modal = React.createRef();

        this.pageNumberChanged = this.pageNumberChanged.bind(this);
        this.pageSizeChanged = this.pageSizeChanged.bind(this);
    }

    pageNumberChanged(e, pageNumber) {
        this.props.getPage(pageNumber, null);
        e.preventDefault();
    }
    pageSizeChanged(pageSize) {
        this.props.getPage(null, pageSize);
    }

    render() {
        let pageItems = [], firstButton = '', lastButton = '';
        if (this.props.pageTotal > 1) {
            let minPageNumber = Math.max(this.props.pageNumber - 3, 1),
                maxPageNumber = Math.min(this.props.pageNumber + 3, this.props.pageTotal);
            if (minPageNumber + 6 > maxPageNumber) {
                maxPageNumber = Math.min(minPageNumber + 6, this.props.pageTotal);
            }
            if (maxPageNumber - 6 < minPageNumber) {
                minPageNumber = Math.max(1, maxPageNumber - 6)
            }
            for (let i = minPageNumber; i <= maxPageNumber; i++) {
                pageItems.push(
                    <li key={i} className={'page-item' + (this.props.pageNumber === i ? ' active' : '')}>
                        <a className='page-link' href='#' onClick={e => this.pageNumberChanged(e, i)}>{i}</a>
                    </li>
                );
            }

            firstButton = this.props.pageNumber === 1 ?
                <li className='page-item disabled'>
                    <a className='page-link' href='#' aria-label='Previous'>
                        <span aria-hidden='true'>&laquo;</span>
                        <span className='sr-only'>Previous</span>
                    </a>
                </li> :
                <li className='page-item'>
                    <a className='page-link' href='#' aria-label='Previous' onClick={e => this.pageNumberChanged(e, 1)}>
                        <span aria-hidden='true'>&laquo;</span>
                        <span className='sr-only'>Previous</span>
                    </a>
                </li>;

            lastButton = this.props.pageNumber === this.props.pageTotal ?
                <li className='page-item disabled'>
                    <a className='page-link' href='#' aria-label='Next'>
                        <span aria-hidden='true'>&raquo;</span>
                        <span className='sr-only'>Next</span>
                    </a>
                </li> :
                <li className='page-item'>
                    <a className='page-link' href='#' aria-label='Next' onClick={e => this.pageNumberChanged(e, this.props.pageTotal)}>
                        <span aria-hidden='true'>&raquo;</span>
                        <span className='sr-only'>Next</span>
                    </a>
                </li>;
        }

        return (
            <div style={{ width: '100%', display: 'flex', position: 'fixed', bottom: '10px' }}>
                <Dropdown className='btn btn-info' text={this.props.pageSize} items={[25, 50, 100, 200]} onSelected={this.pageSizeChanged} />
                <nav style={{ marginLeft: '10px' }}>
                    <ul className='pagination' style={{ marginBottom: 0 }}>
                        {firstButton}
                        {pageItems}
                        {lastButton}
                    </ul>
                </nav>
            </div>
        );
    }
}