import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_gtrinhPage from './Qt_gtrinhPage.jsx';
import Select from 'react-select';

export default class Qt_gtrinhModal extends React.Component {
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
                    : (state.text = {}) && (state.text[field] = e.target.value);
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
                    break;        
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
        
        const { _id, MS_NV, STT, G_Trinh, NamXB, NhaXB} = item ?
            item : { _id: null, MS_NV: null, STT: null, G_Trinh: null, NamXB: null, NhaXB: null};
        $('#MS_NV').val(MS_NV);
        // $('#STT').val(STT);
        $('#G_Trinh').val(G_Trinh);
        $('#NamXB').val(T.dateToText(NamXB,'yyyy-mm-dd'));
        $('#NhaXB').val(NhaXB);

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
             changes = {
                MS_NV,
                // STT: this.state.number.STT, 
                G_Trinh: this.state.text.G_Trinh, 
                NamXB: this.state.date.NamXB, 
                NhaXB: this.state.text.NhaXB };
        if (changes.MS_NV == null) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.G_Trinh == null) {
            T.notify('Giáo trình đang trống!', 'danger');
            $('#G_Trinh').focus();
        } else if (changes.NamXB == null) {
            T.notify('Năm XB đang trống!', 'danger');
            $('#NamXB').focus();
        } else if (changes.STT < 0) {
            T.notify('STT không được là số âm', 'danger');
            $('#STT').focus();
        } else if (this.state._id) {
            this.props.updateQt_gtrinh(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_gtrinh(changes, data => {                    
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
                            <h5 className='modal-title'>Thông tin quản trị giáo trình</h5>
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
                            {/* <div className='form-group'>
                                <label htmlFor='STT'>STT</label>
                                <input className='form-control' id='STT' type='number' placeholder='' onChange={this.handleInput('number', 'STT')} value={this.state.number.STT}/>
                            </div>  */}
                            <div className='form-group'>
                                <label htmlFor='G_Trinh'>Giáo trình</label>
                                <input className='form-control' id='G_Trinh' type='text' onChange={this.handleInput('text', 'G_Trinh')} value={this.state.text.G_Trinh}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NamXB'>Năm XB</label>
                                <input className='form-control' id='NamXB' type='date' onChange={this.handleInput('date', 'NamXB')} value={this.state.date.NamXB}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NhaXB'>Nhà XB</label>
                                <input className='form-control' id='NhaXB' type='text' onChange={this.handleInput('text', 'NhaXB')} value={this.state.text.NhaXB}/>
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