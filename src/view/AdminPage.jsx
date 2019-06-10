import React from 'react';
import { connect } from 'react-redux';
import CountUp from './js/countUp';
import Highcharts from 'highcharts';
import {getcountCbcnv} from './redux/cbcnv.jsx';
import {getcountCb_nngoai} from './redux/cb_nngoai.jsx';
import {Pie} from 'react-chartjs-2';

class DashboardIcon extends React.Component {
    constructor(props) {
        super(props);
        this.valueElement = React.createRef();
        this.state = {cb_nngoai:0, cbcnv:0};
    }

    componentDidMount() {
        setTimeout(() => {
            const endValue = this.props.value ? parseInt(this.props.value) : 0;
            new CountUp(this.valueElement.current, 0, endValue, 0, 2, { separator: '.', decimal: ',' }).start();
        }, 100);
        // this.props.getcountCb_nngoai(cb_nngoai => this.setState(cb_nngoai));
        // this.props.getcountCbcnv(cbcnv => this.setState(cbcnv));
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
        console.log(this.props);
        const data = {
            labels: [
                'ABC',
                'DEF',
                'XYZ'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };    
        
        const { numberOfUser,numberOfCb_nngoai, numberOfNews, numberOfEvent, numberOfJob, todayViews, allViews } = this.props.system ?
            this.props.system : { numberOfUser: 0,numberOfCb_nngoai: 0, numberOfNews: 0, numberOfEvent: 0, numberOfJob: 0, todayViews: 0, allViews: 0 };
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
                        <DashboardIcon type='primary' icon='fa-users' title='Người dùng' value={numberOfUser} />
                    </div>
                    <div className='col-md-6 col-lg-3'>
                        <DashboardIcon type='info' icon='fa-file' title='CB NNgoài' value={numberOfCb_nngoai} />
                    </div>

                    <div className='col-12'>
                        <Pie data={data}/>
                    </div>
                    {/* <div id="atmospheric-composition">
                
                    </div> */}
                    {/* <div className='col-md-6 col-lg-3'>
                        <DashboardIcon type='info' icon='fa-file' title='News' value={numberOfNews} />
                    </div>
                    <div className='col-md-6 col-lg-3'>
                        <DashboardIcon type='danger' icon='fa-star' title='Event' value={numberOfEvent} />
                    </div>
                    <div className='col-md-6 col-lg-3'>
                        <DashboardIcon type='warning' icon='fa-pagelines' title='Job' value={numberOfJob} />
                    </div> */}
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => ({ system: state.system, cbcnv: state.cbcnv, cb_nngoai: state.cb_nngoai });
const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(AdminPage);