import React from 'react';
import Dropdown from './Dropdown.jsx';
import Qt_boiduongPage from './Qt_boiduongPage.jsx';

export default class Qt_boiduongModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', cbcnv: []};
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.cbcnv = React.createRef();
        this.nopcc = React.createRef();
    }

    handleInput(type, field, args) {
        return e => {
            const state = this.state;
            switch (type) {
                case 'text':
                    state.text ? (state.text[field] = e.target.value)
                    : (state.text = {}) && (state.text[field] = e.target.value)
                case 'number':
                    state.number ? (state.number[field] = e.target.value) 
                    : (state.number = {}) && (state.number[field] = e.target.value)
                    
            }

            this.setState(state);
            e.preventDefault();
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#MS_NV').focus());
        }, 250));
    }

    show(item, cbcnv) {      
        
        const { _id, MS_NV, STT, TU_THANG, TU_NAM, DEN_THANG, DEN_NAM, NOI_DUNG_BD, NOI_BOI_DUONG, HINH_THUC, CHUNG_CHI, NOP_CC, GHI_CHU} = item ?
            item : { _id: null, MS_NV: '', STT: '', TU_THANG: '', TU_NAM: '', DEN_THANG: '', DEN_NAM: '', NOI_DUNG_BD: '', NOI_BOI_DUONG: '', HINH_THUC: '', CHUNG_CHI: '', NOP_CC: '', GHI_CHU: ''};
        $('#MS_NV').val(MS_NV);
        $('#STT').val(STT);
        $('#TU_THANG').val(TU_THANG);
        $('#TU_NAM').val(TU_NAM);
        $('#DEN_THANG').val(DEN_THANG);
        $('#DEN_NAM').val(DEN_NAM);
        $('#NOI_DUNG_BD').val(NOI_DUNG_BD);
        $('#NOI_BOI_DUONG').val(NOI_BOI_DUONG);
        $('#HINH_THUC').val(HINH_THUC);
        $('#CHUNG_CHI').val(CHUNG_CHI);
        $('#NOP_CC').val(NOP_CC);
        $('#GHI_CHU').val(GHI_CHU);
        this.setState({ _id, cbcnv: cbcnv? cbcnv: []});

        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const cbcnv = this.cbcnv.current.getSelectedItem(), 
            nopcc = this.nopcc.current.getSelectedItem(),
            MS_NV = cbcnv? cbcnv : [],
            NOP_CC = nopcc ? nopcc : [],
             changes = {
                MS_NV,
                STT: this.state.number.STT, 
                TU_THANG: this.state.number.TU_THANG,  
                TU_NAM: this.state.number.TU_NAM,  
                DEN_THANG: this.state.number.DEN_THANG,  
                DEN_NAM: this.state.number.DEN_NAM,  
                NOI_DUNG_BD: this.state.text.NOI_DUNG_BD, 
                NOI_BOI_DUONG: this.state.text.NOI_BOI_DUONG, 
                HINH_THUC: this.state.text.HINH_THUC,      
                CHUNG_CHI: this.state.text.CHUNG_CHI,      
                NOP_CC,      
                GHI_CHU: this.state.text.GHI_CHU,      
            };    
        if (!changes.MS_NV) {
            T.notify('MSNV đang trống!', 'danger');
            $('#MS_NV').focus();
        } else if (!changes.STT) {
            T.notify('STT đang trống!', 'danger');
            $('#STT').focus();
        } else if (!changes.NOI_DUNG_BD) {
            T.notify('Nội dung bồi dưỡng đang trống!', 'danger');
            $('#NOI_DUNG_BD').focus();
        } else if (!changes.NOI_BOI_DUONG) {
            T.notify('Nơi bồi dưỡng đang trống!', 'danger');
            $('#NOI_BOI_DUONG').focus();
        } else if (this.state._id) {
            this.props.updateQt_boiduong(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {            
            this.props.createQt_boiduong(changes, data => {                           
                $(this.modal.current).modal('hide');
                
            });
        }
    }

    render() {
        const cbcnv = this.state && this.state.cbcnv && this.state.cbcnv.cbcnv?this.state.cbcnv.cbcnv : [];
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin quản trị bồi dưỡng</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>                                                       
                            <div className='form-group'>
                                <label htmlFor='MS_NV'>MSNV</label>
                                <Dropdown ref={this.cbcnv} text='' items={cbcnv.map(e => Object.assign({}, e, {text: e.MS_NV}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='STT'>STT</label>
                                <input className='form-control' id='STT' type='number' placeholder='' onChange={this.handleInput('number', 'STT')} value={this.state.number.STT}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='TU_THANG'>Từ tháng</label>
                                <input className='form-control' id='TU_THANG' type='number' placeholder='' onChange={this.handleInput('number', 'TU_THANG')} value={this.state.number.TU_THANG}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='TU_NAM'>Từ năm</label>
                                <input className='form-control' id='TU_NAM' type='number' placeholder='' onChange={this.handleInput('number', 'TU_NAM')} value={this.state.number.TU_NAM}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='DEN_THANG'>Đến tháng</label>
                                <input className='form-control' id='DEN_THANG' type='number' placeholder='' onChange={this.handleInput('number', 'DEN_THANG')} value={this.state.number.DEN_THANG}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='DEN_NAM'>Đến năm</label>
                                <input className='form-control' id='DEN_NAM' type='number' placeholder='' onChange={this.handleInput('number', 'DEN_NAM')} value={this.state.number.DEN_NAM}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NOI_DUNG_BD'>Nội dung bài dưỡng</label>
                                <input className='form-control' id='NOI_DUNG_BD' type='text' placeholder='' onChange={this.handleInput('text', 'NOI_DUNG_BD')} value={this.state.text.NOI_DUNG_BD}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='NOI_BOI_DUONG'>Nơi bồi dưỡng</label>
                                <input className='form-control' id='NOI_BOI_DUONG' type='text' placeholder='' onChange={this.handleInput('text', 'NOI_BOI_DUONG')} value={this.state.text.NOI_BOI_DUONG}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='HINH_THUC'>Hình thức</label>
                                <input className='form-control' id='HINH_THUC' type='text' placeholder='' onChange={this.handleInput('text', 'HINH_THUC')} value={this.state.text.HINH_THUC}/>
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='CHUNG_CHI'>Chứng chỉ</label>
                                <input className='form-control' id='CHUNG_CHI' type='text' placeholder='' onChange={this.handleInput('text', 'CHUNG_CHI')} value={this.state.text.CHUNG_CHI}/>
                            </div>    
                            <div className='form-group'>
                                <label htmlFor='NOP_CC'>Nộp chứng chỉ</label>
                                <Dropdown ref={this.nopcc} text='' items={T.nopccs} />
                            </div> 
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU'>Ghi chú</label>
                                <input className='form-control' id='GHI_CHU' type='text' placeholder='' onChange={this.handleInput('text', 'GHI_CHU')} value={this.state.text.GHI_CHU}/>
                            </div>                         
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                            <button type='button' className='btn btn-primary' ref={this.btnSave} onClick={this.save}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}