import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_nnguPage from './Qt_nnguPage.jsx';
import Select from 'react-select';

export default class Qt_nnguModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', cbcnv: [], ngoaingu: [], selectedcbcnv: [], selectedngoaingu: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.ngoaingu = React.createRef();
        this.selectedcbcnv = React.createRef();
        this.selectedngoaingu = React.createRef();
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
                    : (state.number = {}) && (state.number[field] = e.target.value)
                    e.preventDefault();
                    break;            
                case 'cbcnv':
                    state.selectedcbcnv = e;  
                    break;
                case 'ngoaingu':
                    state.selectedngoaingu = e;  
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

    show(item, cbcnv, ngoaingu) {      
        
        const { _id, MS_NV, N_NGU, TRINH_DO, GHI_CHU} = item ?
            item : { _id: null, MS_NV: null, N_NGU: null, TRINH_DO: null, GHI_CHU: null};
        $('#MS_NV').val(MS_NV);
        $('#N_NGU').val(N_NGU);
        $('#TRINH_DO').val(TRINH_DO);
        $('#GHI_CHU').val(GHI_CHU);

        this.setState({ _id, cbcnv: cbcnv? cbcnv: [], ngoaingu: ngoaingu? ngoaingu: []});
        let cbcnvLabel = MS_NV ? ({value: MS_NV._id,label: MS_NV.MS_NV}): null;        
        this.setState({selectedcbcnv: cbcnvLabel});
        let ngoainguLabel = N_NGU ? ({value: N_NGU._id,label: N_NGU.N_NGU}): null;        
        this.setState({selectedngoaingu: ngoainguLabel});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const ngoaingu = this.state.selectedngoaingu ? this.state.selectedngoaingu.value : null,
        cbcnv = this.state.selectedcbcnv ? this.state.selectedcbcnv.value._id : null,
        N_NGU = ngoaingu,
        MS_NV = cbcnv,
             changes = {
                MS_NV,
                N_NGU, 
                TRINH_DO: this.state.text.TRINH_DO, 
                GHI_CHU: this.state.text.GHI_CHU,                             };    
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (changes.N_NGU == null) {
            T.notify('Ngoại ngữ đang trống!', 'danger');
            $('#N_NGU').focus();
        } else if (changes.TRINH_DO == null) {
            T.notify('Trình độ đang trống!', 'danger');
            $('#TRINH_DO').focus();
        } else if (this.state._id) {
            this.props.updateQt_nngu(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_nngu(changes, data => {                    
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv ? this.state.cbcnv.cbcnv : [];
        const ngoaingu = this.state && this.state.ngoaingu && this.state.ngoaingu.ngoaingu ? this.state.ngoaingu.ngoaingu : [];
        const selectedcbcnv = this.state.selectedcbcnv;
        const selectedngoaingu = this.state.selectedngoaingu;
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin quản trị ngoại ngữ</h5>
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
                                <label htmlFor='N_NGU'>Ngoại ngữ</label>
                                <Select
                                value = {selectedngoaingu}
                                onChange =  {this.handleInput('ngoaingu')}
                                options = {ngoaingu.map(e => Object.assign({}, {label: e.N_NGU, value: e}))}
                                />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='TRINH_DO'>Trình độ</label>
                                <input className='form-control' id='TRINH_DO' type='text' placeholder='' onChange={this.handleInput('text', 'TRINH_DO')} value={this.state.text.TRINH_DO}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU'>Ghi chú</label>
                                <input className='form-control' id='GHI_CHU' type='text' placeholder='' onChange={this.handleInput('text', 'GHI_CHU')} value={this.state.text.GHI_CHU}/>
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