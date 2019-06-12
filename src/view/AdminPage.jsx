import React from 'react';
import { connect } from 'react-redux';
import CountUp from './js/countUp';
import Highcharts from 'highcharts';
import { getcountCbcnv } from './redux/cbcnv.jsx';
import { getcountCb_nngoai } from './redux/cb_nngoai.jsx';
import { Pie } from 'react-chartjs-2';

class DashboardIcon extends React.Component {
    constructor(props) {
        super(props);
        this.valueElement = React.createRef();
        this.state = { cb_nngoai: 0, cbcnv: 0 };
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

        const { numberOfUser, numberOfDKKLGD, numberOfCBNNHĐVTT, numberOfCBCNVHDK, numberOfCBCNVNam, numberOfCBCNVNu, numberOfCBNN, numberOfCH, numberOfTSKH, numberOfCD, numberOfKS, numberOfKHAC, numberOfTC, numberOfTS } = this.props.system ?
            this.props.system : { numberOfUser: 0, numberOfCBNN: 0, numberOfDKKLGD: 0, numberOfCBNNHĐVTT: 0, numberOfCBCNVHDK: 0, numberOfCBCNVNu: 0, numberOfCBCNVNam: 0, numberOfCH: 0, numberOfTSKH: 0, numberOfCD: 0, numberOfKS: 0, numberOfKHAC: 0, numberOfTC: 0, numberOfTS: 0 };

        const cnvNamNu = {
            labels: [
                'Cán bộ công nhân viên nam',
                'Cán bộ công nhân viên nữ',
            ],
            datasets: [{
                data: [numberOfCBCNVNam, numberOfCBCNVNu],
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384'
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FF6384'
                ]
            }]
        };

        const cnvTrongNgoai = {
            labels: [
                'Cán bộ công nhân viên nước ngoài',
                'Cán bộ công nhân viên trong nước',
            ],
            datasets: [{
                data: [numberOfCBNN, numberOfCBCNVNam + numberOfCBCNVNu - numberOfCBNN],
                backgroundColor: [
                    '#33ff05',
                    '#f7df03'
                ],
                hoverBackgroundColor: [
                    '#33ff05',
                    '#f7df03'
                ]
            }]
        }

        const cnvKhoaTutra = {
            labels: [
                'Cán bộ công nhân viên hợp đồng đơn vị tự trả',
                'Cán bộ công nhân viên hợp đồng khoa',
            ],
            datasets: [{
                data: [numberOfCBNNHĐVTT, numberOfCBCNVHDK],
                backgroundColor: [
                    '#33ff05',
                    '#f7df03'
                ],
                hoverBackgroundColor: [
                    '#33ff05',
                    '#f7df03'
                ]
            }]
        }

        const hocvi = {
            labels: [
                'Tiến sĩ khoa học',
                'Tiến sĩ',
                'Thạc sĩ',
                'Kĩ sư',
                'Cao đẳng',
                'Trung cấp',
                'Khác',                
            ],
            datasets: [{
                data: [numberOfCBCNVNam + numberOfCBCNVNu - numberOfTSKH, numberOfCBCNVNam + numberOfCBCNVNu - numberOfCH, numberOfCBCNVNam + numberOfCBCNVNu - numberOfCD, numberOfCBCNVNam + numberOfCBCNVNu - numberOfKS, numberOfCBCNVNam + numberOfCBCNVNu - numberOfKHAC, numberOfCBCNVNam + numberOfCBCNVNu - numberOfTS, numberOfCBCNVNam + numberOfCBCNVNu - numberOfTC],
                backgroundColor: [
                    '#33ff05',
                    '#f7df03',
                    '#36A2EB',
                    '#FF6384',
                    '#99FF33',
                    '#FF6600',
                    '#000011'
                ],
                hoverBackgroundColor: [
                    '#33ff05',
                    '#f7df03',
                    '#36A2EB',
                    '#FF6384',
                    '#99FF33',
                    '#FF6600',
                    '#000011'
                ]
            }]
        }

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
                        <DashboardIcon type='info' icon='fa-file' title='Đăng kí giảng dạy' value={numberOfDKKLGD} />
                    </div>

                </div>

                <div className='row'>
                    <div className='tile col-md-6 col-lg-4 ml-3'>
                        <div className=''>
                            <Pie data={cnvNamNu} />
                        </div>
                    </div>
                    <div className='tile col-md-6 col-lg-4 ml-3'>
                        <div className=''>
                            <Pie data={cnvTrongNgoai} />
                        </div>
                    </div>
                    <div className='tile col-md-6 col-lg-4 ml-3'>
                        <div className=''>
                            <Pie data={cnvKhoaTutra} />
                        </div>
                    </div>
                    <div className='tile col-md-6 col-lg-4 ml-3'>
                        <div className=''>
                            <Pie data={hocvi} />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => ({ system: state.system, cbcnv: state.cbcnv, cb_nngoai: state.cb_nngoai });
const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(AdminPage);