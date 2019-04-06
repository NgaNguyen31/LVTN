import React from 'react';
import { connect } from 'react-redux';
import CountUp from './js/countUp';

class DashboardIcon extends React.Component {
    constructor(props) {
        super(props);
        this.valueElement = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            const endValue = this.props.value ? parseInt(this.props.value) : 0;
            new CountUp(this.valueElement.current, 0, endValue, 0, 2, { separator: '.', decimal: ',' }).start();
        }, 100);
    }

    render() {
        return (
            <div className={'widget-small coloured-icon ' + this.props.type}>
                <i className={'icon fa fa-3x ' + this.props.icon} />
                <div className='info'>
                    <h4>{this.props.title}</h4>
                    <p style={{ fontWeight: 'bold' }} ref={this.valueElement} />
                </div>
            </div>
        );
    }
}

class AdminPage extends React.Component {
    componentDidMount() {
        $(document).ready(() => {
            T.selectMenu(0);
        });

        // setTimeout(() => {
        //     var data = {
        //         labels: ['January', 'February', 'March', 'April', 'May'],
        //         datasets: [{
        //             label: 'My First dataset',
        //             fillColor: 'rgba(220,220,220,0.2)',
        //             strokeColor: 'rgba(220,220,220,1)',
        //             pointColor: 'rgba(220,220,220,1)',
        //             pointStrokeColor: '#fff',
        //             pointHighlightFill: '#fff',
        //             pointHighlightStroke: 'rgba(220,220,220,1)',
        //             data: [65, 59, 80, 81, 56]
        //         }, {
        //             label: 'My Second dataset',
        //             fillColor: 'rgba(151,187,205,0.2)',
        //             strokeColor: 'rgba(151,187,205,1)',
        //             pointColor: 'rgba(151,187,205,1)',
        //             pointStrokeColor: '#fff',
        //             pointHighlightFill: '#fff',
        //             pointHighlightStroke: 'rgba(151,187,205,1)',
        //             data: [28, 48, 40, 19, 86]
        //         }]
        //     };
        //     var pdata = [{
        //         value: 300,
        //         color: '#46BFBD',
        //         highlight: '#5AD3D1',
        //         label: 'Complete'
        //     },
        //     {
        //         value: 50,
        //         color: '#F7464A',
        //         highlight: '#FF5A5E',
        //         label: 'In-Progress'
        //     }
        //     ]

        //     var ctxl = $('#lineChartDemo').get(0).getContext('2d');
        //     var lineChart = new Chart(ctxl).Line(data);

        //     var ctxp = $('#pieChartDemo').get(0).getContext('2d');
        //     var pieChart = new Chart(ctxp).Pie(pdata);
        // }, 500);
    }

    render() {
        const { numberOfUser, numberOfNews, numberOfEvent, numberOfJob, todayViews, allViews } = this.props.system ?
            this.props.system : { numberOfUser: 0, numberOfNews: 0, numberOfEvent: 0, numberOfJob: 0, todayViews: 0, allViews: 0 };
        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-dashboard' /> Dashboard</h1>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <i className='fa fa-home fa-lg' />
                        </li>
                        <li className='breadcrumb-item'>Dashboard</li>
                    </ul>
                </div>

                <div className='row'>
                    <div className='col-md-6 col-lg-3'>
                        <DashboardIcon type='primary' icon='fa-users' title='User' value={numberOfUser} />
                    </div>
                    <div className='col-md-6 col-lg-3'>
                        <DashboardIcon type='info' icon='fa-file' title='News' value={numberOfNews} />
                    </div>
                    <div className='col-md-6 col-lg-3'>
                        <DashboardIcon type='danger' icon='fa-star' title='Event' value={numberOfEvent} />
                    </div>
                    <div className='col-md-6 col-lg-3'>
                        <DashboardIcon type='warning' icon='fa-pagelines' title='Job' value={numberOfJob} />
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => ({ system: state.system });
const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(AdminPage);