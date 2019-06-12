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
            $(this.modal.current).on('shown.bs.modal', () => $('#tenbomon').focus());
        }, 250));
    }

    show(item, khoa) {                      
        const { _id, TEN_BM, TEN_TIENG_ANH, MS_KHOA, NAM_THANH_LAP, GHI_CHU } = item ?
            item : { _id: null, TEN_BM: null, TEN_TIENG_ANH: null, MS_KHOA: null, NAM_THANH_LAP: null, GHI_CHU: null };     
        $('#TEN_BM').val(TEN_BM);
        $('#TEN_TIENG_ANH').val(TEN_TIENG_ANH);
        MS_KHOA ? $('#MS_KHOA').val(MS_KHOA).map(ele => ele.TEN_KHOA) : null;
        $('#NAM_THANH_LAP').val(T.dateToText(NAM_THANH_LAP,'yyyy-mm-dd'));
        $('#GHI_CHU').val(GHI_CHU);
               
        console.log('selected ${MS_KHOA}');
        
        
        this.setState({ _id, khoa: khoa? khoa: []}); 
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const khoa = this.state.selectedOption.map(ele => ele.value._id),
        MS_KHOA = khoa,
             changes = {
                TEN_BM: this.state.text.TEN_BM,
                TEN_TIENG_ANH: this.state.text.TEN_TIENG_ANH,
                MS_KHOA,
                NAM_THANH_LAP: this.state.text.NAM_THANH_LAP,
                GHI_CHU: this.state.text.GHI_CHU,
            };   
                     
        if (changes.TEN_BM == '') {
            T.notify('Tên bộ môn đang trống!', 'danger');
            $('#TEN_BM').focus();
        } else if (changes.TEN_TIENG_ANH == '') {
            T.notify('Tên tiếng anh đang trống!', 'danger');
            $('#TEN_TIENG_ANH').focus();
        } else if (changes.MS_KHOA == '') {
            T.notify('Mã số khoa đang trống!', 'danger');
            $('#MS_KHOA').focus();
        } else if (changes.NAM_THANH_LAP == '') {
            T.notify('Năm thành lập đang trống!', 'danger');
            $('#NAM_THANH_LAP').focus();
        } else if (this.state._id) {
            this.props.updateBomon(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createBomon(changes, data => {                
                $(this.modal.current).modal('hide');
                
            });
        }
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
                                <input className='form-control' id='TEN_BM' type='text' placeholder='Tên bộ môn' onChange={this.handleInput('text', 'TEN_BM')} value={this.state.text.TEN_BM}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenbomon'>Tên tiếng anh</label>
                                <input className='form-control' id='TEN_TIENG_ANH' type='text' placeholder='Tên tiếng anh' onChange={this.handleInput('text', 'TEN_TIENG_ANH')} value={this.state.text.TEN_TIENG_ANH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenbomon'>Tên khoa</label>
                                <Select
                                isMulti
                                value = {selectedOption}
                                onChange =  {this.handleInput('tenkhoa')}
                                options = {khoa.map(e => Object.assign({}, {label: e.TEN_KHOA, value: e}))}
                                />
                                {/* <Dropdown ref={this.khoa} number='' items={khoa.map(e => Object.assign({}, e, {text: e.TEN_KHOA}))} /> */}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenbomon'>Năm thành lập</label>
                                <input className='form-control' id='NAM_THANH_LAP' type='date' placeholder='Năm thành lập' onChange={this.handleInput('text', 'NAM_THANH_LAP')} value={this.state.text.NAM_THANH_LAP}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tenbomon'>Ghi chú</label>
                                <input className='form-control' id='GHI_CHU' type='text' placeholder='Ghi chú' onChange={this.handleInput('text', 'GHI_CHU')} value={this.state.text.GHI_CHU}/>
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