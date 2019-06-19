import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_tnghiemPage from './Qt_tnghiemPage.jsx';
import Select from 'react-select';

export default class Qt_tnghiemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', cbcnv: [], selectedcbcnv: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.selectedcbcnv = React.createRef();
    }

    handleInput(type, field, args) {
        return e => {
            const state = this.state;
            switch (type) {
                case 'text':
                    state.text ? (state.text[field] = e.target.value)
                    : (state.text = {}) && (state.text[field] = e.target.value)
                    e.preventDefault();
                    break;
                case 'number':
                    state.number ? (state.number[field] = e.target.value) 
                    : (state.number = {}) && (state.number[field] = e.target.value);
                    e.preventDefault();
                    break;
                case 'date':
                    state.date ? (state.date[field] = e.target.value)
                    : (state.date = {}) && (state.date[field] = e.target.value)
                    e.preventDefault();
                    break;         
                case 'cbcnv':
                    state.selectedcbcnv = e;     
            }

            this.setState(state);
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#MS_NV').focus());
        }, 250));
    }

    show(item, cbcnv) {      
        
        const { _id, MS_NV, STT, BAI_TN, NAM} = item ?
            item : { _id: null, MS_NV: null, STT: null, BAI_TN: null, NAM: null};
        $('#MS_NV').val(MS_NV);
        // $('#STT').val(STT);
        $('#BAI_TN').val(BAI_TN);
        $('#NAM').val(T.dateToText(NAM,'yyyy-mm-dd'));
        this.setState({ _id, cbcnv: cbcnv? cbcnv: []});
        let cbcnvLabel = MS_NV ? ({value: MS_NV._id,label: MS_NV.MS_NV}): null;        
        this.setState({selectedcbcnv: cbcnvLabel});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const 
            cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value : null,
            MS_NV = cbcnv,
            abc = this.state.text.BAI_TN,
            BAI_TN = abc ? abc.toLowerCase() : null,
             changes = {
                MS_NV,
                // STT: this.state.number.STT, 
                BAI_TN,
                NAM: this.state.date.NAM,
            };   
            
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.BAI_TN == '') {
            T.notify('Bài TN đang trống!', 'danger');
            $('#BAI_TN').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
        } else if (this.state._id) {
            this.props.updateQt_tnghiem(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_tnghiem(changes, data => {                    
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv?this.state.cbcnv.cbcnv : [];
        const selectedcbcnv = this.state.selectedcbcnv;

        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin quản trị thí nghiệm</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>                                                       
                            <div className='form-group'>
                                <label htmlFor='MS_NV'>MSNV</label>
                                <Select
                                value = {selectedcbcnv}
                                onChange =  {this.handleInput('cbcnv')}
                                options = {cbcnv.map(e => Object.assign({}, {label: e.MS_NV, value: e}))}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='BAI_TN'>Bài TN</label>
                                <input className='form-control' id='BAI_TN' type='text' onChange={this.handleInput('text', 'BAI_TN')} value={this.state.text.BAI_TN}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NAM'>Năm</label>
                                <input className='form-control' id='NAM' type='date' onChange={this.handleInput('date', 'NAM')} value={this.state.date.NAM}/>
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