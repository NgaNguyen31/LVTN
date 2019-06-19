import React from 'react';
import Dropdown from './Dropdown.jsx';
import Select from 'react-select';
import BomonPage from './BomonPage.jsx';

export default class BomonModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', khoa: [], selectedOption: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.khoa = React.createRef();
        this.selectedOption = React.createRef();
    }

    handleInput(type, field, args) {
        return e => {
            const state = this.state;
            switch (type) {
                case 'text':
                    state.text ? (state.text[field] = e.target.value)
                    : (state.text = {}) && (state.text[field] = e.target.value);
                    e.preventDefault();
                    break;
                case 'date':
                    state.date ? (state.date[field] = e.target.value)
                    : (state.date = {}) && (state.date[field] = e.target.value);
                    e.preventDefault();
                    break;
                case 'tenkhoa':
                    state.selectedOption = e;
            }

            this.setState(state);
            
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#ten_bm').focus());
        }, 250));
    }

    show(item, khoa) {                              
        const { _id, ten_bm, ten_tieng_anh, ms_khoa, nam_thanh_lap, ghi_chu } = item ?
            item : { _id: null, ten_bm: null, ten_tieng_anh: null, ms_khoa: null, nam_thanh_lap: null, ghi_chu: null };     
        $('#ten_bm').val(ten_bm);
        $('#ten_tieng_anh').val(ten_tieng_anh);
        $('#ms_khoa').val(ms_khoa);
        $('#nam_thanh_lap').val(nam_thanh_lap);
        $('#ghi_chu').val(ghi_chu);   
        this.setState({ _id, khoa: khoa? khoa: []}); 
        let khoaLabel = ms_khoa ? ms_khoa.map((test) => ({value: test._id,label: test.ten_khoa})): null;
        this.setState({selectedOption: khoaLabel});
        $(this.modal.current).modal('show');
    }

    save(e) {
        const khoa = this.state.selectedOption? this.state.selectedOption.map(ele => ele.value): null,
            ms_khoa = khoa,
             changes = {
                ten_bm: this.state.text.ten_bm,
                ten_tieng_anh: this.state.text.ten_tieng_anh,
                ms_khoa,
                nam_thanh_lap: this.state.text.nam_thanh_lap,
                ghi_chu: this.state.text.ghi_chu,
            };   
        if (ten_bm.value == '') {
            T.notify('Tên bộ môn đang trống!', 'danger');
            $('#ten_bm').focus();
        } else if (ten_tieng_anh.value == '') {
            T.notify('Tên tiếng anh đang trống!', 'danger');
            $('#ten_tieng_anh').focus();
        } else if (changes.ms_khoa == '') {
            T.notify('Mã số khoa đang trống!', 'danger');
            $('#ms_khoa').focus();
        } else if (this.state._id) {
            this.props.updateBomon(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createBomon(changes, data => {                
                $(this.modal.current).modal('hide');
                
            });
        }
        e.preventDefault();

    }

    render() {
        // console.log(this.state, this.props);
        const khoa = this.state && this.state.khoa ? this.state.khoa:[];
        // console.log(khoa);
        
        const selectedOption = this.state.selectedOption;
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin bộ môn</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='tenbomon'>Tên bộ môn</label>
                                <input className='form-control' id='ten_bm' type='text' onChange={this.handleInput('text', 'ten_bm')} value={this.state.text.ten_bm}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenbomon'>Tên tiếng anh</label>
                                <input className='form-control' id='ten_tieng_anh' type='text' onChange={this.handleInput('text', 'ten_tieng_anh')} value={this.state.text.ten_tieng_anh}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenbomon'>Tên khoa</label>
                                <Select
                                isMulti
                                value = {selectedOption}
                                onChange =  {this.handleInput('tenkhoa')}
                                options = {khoa.map(e => Object.assign({}, {label: e.ten_khoa, value: e}))}
                                />
                                {/* <Dropdown ref={this.khoa} number='' items={khoa.map(e => Object.assign({}, e, {text: e.ten_khoa}))} /> */}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenbomon'>Năm thành lập</label>
                                <input className='form-control' id='nam_thanh_lap' type='text' onChange={this.handleInput('text', 'nam_thanh_lap')} value={this.state.text.nam_thanh_lap}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenbomon'>Ghi chú</label>
                                <input className='form-control' id='ghi_chu' type='text' onChange={this.handleInput('text', 'ghi_chu')} value={this.state.text.ghi_chu}/>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Đóng</button>
                            <button type='button' className='btn btn-primary' ref={this.btnSave} onClick={this.save}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}