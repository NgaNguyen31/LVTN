import React from 'react';
import Dropdown from './Dropdown.jsx';
import CbcnvPage from './CbcnvPage.jsx';

export default class CbcnvModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', number: '', date: '', boolean :'', nghi_ctac: [], loai: [], pctn_nghe_2018: [], chucdanh: [], trinhdo:[], ngach:[], chucvu: [], bomon: [] , dantoc: [], tongiao: [], benhvien: []}
        this.modal = React.createRef();
        this.show = this.show.bind(this);
        this.save = this.save.bind(this);
        this.modal = React.createRef();
        this.btnSave = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.nghi_ctac = React.createRef();
        this.loai = React.createRef();
        this.pctn_nghe_2018 = React.createRef();
        this.chucdanh = React.createRef();
        this.trinhdo = React.createRef();
        this.ngach = React.createRef();
        this.chucvu = React.createRef();
        this.bomon = React.createRef();
        this.dantoc = React.createRef();
        this.tongiao = React.createRef();
        this.benhvien = React.createRef();
    }

    handleInput(type, field, args) {
        return e => {
            const state = this.state;
            switch (type) {
                case 'text':
                    state.text ? (state.text[field] = e.target.value)
                    : (state.text = {}) && (state.text[field] = e.target.value)
                case 'number':
                    state.number? (state.number[field] = e.target.value)
                    : (state.number = {}) && (state.number[field] = e.target.value)
                case 'date':
                    state.date? (state.date[field] = e.target.value)
                    : (state.date = {}) && (state.date[field] = e.target.value)
                case 'boolean':
                    state.boolean? (state.boolean[field] = e.target.value)
                    : (state.boolean ={}) && (state.boolean[field] = e.target.value)
            }

            this.setState(state);
            e.preventDefault();
        }
    }

    componentDidMount() {
        $(document).ready(() => setTimeout(() => {
            $(this.modal.current).on('shown.bs.modal', () => $('#SHCC').focus());
        }, 250));
    }

    show(item, nghi_ctac, loai, pctn_nghe_2018, chucdanh, trinhdo, ngach, chucvu, bomon, dantoc, tongiao, benhvien) {

        const { _id, NGHI,
        TAM_NGUNG,
        IS_NNGOAI,
        IN_NUOC,
        LOAI,
        SHCC,
        MS_NV,
        MS_NV_CU,
        HO,
        TEN,
        PHAI,
        NGAY_SINH,
        XA_PHUONG_NOISINH,
        QUAN_HUYEN_NOISINH,
        NOI_SINH_TINH_TP,
        NGAY_BD_CT,
        NGAY_VAO,
        NGAY_BC,
        NGAY_CBGD,
        NGAY_NGHI,
        GIAY_TT_RA_TRUONG,
        So_BHXH_LD,
        THU_BHXH,
        CHUC_DANH,
        TRINH_DO,
        NGACH,
        NGACHMOI,
        BAC_LG,
        HESO_LG,//?
        MOC_NANG_LG,
        NGAY_HUONG_LG,
        HD_KY_DEN,
        VUOT_KHUNG,
        NGAY_HUONG_VK,
        PCTN_CU,
        NGAY_PCTN_NEW,
        PCTN_NEW,
        THOI_DIEM_TANG_1,
        GHI_CHU_LG,
        TYLE_PCUD,
        CHUC_VU_BCH_DANG_BO,
        CHUC_VU_BCH_CONG_DOAN,
        CHUC_VU_BCH_DOAN_TN,
        PC_DOC_HAI,
        MOI_TRUONG_DOC_HAI,
        MS_CVU,
        TEN_CV,
        PCCV,
        NGAY_PCCV,
        NUOC_NGOAI,
        TU_NGAY_NN,
        DEN_NGAY_NN,
        NGAY_VE_THUC_TE_NN,
        TUNGAY_KOLUONG,
        DENNGAY_KOLUONG,
        NGAYTIEPNHAN_KOLUONG,
        PHUC_LOI,
        GHI_CHU_IN,
        MS_BM,
        TDO_LLCT,
        TIN_HOC,
        NGOAI_NGU,
        GHI_CHU_NOP_BANG,
        CONG_NHAN_BANG,
        CHUYEN_NGANH,
        CD,
        KS,
        CH,
        TS,
        TSKH,
        TC,
        KHAC,
        GS,
        PGS,
        GVC,
        GV,
        GVTH,
        TG,
        NVC,
        CVC,
        TG_QUANDOI,
        CAP_BAC,
        HUY_CHUONG_SNGD,
        NGND,
        NGUT,
        SO_THE,
        NGAY_DANG_DB,
        NOI_DANG_DB,
        DANG_VIEN,
        NGAY_DANG_CT,
        NOI_DANG_CT,
        DOAN_VIEN,
        NGAY_DOAN,
        NOI_DOAN,
        NOI_DKHK,
        DC_HIENTAI,
        DIEN_THOAI,
        EMAIL,
        NGUYEN_QUAN,
        SO_CMND,
        NOI_NGAYCAP,
        DANTOC,
        TON_GIAO,
        CHA_TEN,
        CHA_NAM_SINH,
        CHA_NNGHIEP,
        CHA_CONGTAC,
        ME_TEN,
        ME_NAM_SINH,
        ME_NNGHIEP,
        ME_CONGTAC,
        VC_TEN,
        VC_NAMSINH,
        VC_NNGHIEP,
        VC_CONGTAC,
        SO_SO_HK,
        HOTEN_CHU_HO_HK,
        LOAI_GIAY_TO,
        MA_TINH_BV,
        QUOC_TICH,
        TRA_THE_BHYT,
        MA_BV,
        MASO_BHXH,
        GHI_CHU_NOP_SO_BHXH,
        SO_BHXH,
        NO_PC,
        NO_DONG_BHXH,
        GHICHU_BHXH,
        NO_BHXH,
        GHICHU_KY_HIEU,
        HIEULUC_GD_HD,
        TANG,//?
        KH_TANG,
        GIAM,//?
        KH_GIAM,
        SO_QH_HD,
        NGAY_KY_QH_HD,
        NGAY_NHAP_HS,
        DONG_BHXH,
        HL_DEN_NGAY,
        DIEN_GIAI_HD } = item ?
            item : { _id: null, NGHI: '',
            TAM_NGUNG: '',
            IS_NNGOAI: '',
            IN_NUOC: '',
            LOAI: '',
            SHCC:  '',
            MS_NV: '',
            MS_NV_CU: '',
            HO: '',
            TEN: '',
            PHAI: '',
            NGAY_SINH: '',
            XA_PHUONG_NOISINH: '',
            QUAN_HUYEN_NOISINH: '',
            NOI_SINH_TINH_TP: '',
            NGAY_BD_CT: '',
            NGAY_VAO: '',
            NGAY_BC: '',
            NGAY_CBGD: '',
            NGAY_NGHI: '',
            GIAY_TT_RA_TRUONG: '',
            So_BHXH_LD: '',
            THU_BHXH: '',
            CHUC_DANH: '',
            TRINH_DO: '',
            NGACH: '',
            NGACHMOI: '',
            BAC_LG: '',
            HESO_LG: '',//?
            MOC_NANG_LG: '',
            NGAY_HUONG_LG: '',
            HD_KY_DEN: '',
            VUOT_KHUNG: '',
            NGAY_HUONG_VK: '',
            PCTN_CU: '',
            NGAY_PCTN_NEW: '',
            PCTN_NEW: '',
            THOI_DIEM_TANG_1: '',
            GHI_CHU_LG: '',
            TYLE_PCUD: '',
            CHUC_VU_BCH_DANG_BO: '',
            CHUC_VU_BCH_CONG_DOAN: '',
            CHUC_VU_BCH_DOAN_TN: '',
            PC_DOC_HAI: '',
            MOI_TRUONG_DOC_HAI: '',
            MS_CVU: '',
            TEN_CV: '',
            PCCV: '',
            NGAY_PCCV: '',
            NUOC_NGOAI: '',
            TU_NGAY_NN: '',
            DEN_NGAY_NN: '',
            NGAY_VE_THUC_TE_NN: '',
            TUNGAY_KOLUONG: '',
            DENNGAY_KOLUONG: '',
            NGAYTIEPNHAN_KOLUONG: '',
            PHUC_LOI: '',
            GHI_CHU_IN: '',
            MS_BM: '',
            TDO_LLCT: '',
            TIN_HOC: '',
            NGOAI_NGU: '',
            GHI_CHU_NOP_BANG: '',
            CONG_NHAN_BANG: '',
            CHUYEN_NGANH: '',
            CD: '',
            KS: '',
            CH: '',
            TS: '',
            TSKH: '',
            TC: '',
            KHAC: '',
            GS: '',
            PGS: '',
            GVC: '',
            GV: '',
            GVTH: '',
            TG: '',
            NVC: '',
            CVC: '',
            TG_QUANDOI: '',
            CAP_BAC: '',
            HUY_CHUONG_SNGD: '',
            NGND: '',
            NGUT: '',
            SO_THE: '',
            NGAY_DANG_DB: '',
            NOI_DANG_DB: '',
            DANG_VIEN: '',
            NGAY_DANG_CT: '',
            NOI_DANG_CT: '',
            DOAN_VIEN: '',
            NGAY_DOAN: '',
            NOI_DOAN: '',
            NOI_DKHK: '',
            DC_HIENTAI: '',
            DIEN_THOAI: '',
            EMAIL: '',
            NGUYEN_QUAN: '',
            SO_CMND: '',
            NOI_NGAYCAP: '',
            DANTOC: '',
            TON_GIAO: '',
            CHA_TEN: '',
            CHA_NAM_SINH: '',
            CHA_NNGHIEP: '',
            CHA_CONGTAC: '',
            ME_TEN: '',
            ME_NAM_SINH: '',
            ME_NNGHIEP: '',
            ME_CONGTAC: '',
            VC_TEN: '',
            VC_NAMSINH: '',
            VC_NNGHIEP: '',
            VC_CONGTAC: '',
            SO_SO_HK: '',
            HOTEN_CHU_HO_HK: '',
            LOAI_GIAY_TO: '',
            MA_TINH_BV: '',
            QUOC_TICH: '',
            TRA_THE_BHYT: '',
            MA_BV: '',
            MASO_BHXH: '',
            GHI_CHU_NOP_SO_BHXH: '',
            SO_BHXH: '',
            NO_PC: '',
            NO_DONG_BHXH: '',
            GHICHU_BHXH,
            NO_BHXH: '',
            GHICHU_KY_HIEU: '',
            HIEULUC_GD_HD: '',
            TANG: '',//?
            KH_TANG: '',
            GIAM: '',//?
            KH_GIAM: '',
            SO_QH_HD: '',
            NGAY_KY_QH_HD: '',
            NGAY_NHAP_HS: '',
            DONG_BHXH: '',
            HL_DEN_NGAY: '',
            DIEN_GIAI_HD: '' };
        $('#NGHI').val(NGHI);
        $('#TAM_NGUNG').val(TAM_NGUNG);
        $('#IS_NNGOAI').val(IS_NNGOAI);
        $('#IN_NUOC').val(IN_NUOC);
        $('#LOAI').val(LOAI);
        $('#SHCC').val(SHCC);
        $('#MS_NV').val(MS_NV);
        $('#MS_NV_CU').val(MS_NV_CU);
        $('#HO').val(HO);
        $('#TEN').val(TEN);
        $('#PHAI').val(PHAI);
        $('#NGAY_SINH').val(NGAY_SINH);
        $('#XA_PHUONG_NOISINH').val(XA_PHUONG_NOISINH);
        $('#QUAN_HUYEN_NOISINH').val(QUAN_HUYEN_NOISINH);
        $('#NOI_SINH_TINH_TP').val(NOI_SINH_TINH_TP);
        $('#NGAY_BD_CT').val(NGAY_BD_CT);
        $('#NGAY_VAO').val(NGAY_VAO);
        $('#NGAY_BC').val(NGAY_BC);
        $('#NGAY_CBGD').val(NGAY_CBGD);
        $('#NGAY_NGHI').val(NGAY_NGHI);
        $('#GIAY_TT_RA_TRUONG').val(GIAY_TT_RA_TRUONG);
        $('#So_BHXH_LD').val(So_BHXH_LD);
        $('#THU_BHXH').val(THU_BHXH);
        $('#CHUC_DANH').val(CHUC_DANH);
        $('#TRINH_DO').val(TRINH_DO);
        $('#NGACH').val(NGACH);
        $('#NGACHMOI').val(NGACHMOI);
        $('#BAC_LG').val(BAC_LG);
        $('#HESO_LG').val(HESO_LG);
        $('#MOC_NANG_LG').val(MOC_NANG_LG);
        $('#NGAY_HUONG_LG').val(NGAY_HUONG_LG);
        $('#HD_KY_DEN').val(HD_KY_DEN);
        $('#VUOT_KHUNG').val(VUOT_KHUNG);
        $('#NGAY_HUONG_VK').val(NGAY_HUONG_VK);
        $('#PCTN_CU').val(PCTN_CU);
        $('#NGAY_PCTN_NEW').val(NGAY_PCTN_NEW);
        $('#PCTN_NEW').val(PCTN_NEW);
        $('#THOI_DIEM_TANG_1').val(THOI_DIEM_TANG_1);
        $('#GHI_CHU_LG').val(GHI_CHU_LG);
        $('#TYLE_PCUD').val(TYLE_PCUD);
        $('#CHUC_VU_BCH_DANG_BO').val(CHUC_VU_BCH_DANG_BO);
        $('#CHUC_VU_BCH_CONG_DOAN').val(CHUC_VU_BCH_CONG_DOAN);
        $('#CHUC_VU_BCH_DOAN_TN').val(CHUC_VU_BCH_DOAN_TN);
        $('#PC_DOC_HAI').val(PC_DOC_HAI);
        $('#MOI_TRUONG_DOC_HAI').val(MOI_TRUONG_DOC_HAI);
        $('#MS_CVU').val(MS_CVU);
        $('#TEN_CV').val(TEN_CV);
        $('#PCCV').val(PCCV);
        $('#NGAY_PCCV').val(NGAY_PCCV);
        $('#NUOC_NGOAI').val(NUOC_NGOAI);
        $('#TU_NGAY_NN').val(TU_NGAY_NN);
        $('#DEN_NGAY_NN').val(DEN_NGAY_NN);
        $('#NGAY_VE_THUC_TE_NN').val(NGAY_VE_THUC_TE_NN);
        $('#TUNGAY_KOLUONG').val(TUNGAY_KOLUONG);
        $('#DENNGAY_KOLUONG').val(DENNGAY_KOLUONG);
        $('#NGAYTIEPNHAN_KOLUONG').val(NGAYTIEPNHAN_KOLUONG);
        $('#PHUC_LOI').val(PHUC_LOI);
        $('#GHI_CHU_IN').val(GHI_CHU_IN);
        $('#MS_BM').val(MS_BM);
        $('#TDO_LLCT').val(TDO_LLCT);
        $('#TIN_HOC').val(TIN_HOC);
        $('#NGOAI_NGU').val(NGOAI_NGU);
        $('#GHI_CHU_NOP_BANG').val(GHI_CHU_NOP_BANG);
        $('#CONG_NHAN_BANG').val(CONG_NHAN_BANG);
        $('#CHUYEN_NGANH').val(CHUYEN_NGANH);
        $('#CD').val(CD);
        $('#KS').val(KS);
        $('#CH').val(CH);
        $('#TS').val(TS);
        $('#TSKH').val(TSKH);
        $('#TC').val(TC);
        $('#KHAC').val(KHAC);
        $('#GS').val(GS);
        $('#PGS').val(PGS);
        $('#GVC').val(GVC);
        $('#GV').val(GV);
        $('#GVTH').val(GVTH);
        $('#TG').val(TG);
        $('#NVC').val(NVC);
        $('#CVC').val(CVC);
        $('#TG_QUANDOI').val(TG_QUANDOI);
        $('#CAP_BAC').val(CAP_BAC);
        $('#HUY_CHUONG_SNGD').val(HUY_CHUONG_SNGD);
        $('#NGND').val(NGND);
        $('#NGUT').val(NGUT);
        $('#SO_THE').val(SO_THE);
        $('#NGAY_DANG_DB').val(NGAY_DANG_DB);
        $('#NOI_DANG_DB').val(NOI_DANG_DB);
        $('#DANG_VIEN').val(DANG_VIEN);
        $('#NGAY_DANG_CT').val(NGAY_DANG_CT);
        $('#NOI_DANG_CT').val(NOI_DANG_CT);
        $('#DOAN_VIEN').val(DOAN_VIEN);
        $('#NGAY_DOAN').val(NGAY_DOAN);
        $('#NOI_DOAN').val(NOI_DOAN);
        $('#NOI_DKHK').val(NOI_DKHK);
        $('#DC_HIENTAI').val(DC_HIENTAI);
        $('#DIEN_THOAI').val(DIEN_THOAI);
        $('#EMAIL').val(EMAIL);
        $('#NGUYEN_QUAN').val(NGUYEN_QUAN);
        $('#SO_CMND').val(SO_CMND);
        $('#NOI_NGAYCAP').val(NOI_NGAYCAP);
        $('#DANTOC').val(DANTOC);
        $('#TON_GIAO').val(TON_GIAO);
        $('#CHA_TEN').val(CHA_TEN);
        $('#CHA_NAM_SINH').val(CHA_NAM_SINH);
        $('#CHA_NNGHIEP').val(CHA_NNGHIEP);
        $('#CHA_CONGTAC').val(CHA_CONGTAC);
        $('#ME_TEN').val(ME_TEN);
        $('#ME_NAM_SINH').val(ME_NAM_SINH);
        $('#ME_NNGHIEP').val(ME_NNGHIEP);
        $('#ME_CONGTAC').val(ME_CONGTAC);
        $('#VC_TEN').val(VC_TEN);
        $('#VC_NAMSINH').val(VC_NAMSINH);
        $('#VC_NNGHIEP').val(VC_NNGHIEP);
        $('#VC_CONGTAC').val(VC_CONGTAC);
        $('#SO_SO_HK').val(SO_SO_HK);
        $('#HOTEN_CHU_HO_HK').val(HOTEN_CHU_HO_HK);
        $('#LOAI_GIAY_TO').val(LOAI_GIAY_TO);
        $('#MA_TINH_BV').val(MA_TINH_BV);
        $('#QUOC_TICH').val(QUOC_TICH);
        $('#TRA_THE_BHYT').val(TRA_THE_BHYT);
        $('#MA_BV').val(MA_BV);
        $('#MASO_BHXH').val(MASO_BHXH);
        $('#GHI_CHU_NOP_SO_BHXH').val(GHI_CHU_NOP_SO_BHXH);
        $('#SO_BHXH').val(SO_BHXH);
        $('#NO_PC').val(NO_PC);
        $('#NO_DONG_BHXH').val(NO_DONG_BHXH);
        $('#GHICHU_BHXH').val(GHICHU_BHXH);
        $('#NO_BHXH').val(NO_BHXH);
        $('#GHICHU_KY_HIEU').val(GHICHU_KY_HIEU);
        $('#HIEULUC_GD_HD').val(HIEULUC_GD_HD);
        $('#TANG').val(TANG);
        $('#KH_TANG').val(KH_TANG);
        $('#GIAM').val(GIAM);
        $('#KH_GIAM').val(KH_GIAM);
        $('#SO_QH_HD').val(SO_QH_HD);
        $('#NGAY_KY_QH_HD').val(NGAY_KY_QH_HD);
        $('#NGAY_NHAP_HS').val(NGAY_NHAP_HS);
        $('#DONG_BHXH').val(DONG_BHXH);
        $('#HL_DEN_NGAY').val(HL_DEN_NGAY);
        $('#DIEN_GIAI_HD').val(DIEN_GIAI_HD);

        this.setState({ _id, 
            nghi_ctac : nghi_ctac ? nghi_ctac : [], 
            loai : loai ? loai : [], 
            pctn_nghe_2018 : pctn_nghe_2018 ? pctn_nghe_2018 : [], 
            chucdanh : chucdanh ? chucdanh : [], 
            trinhdo : trinhdo ? trinhdo : [], 
            ngach : ngach ? ngach : [], 
            chucvu : chucvu ? chucvu : [], 
            bomon : bomon ? bomon : [], 
            dantoc : dantoc ? dantoc : [], 
            tongiao : tongiao ? tongiao : [], 
            benhvien : benhvien ? benhvien : []});
        $(this.modal.current).modal('show');
    }

    save(e) {
        e.preventDefault();
        const nghi_ctac = this.nghi_ctac.current.getSelectedItem(),
            loai = this.loai.current.getSelectedItem(),
            pctn_nghe_2018 = this.pctn_nghe_2018.current.getSelectedItem(),
            chucdanh = this.chucdanh.current.getSelectedItem(),
            trinhdo = this.trinhdo.current.getSelectedItem(),
            ngach = this.ngach.current.getSelectedItem(),
            chucvu = this.chucvu.current.getSelectedItem(),
            bomon = this.bomon.current.getSelectedItem(),
            dantoc = this.dantoc.current.getSelectedItem(),
            tongiao = this.tongiao.current.getSelectedItem(),
            benhvien = this.benhvien.current.getSelectedItem(),
       
            NGHI = nghi_ctac ? nghi_ctac._id: [],
            LOAI = loai ? loai._id : [],
            SHCC = pctn_nghe_2018? pctn_nghe_2018._id : [],
            CHUC_DANH = chucdanh ? chucdanh._id : [],
            TRINH_DO = trinhdo ? trinhdo._id : [],
            NGACH = ngach ? ngach._id : [],
            MS_CVU = chucvu ? chucvu._id : [],
            MS_BM = bomon ? bomon._id : [],
            DANTOC = dantoc ? dantoc._id : [],
            TON_GIAO = tongiao ? tongiao._id : [],
            MA_BV = benhvien ? benhvien._id : [],
        changes = {
            NGHI,
            TAM_NGUNG: this.state.number.TAM_NGUNG,
            IS_NNGOAI: this.state.boolean.IS_NNGOAI,
            IN_NUOC: this.state.boolean.IN_NUOC,
            LOAI,
            SHCC,
            MS_NV: this.state.text.MS_NV,
            MS_NV_CU: this.state.text.MS_NV_CU,
            HO: this.state.text.HO,
            TEN: this.state.text.TEN,
            PHAI: this.state.text.PHAI,
            NGAY_SINH: this.state.date.NGAY_SINH,
            XA_PHUONG_NOISINH: this.state.text.XA_PHUONG_NOISINH,
            QUAN_HUYEN_NOISINH: this.state.text.QUAN_HUYEN_NOISINH,
            NOI_SINH_TINH_TP: this.state.text.NOI_SINH_TINH_TP,
            NGAY_BD_CT: this.state.date.NGAY_BD_CT,
            NGAY_VAO: this.state.date.NGAY_VAO,
            NGAY_BC: this.state.date.NGAY_BC,
            NGAY_CBGD: this.state.date.NGAY_CBGD,
            NGAY_NGHI: this.state.date.NGAY_NGHI,
            GIAY_TT_RA_TRUONG: this.state.text.GIAY_TT_RA_TRUONG,
            So_BHXH_LD: this.state.text.So_BHXH_LD,
            CHUC_DANH,
            TRINH_DO,
            NGACH,
            NGACHMOI: this.state.text.NGACHMOI,
            BAC_LG: this.state.number.BAC_LG,
            HESO_LG: this.state.number.HESO_LG,
            MOC_NANG_LG: this.state.date.MOC_NANG_LG,
            NGAY_HUONG_LG: this.state.date.NGAY_HUONG_LG,
            HD_KY_DEN: this.state.date.HD_KY_DEN,
            VUOT_KHUNG: this.state.number.VUOT_KHUNG,
            NGAY_HUONG_VK: this.state.date.NGAY_HUONG_VK,
            PCTN_CU: this.state.number.PCTN_CU,
            NGAY_PCTN_NEW: this.state.date.NGAY_PCTN_NEW,
            PCTN_NEW: this.state.number.PCTN_NEW,
            THOI_DIEM_TANG_1: this.state.date.THOI_DIEM_TANG_1,
            GHI_CHU_LG: this.state.text.GHI_CHU_LG,
            TYLE_PCUD: this.state.number.TYLE_PCUD,
            CHUC_VU_BCH_DANG_BO: this.state.text.CHUC_VU_BCH_DANG_BO,
            CHUC_VU_BCH_CONG_DOAN: this.state.text.CHUC_VU_BCH_CONG_DOAN,
            CHUC_VU_BCH_DOAN_TN: this.state.text.CHUC_VU_BCH_DOAN_TN,
            PC_DOC_HAI: this.state.number.PC_DOC_HAI,
            MOI_TRUONG_DOC_HAI: this.state.text.MOI_TRUONG_DOC_HAI,
            MS_CVU,
            TEN_CV: this.state.text.TEN_CV,
            PCCV: this.state.number.PCCV,
            NGAY_PCCV: this.state.date.NGAY_PCCV,
            NUOC_NGOAI: this.state.text.NUOC_NGOAI,
            TU_NGAY_NN: this.state.date.TU_NGAY_NN,
            DEN_NGAY_NN: this.state.date.DEN_NGAY_NN,
            NGAY_VE_THUC_TE_NN: this.state.date.NGAY_VE_THUC_TE_NN,
            TUNGAY_KOLUONG: this.state.date.TUNGAY_KOLUONG,
            DENNGAY_KOLUONG: this.state.date.DENNGAY_KOLUONG,
            NGAYTIEPNHAN_KOLUONG: this.state.date.NGAYTIEPNHAN_KOLUONG,
            PHUC_LOI: this.state.text.PHUC_LOI,
            GHI_CHU_IN: this.state.text.GHI_CHU_IN,
            MS_BM,
            TDO_LLCT: this.state.text.TDO_LLCT,
            TIN_HOC: this.state.text.TIN_HOC,
            NGOAI_NGU: this.state.text.NGOAI_NGU,
            GHI_CHU_NOP_BANG: this.state.text.GHI_CHU_NOP_BANG,
            CONG_NHAN_BANG: this.state.text.CONG_NHAN_BANG,
            CHUYEN_NGANH: this.state.text.CHUYEN_NGANH,
            CD: this.state.text.CD,
            KS: this.state.text.KS,
            CH: this.state.text.CH,
            TS: this.state.text.TS,
            TSKH: this.state.text.TSKH,
            TC: this.state.text.TC,
            KHAC: this.state.text.KHAC,
            GS: this.state.number.GS,
            PGS: this.state.number.PGS,
            GVC: this.state.number.GVC,
            GV: this.state.number.GV,
            GVTH: this.state.number.GVTH,
            TG: this.state.number.TG,
            NVC: this.state.number.NVC,
            CVC: this.state.number.CVC,
            TG_QUANDOI: this.state.date.TG_QUANDOI,
            CAP_BAC: this.state.text.CAP_BAC,
            HUY_CHUONG_SNGD: this.state.date.HUY_CHUONG_SNGD,
            NGND: this.state.date.NGND,
            NGUT: this.state.date.NGUT,
            SO_THE: this.state.number.SO_THE,
            NGAY_DANG_DB: this.state.date.NGAY_DANG_DB,
            NOI_DANG_DB: this.state.text.NOI_DANG_DB,
            DANG_VIEN: this.state.number.DANG_VIEN,
            NGAY_DANG_CT: this.state.date.NGAY_DANG_CT,
            NOI_DANG_CT: this.state.text.NOI_DANG_CT,
            DOAN_VIEN: this.state.text.DOAN_VIEN,
            NGAY_DOAN: this.state.date.NGAY_DOAN,
            NOI_DOAN: this.state.text.NOI_DOAN,
            NOI_DKHK: this.state.text.NOI_DKHK,
            DC_HIENTAI: this.state.text.DC_HIENTAI,
            DIEN_THOAI: this.state.text.DIEN_THOAI,
            EMAIL: this.state.text.EMAIL,
            NGUYEN_QUAN: this.state.text.NGUYEN_QUAN,
            SO_CMND: this.state.text.SO_CMND,
            NOI_NGAYCAP: this.state.text.NOI_NGAYCAP,
            DANTOC,
            TON_GIAO,
            CHA_TEN: this.state.text.CHA_TEN,
            CHA_NAM_SINH: this.state.number.CHA_NAM_SINH,
            CHA_NNGHIEP: this.state.text.CHA_NNGHIEP,
            CHA_CONGTAC: this.state.text.CHA_CONGTAC,
            ME_TEN: this.state.text.ME_TEN,
            ME_NAM_SINH: this.state.number.ME_NAM_SINH,
            ME_NNGHIEP: this.state.text.ME_NNGHIEP,
            ME_CONGTAC: this.state.text.ME_CONGTAC,
            VC_TEN: this.state.text.VC_TEN,
            VC_NAMSINH: this.state.number.VC_NAMSINH,
            VC_NNGHIEP: this.state.text.VC_NNGHIEP,
            VC_CONGTAC: this.state.text.VC_CONGTAC,
            SO_SO_HK: this.state.text.SO_SO_HK,
            HOTEN_CHU_HO_HK: this.state.text.HOTEN_CHU_HO_HK,
            LOAI_GIAY_TO: this.state.number.LOAI_GIAY_TO,
            MA_TINH_BV: this.state.number.MA_TINH_BV,
            QUOC_TICH: this.state.text.QUOC_TICH,
            TRA_THE_BHYT: this.state.text.TRA_THE_BHYT,
            MA_BV,
            MASO_BHXH: this.state.text.MASO_BHXH,
            GHI_CHU_NOP_SO_BHXH: this.state.text.GHI_CHU_NOP_SO_BHXH,
            SO_BHXH: this.state.text.SO_BHXH,
            NO_PC: this.state.boolean.NO_PC,
            NO_DONG_BHXH: this.state.boolean.NO_DONG_BHXH,
            GHICHU_BHXH: this.state.text.GHICHU_BHXH,
            NO_BHXH: this.state.boolean.NO_BHXH,
            GHICHU_KY_HIEU: this.state.text.GHICHU_KY_HIEU,
            HIEULUC_GD_HD: this.state.date.HIEULUC_GD_HD,
            TANG: this.state.text.TANG,
            KH_TANG: this.state.text.KH_TANG,
            GIAM: this.state.text.GIAM,
            KH_GIAM: this.state.text.KH_GIAM,
            SO_QH_HD: this.state.text.SO_QH_HD,
            NGAY_KY_QH_HD: this.state.date.NGAY_KY_QH_HD,
            NGAY_NHAP_HS: this.state.date.NGAY_NHAP_HS,
            DONG_BHXH: this.state.text.DONG_BHXH,
            HL_DEN_NGAY: this.state.date.HL_DEN_NGAY,
            DIEN_GIAI_HD: this.state.number.DIEN_GIAI_HD,

        };
        if (!changes.LOAI) {
            T.notify('Loại đang trống', 'danger');
            $('#LOAI').focus();
        } else if (!changes.SHCC) {
            T.notify('SHCC đang trống', 'danger');
            $('#SHCC').focus();
        } else if (!changes.MS_NV) {
            T.notify('MSNV đang trống', 'danger');
            $('#MS_NV').focus();
        } else if (!changes.HO) {
            T.notify('Họ đang trống', 'danger');
            $('#HO').focus();
        } else if (!changes.TEN) {
            T.notify('Tên đang trống', 'danger');
            $('#TEN').focus();
        } else if (!changes.PHAI) {
            T.notify('Phái đang trống', 'danger');
            $('#PHAI').focus();
        } else if (!changes.NGAY_SINH) {
            T.notify('Ngày sinh đang trống', 'danger');
            $('#NGAY_SINH').focus();
        } else if (this.state._id) {
            this.props.updateCbcnv(this.state._id, changes, data => {
                $(this.modal.current).modal('hide');
            });
        } else {
            this.props.createCbcnv(changes, data => {
                $(this.modal.current).modal('hide');
            });
        }
    }

    render() {
               
        const nghi_ctac = this.state && this.state.nghi_ctac && this.state.nghi_ctac.nghi_ctac ? this.state.nghi_ctac.nghi_ctac : [];
        const loai = this.state && this.state.loai && this.state.loai.loai ? this.state.loai.loai : [];
        const pctn_nghe_2018 = this.state && this.state.pctn_nghe_2018 && this.state.pctn_nghe_2018.pctn_nghe_2018 ? this.state.pctn_nghe_2018.pctn_nghe_2018 : [];
        const chucdanh = this.state && this.state.chucdanh && this.state.chucdanh.chucdanh ? this.state.chucdanh.chucdanh : [];
        const trinhdo = this.state && this.state.trinhdo && this.state.trinhdo.trinhdo ? this.state.trinhdo.trinhdo : [];
        const ngach = this.state && this.state.ngach && this.state.ngach.ngach ? this.state.ngach.ngach : [];
        const chucvu = this.state && this.state.chucvu && this.state.chucvu.chucvu ? this.state.chucvu.chucvu : [];
        const benhvien = this.state && this.state.benhvien && this.state.benhvien.benhvien ? this.state.benhvien.benhvien : [];
        const bomon = this.state && this.state.bomon && this.state.bomon.bomon ? this.state.bomon.bomon : [];
        const dantoc = this.state && this.state.dantoc && this.state.dantoc.dantoc ? this.state.dantoc.dantoc : [];
        const tongiao = this.state && this.state.tongiao && this.state.tongiao.tongiao ? this.state.tongiao.tongiao : [];
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={this.modal}>
                <div className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Thông tin Cán bộ công nhân viên</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='NGHI'>Nghỉ công tác</label>
                                <Dropdown ref={this.nghi_ctac} number='' items={nghi_ctac.map(e => Object.assign({}, e, {text: e.Dien_giai}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TAM_NGUNG'>Tạm ngưng</label>
                                <input className='form-control' id='TAM_NGUNG' type='number' placeholder='Tạm ngưng' onChange={this.handleInput('number', 'TAM_NGUNG')} value={this.state.number.TAM_NGUNG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='IS_NNGOAI'>Người nước ngoài</label>
                                <input className='form-control' id='IS_NNGOAI' type='boolean' placeholder='' onChange={this.handleInput('boolean', 'IS_NNGOAI')} value={this.state.boolean.IS_NNGOAI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='IN_NUOC'>Trong nước</label>
                                <input className='form-control' id='IN_NUOC' type='boolean' placeholder='' onChange={this.handleInput('boolean', 'IN_NUOC')} value={this.state.boolean.IN_NUOC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='LOAI'>Loại</label>
                                <Dropdown ref={this.loai} number='' items={loai.map(e => Object.assign({}, e, {text: e.LOAI}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='SHCC'>SHCC</label>
                                <Dropdown ref={this.pctn_nghe_2018} number='' items={pctn_nghe_2018.map(e => Object.assign({}, e, {text: e.SHCC}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MS_NV'>MS_NV</label>
                                <input className='form-control' id='MS_NV' type='text' placeholder='MS_NV' onChange={this.handleInput('text', 'MS_NV')} value={this.state.text.MS_NV}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MS_NV_CU'>MS_NV_CU</label>
                                <input className='form-control' id='MS_NV_CU' type='text' placeholder='MS_NV_CU' onChange={this.handleInput('text', 'MS_NV_CU')} value={this.state.text.MS_NV_CU}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HO'>Họ</label>
                                <input className='form-control' id='HO' type='text' placeholder='Họ' onChange={this.handleInput('text', 'HO')} value={this.state.text.HO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TEN'>Tên</label>
                                <input className='form-control' id='TEN' type='text' placeholder='Tên' onChange={this.handleInput('text', 'TEN')} value={this.state.text.TEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PHAI'>Phái</label>
                                <input className='form-control' id='PHAI' type='text' placeholder='Phái' onChange={this.handleInput('text', 'PHAI')} value={this.state.text.PHAI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_SINH'>Ngày sinh</label>
                                <input className='form-control' id='NGAY_SINH' type='date' placeholder='Ngày sinh' onChange={this.handleInput('date', 'NGAY_SINH')} value={this.state.date.NGAY_SINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='XA_PHUONG_NOISINH'>Xã phường nơi sinh</label>
                                <input className='form-control' id='XA_PHUONG_NOISINH' type='text' placeholder='Xã phường nơi sinh' onChange={this.handleInput('text', 'XA_PHUONG_NOISINH')} value={this.state.text.XA_PHUONG_NOISINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='QUAN_HUYEN_NOISINH'>Quận huyện nơi sinh</label>
                                <input className='form-control' id='QUAN_HUYEN_NOISINH' type='text' placeholder='Quận huyện nơi sinh' onChange={this.handleInput('text', 'QUAN_HUYEN_NOISINH')} value={this.state.text.QUAN_HUYEN_NOISINH}/>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='NOI_SINH_TINH_TP'>Nơi sinh tỉnh - TP</label>
                                <input className='form-control' id='NOI_SINH_TINH_TP' type='text' placeholder='Nơi sinh tỉnh - TP' onChange={this.handleInput('text', 'NOI_SINH_TINH_TP')} value={this.state.text.NOI_SINH_TINH_TP}/>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='NGAY_BD_CT'>Ngày BD CT</label>
                                <input className='form-control' id='NGAY_BD_CT' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_BD_CT')} value={this.state.date.NGAY_BD_CT}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_VAO'>Ngày vào</label>
                                <input className='form-control' id='NGAY_VAO' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_VAO')} value={this.state.date.NGAY_VAO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_BC'>Ngày BC</label>
                                <input className='form-control' id='NGAY_BC' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_BC')} value={this.state.date.NGAY_BC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_CBGD'>Ngày CBGD</label>
                                <input className='form-control' id='NGAY_CBGD' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_CBGD')} value={this.state.date.NGAY_CBGD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_NGHI'>Ngày nghỉ</label>
                                <input className='form-control' id='NGAY_NGHI' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_NGHI')} value={this.state.date.NGAY_NGHI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GIAY_TT_RA_TRUONG'>Giấy TT ra trường</label>
                                <input className='form-control' id='GIAY_TT_RA_TRUONG' type='text' placeholder='Giấy TT ra trường' onChange={this.handleInput('text', 'GIAY_TT_RA_TRUONG')} value={this.state.text.GIAY_TT_RA_TRUONG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='So_BHXH_LD'>Số BHXH LĐ</label>
                                <input className='form-control' id='So_BHXH_LD' type='text' placeholder='Số BHXH LĐ' onChange={this.handleInput('text', 'So_BHXH_LD')} value={this.state.text.So_BHXH_LD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='THU_BHXH'>Thu BHXH</label>
                                <input className='form-control' id='THU_BHXH' type='text' placeholder='Thu BHXH' onChange={this.handleInput('text', 'THU_BHXH')} value={this.state.text.THU_BHXH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHUC_DANH'>Chức danh</label>
                                <Dropdown ref={this.chucdanh} number='' items={chucdanh.map(e => Object.assign({}, e, {text: e.chuc_danh}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TRINH_DO'>Trình độ</label>
                                <Dropdown ref={this.trinhdo} number='' items={trinhdo.map(e => Object.assign({}, e, {text: e.trinh_do}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGACH'>Ngạch</label>
                                <Dropdown ref={this.ngach} number='' items={ngach.map(e => Object.assign({}, e, {text: e.NGACH}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGACHMOI'>Ngạch mới</label>
                                <input className='form-control' id='NGACHMOI' type='number' placeholder='Ngạch mới' onChange={this.handleInput('text', 'NGACHMOI')} value={this.state.text.NGACHMOI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='BAC_LG'>Bậc lương</label>
                                <input className='form-control' id='BAC_LG' type='number' placeholder='Bậc lương' onChange={this.handleInput('number', 'BAC_LG')} value={this.state.number.BAC_LG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HESO_LG'>Hệ số lương</label>
                                <input className='form-control' id='HESO_LG' type='number' placeholder='Hệ số lương' onChange={this.handleInput('number', 'HESO_LG')} value={this.state.number.HESO_LG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MOC_NANG_LG'>Mốc nâng lương</label>
                                <input className='form-control' id='MOC_NANG_LG' type='date' placeholder='' onChange={this.handleInput('date', 'MOC_NANG_LG')} value={this.state.date.MOC_NANG_LG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_HUONG_LG'>Ngày hương lương</label>
                                <input className='form-control' id='NGAY_HUONG_LG' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_HUONG_LG')} value={this.state.date.NGAY_HUONG_LG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HD_KY_DEN'>HĐ kỳ đến</label>
                                <input className='form-control' id='HD_KY_DEN' type='date' placeholder='HĐ kỳ đến' onChange={this.handleInput('date', 'HD_KY_DEN')} value={this.state.date.HD_KY_DEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='VUOT_KHUNG'>Vượt khủng</label>
                                <input className='form-control' id='VUOT_KHUNG' type='number' placeholder='Vượt khủng' onChange={this.handleInput('number', 'VUOT_KHUNG')} value={this.state.number.VUOT_KHUNG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_HUONG_VK'>Ngày hưởng VK</label>
                                <input className='form-control' id='NGAY_HUONG_VK' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_HUONG_VK')} value={this.state.date.NGAY_HUONG_VK}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PCTN_CU'>PCTN cũ</label>
                                <input className='form-control' id='PCTN_CU' type='number' placeholder='PCTN cũ' onChange={this.handleInput('number', 'PCTN_CU')} value={this.state.number.PCTN_CU}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_PCTN_NEW'>Ngày PCTN new</label>
                                <input className='form-control' id='NGAY_PCTN_NEW' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_PCTN_NEW')} value={this.state.date.NGAY_PCTN_NEW}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PCTN_NEW'>PCTN new</label>
                                <input className='form-control' id='PCTN_NEW' type='number' placeholder='PCTN new' onChange={this.handleInput('number', 'PCTN_NEW')} value={this.state.number.PCTN_NEW}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='THOI_DIEM_TANG_1'>Thời điểm tăng 1</label>
                                <input className='form-control' id='THOI_DIEM_TANG_1' type='date' placeholder='' onChange={this.handleInput('date', 'THOI_DIEM_TANG_1')} value={this.state.date.THOI_DIEM_TANG_1}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU_LG'>Ghi chú lương</label>
                                <input className='form-control' id='GHI_CHU_LG' type='text' placeholder='Ghi chú lương' onChange={this.handleInput('text', 'GHI_CHU_LG')} value={this.state.text.GHI_CHU_LG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TYLE_PCUD'>Tỷ lệ PCYD</label>
                                <input className='form-control' id='TYLE_PCUD' type='number' placeholder='Tỉ lệ PCUD' onChange={this.handleInput('number', 'TYLE_PCUD')} value={this.state.number.TYLE_PCUD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHUC_VU_BCH_DANG_BO'>Chức vụ BCH đảng bộ</label>
                                <input className='form-control' id='CHUC_VU_BCH_DANG_BO' type='text' placeholder='Chức vụ BCH đảng bộ' onChange={this.handleInput('text', 'CHUC_VU_BCH_DANG_BO')} value={this.state.text.CHUC_VU_BCH_DANG_BO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHUC_VU_BCH_CONG_DOAN'>Chức vụ BCH công đoàn</label>
                                <input className='form-control' id='CHUC_VU_BCH_CONG_DOAN' type='text' placeholder='Chức vụ BCH công đoàn' onChange={this.handleInput('text', 'CHUC_VU_BCH_CONG_DOAN')} value={this.state.text.CHUC_VU_BCH_CONG_DOAN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHUC_VU_BCH_DOAN_TN'>Chức vụ BCH đoàn TN</label>
                                <input className='form-control' id='CHUC_VU_BCH_DOAN_TN' type='text' placeholder='Chức vụ BCH đoàn TN' onChange={this.handleInput('text', 'CHUC_VU_BCH_DOAN_TN')} value={this.state.text.CHUC_VU_BCH_DOAN_TN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PC_DOC_HAI'>PC độc hại</label>
                                <input className='form-control' id='PC_DOC_HAI' type='number' placeholder='PC độc hại' onChange={this.handleInput('number', 'PC_DOC_HAI')} value={this.state.number.PC_DOC_HAI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MOI_TRUONG_DOC_HAI'>Môi trường độc hại</label>
                                <input className='form-control' id='MOI_TRUONG_DOC_HAI' type='text' placeholder='Môi trường độc hại' onChange={this.handleInput('text', 'MOI_TRUONG_DOC_HAI')} value={this.state.text.MOI_TRUONG_DOC_HAI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MS_CVU'>Chức vụ</label>
                                <Dropdown ref={this.chucvu} number='' items={chucvu.map(e => Object.assign({}, e, {text: e.CHUC_VU}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TEN_CV'>Tên CV</label>
                                <input className='form-control' id='TEN_CV' type='text' placeholder='Tên CV' onChange={this.handleInput('text', 'TEN_CV')} value={this.state.text.TEN_CV}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PCCV'>PCCV</label>
                                <input className='form-control' id='PCCV' type='number' placeholder='PCCV' onChange={this.handleInput('number', 'PCCV')} value={this.state.number.PCCV}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_PCCV'>Ngày PCCV</label>
                                <input className='form-control' id='NGAY_PCCV' type='date' placeholder='Ngày PCCV' onChange={this.handleInput('date', 'NGAY_PCCV')} value={this.state.date.NGAY_PCCV}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NUOC_NGOAI'>Nước ngoài</label>
                                <input className='form-control' id='NUOC_NGOAI' type='text' placeholder='Nước ngoài' onChange={this.handleInput('text', 'NUOC_NGOAI')} value={this.state.text.NUOC_NGOAI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TU_NGAY_NN'>Từ ngày NN</label>
                                <input className='form-control' id='TU_NGAY_NN' type='date' placeholder='Từ ngày NN' onChange={this.handleInput('date', 'TU_NGAY_NN')} value={this.state.date.TU_NGAY_NN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DEN_NGAY_NN'>Đến ngày NN</label>
                                <input className='form-control' id='DEN_NGAY_NN' type='date' placeholder='' onChange={this.handleInput('date', 'DEN_NGAY_NN')} value={this.state.date.DEN_NGAY_NN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_VE_THUC_TE_NN'>Ngày về thực tế NN</label>
                                <input className='form-control' id='NGAY_VE_THUC_TE_NN' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_VE_THUC_TE_NN')} value={this.state.date.NGAY_VE_THUC_TE_NN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TUNGAY_KOLUONG'>Từ ngày không lương</label>
                                <input className='form-control' id='TUNGAY_KOLUONG' type='date' placeholder='' onChange={this.handleInput('date', 'TUNGAY_KOLUONG')} value={this.state.date.TUNGAY_KOLUONG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DENNGAY_KOLUONG'>Đến ngày không lương</label>
                                <input className='form-control' id='DENNGAY_KOLUONG' type='date' placeholder='' onChange={this.handleInput('date', 'DENNGAY_KOLUONG')} value={this.state.date.DENNGAY_KOLUONG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAYTIEPNHAN_KOLUONG'>Ngày tiếp nhận không lương</label>
                                <input className='form-control' id='NGAYTIEPNHAN_KOLUONG' type='date' placeholder='' onChange={this.handleInput('date', 'NGAYTIEPNHAN_KOLUONG')} value={this.state.date.NGAYTIEPNHAN_KOLUONG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PHUC_LOI'>Phúc lợi</label>
                                <input className='form-control' id='PHUC_LOI' type='text' placeholder='Phúc lợi' onChange={this.handleInput('text', 'PHUC_LOI')} value={this.state.text.PHUC_LOI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU_IN'>Ghi chú IN</label>
                                <input className='form-control' id='GHI_CHU_IN' type='text' placeholder='Ghi chú IN' onChange={this.handleInput('text', 'GHI_CHU_IN')} value={this.state.text.GHI_CHU_IN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MS_BM'>MS BM</label>
                                <Dropdown ref={this.bomon} number='' items={bomon.map(e => Object.assign({}, e, {text: e.TEN_BM}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TDO_LLCT'>TDO LLCT</label>
                                <input className='form-control' id='TDO_LLCT' type='text' placeholder='TDO LLCT' onChange={this.handleInput('text', 'TDO_LLCT')} value={this.state.text.TDO_LLCT}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TIN_HOC'>Tin học</label>
                                <input className='form-control' id='TIN_HOC' type='text' placeholder='Tin học' onChange={this.handleInput('text', 'TIN_HOC')} value={this.state.text.TIN_HOC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGOAI_NGU'>Ngoại ngữ</label>
                                <input className='form-control' id='NGOAI_NGU' type='text' placeholder='Ngoại Ngữ' onChange={this.handleInput('text', 'NGOAI_NGU')} value={this.state.text.NGOAI_NGU}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU_NOP_BANG'>Ghi chú nộp bằng</label>
                                <input className='form-control' id='GHI_CHU_NOP_BANG' type='text' placeholder='Ghi chú nộp bằng' onChange={this.handleInput('text', 'GHI_CHU_NOP_BANG')} value={this.state.text.GHI_CHU_NOP_BANG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CONG_NHAN_BANG'>Công nhân bằng</label>
                                <input className='form-control' id='CONG_NHAN_BANG' type='text' placeholder='Công nhân bằng' onChange={this.handleInput('text', 'CONG_NHAN_BANG')} value={this.state.text.CONG_NHAN_BANG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHUYEN_NGANH'>Chuyên ngành</label>
                                <input className='form-control' id='CHUYEN_NGANH' type='text' placeholder='Chuyên ngành' onChange={this.handleInput('text', 'CHUYEN_NGANH')} value={this.state.text.CHUYEN_NGANH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CD'>CD</label>
                                <input className='form-control' id='CD' type='text' placeholder='CD' onChange={this.handleInput('text', 'CD')} value={this.state.text.CD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='KS'>KS</label>
                                <input className='form-control' id='KS' type='text' placeholder='KS' onChange={this.handleInput('text', 'KS')} value={this.state.text.KS}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CH'>CH</label>
                                <input className='form-control' id='CH' type='text' placeholder='CH' onChange={this.handleInput('text', 'CH')} value={this.state.text.CH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TS'>TS</label>
                                <input className='form-control' id='TS' type='text' placeholder='TS' onChange={this.handleInput('text', 'TS')} value={this.state.text.TS}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TSKH'>TSKH</label>
                                <input className='form-control' id='TSKH' type='text' placeholder='TSKH' onChange={this.handleInput('text', 'TSKH')} value={this.state.text.TSKH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TC'>TC</label>
                                <input className='form-control' id='TC' type='text' placeholder='TC' onChange={this.handleInput('text', 'TC')} value={this.state.text.TC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='KHAC'>Khác</label>
                                <input className='form-control' id='KHAC' type='text' placeholder='Khác' onChange={this.handleInput('text', 'KHAC')} value={this.state.text.KHAC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GS'>GS</label>
                                <input className='form-control' id='GS' type='number' placeholder='GS' onChange={this.handleInput('number', 'GS')} value={this.state.number.GS}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='PGS'>PGS</label>
                                <input className='form-control' id='PGS' type='number' placeholder='PGS' onChange={this.handleInput('number', 'PGS')} value={this.state.number.PGS}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GVC'>GVC</label>
                                <input className='form-control' id='GVC' type='number' placeholder='GVC' onChange={this.handleInput('number', 'GVC')} value={this.state.number.GVC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GV'>GV</label>
                                <input className='form-control' id='GV' type='number' placeholder='GV' onChange={this.handleInput('number', 'GV')} value={this.state.number.GV}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GVTH'>GVTH</label>
                                <input className='form-control' id='GVTH' type='number' placeholder='GVTH' onChange={this.handleInput('number', 'GVTH')} value={this.state.number.GVTH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TG'>TG</label>
                                <input className='form-control' id='TG' type='number' placeholder='TG' onChange={this.handleInput('number', 'TG')} value={this.state.number.TG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NVC'>NVC</label>
                                <input className='form-control' id='NVC' type='number' placeholder='NVC' onChange={this.handleInput('number', 'NVC')} value={this.state.number.NVC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CVC'>CVC</label>
                                <input className='form-control' id='CVC' type='number' placeholder='CVC' onChange={this.handleInput('number', 'CVC')} value={this.state.number.CVC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TG_QUANDOI'>TG quân đội</label>
                                <input className='form-control' id='TG_QUANDOI' type='date' placeholder='' onChange={this.handleInput('date', 'TG_QUANDOI')} value={this.state.date.TG_QUANDOI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CAP_BAC'>Cấp bậc</label>
                                <input className='form-control' id='CAP_BAC' type='text' placeholder='Cấp bậc' onChange={this.handleInput('text', 'CAP_BAC')} value={this.state.text.CAP_BAC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HUY_CHUONG_SNGD'>Huy chương SNGD</label>
                                <input className='form-control' id='HUY_CHUONG_SNGD' type='date' placeholder='' onChange={this.handleInput('date', 'HUY_CHUONG_SNGD')} value={this.state.date.HUY_CHUONG_SNGD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGND'>NGND</label>
                                <input className='form-control' id='NGND' type='date' placeholder='' onChange={this.handleInput('date', 'NGND')} value={this.state.date.NGND}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGUT'>NGUT</label>
                                <input className='form-control' id='NGUT' type='date' placeholder='' onChange={this.handleInput('date', 'NGUT')} value={this.state.date.NGUT}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='SO_THE'>Số thẻ</label>
                                <input className='form-control' id='SO_THE' type='number' placeholder='Số thẻ' onChange={this.handleInput('number', 'SO_THE')} value={this.state.number.SO_THE}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_DANG_DB'>Ngày đăng DB</label>
                                <input className='form-control' id='NGAY_DANG_DB' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_DANG_DB')} value={this.state.date.NGAY_DANG_DB}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NOI_DANG_DB'>Nơi đăng DB</label>
                                <input className='form-control' id='NOI_DANG_DB' type='text' placeholder='Nơi đăng DB' onChange={this.handleInput('text', 'NOI_DANG_DB')} value={this.state.text.NOI_DANG_DB}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DANG_VIEN'>Đảng viên</label>
                                <input className='form-control' id='DANG_VIEN' type='number' placeholder='' onChange={this.handleInput('number', 'DANG_VIEN')} value={this.state.number.DANG_VIEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_DANG_CT'>Ngày đăng CT</label>
                                <input className='form-control' id='NGAY_DANG_CT' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_DANG_CT')} value={this.state.date.NGAY_DANG_CT}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NOI_DANG_CT'>Nơi đăng CT</label>
                                <input className='form-control' id='NOI_DANG_CT' type='text' placeholder='NOI_DANG_CT' onChange={this.handleInput('text', 'NOI_DANG_CT')} value={this.state.text.NOI_DANG_CT}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DOAN_VIEN'>Đoàn viên</label>
                                <input className='form-control' id='DOAN_VIEN' type='text' placeholder='Đoàn viên' onChange={this.handleInput('text', 'DOAN_VIEN')} value={this.state.text.DOAN_VIEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_DOAN'>Ngày đoàn</label>
                                <input className='form-control' id='NGAY_DOAN' type='date' placeholder='' onChange={this.handleInput('text', 'NGAY_DOAN')} value={this.state.date.NGAY_DOAN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NOI_DOAN'>Nơi đoàn</label>
                                <input className='form-control' id='NOI_DOAN' type='text' placeholder='Nơi đoàn' onChange={this.handleInput('text', 'NOI_DOAN')} value={this.state.text.NOI_DOAN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NOI_DKHK'>Nơi ĐKHK</label>
                                <input className='form-control' id='NOI_DKHK' type='text' placeholder='Nơi ĐKHK' onChange={this.handleInput('text', 'NOI_DKHK')} value={this.state.text.NOI_DKHK}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DC_HIENTAI'>ĐC hiện tại</label>
                                <input className='form-control' id='DC_HIENTAI' type='text' placeholder='ĐC hiện tại' onChange={this.handleInput('text', 'DC_HIENTAI')} value={this.state.text.DC_HIENTAI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DIEN_THOAI'>Điện thoại</label>
                                <input className='form-control' id='DIEN_THOAI' type='text' placeholder='Điện thoại' onChange={this.handleInput('text', 'DIEN_THOAI')} value={this.state.text.DIEN_THOAI}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='EMAIL'>Email</label>
                                <input className='form-control' id='EMAIL' type='text' placeholder='EMAIL' onChange={this.handleInput('text', 'EMAIL')} value={this.state.text.EMAIL}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGUYEN_QUAN'>Nguyên quán</label>
                                <input className='form-control' id='NGUYEN_QUAN' type='text' placeholder='Nguyên quán' onChange={this.handleInput('text', 'NGUYEN_QUAN')} value={this.state.text.NGUYEN_QUAN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='SO_CMND'>Số CMND</label>
                                <input className='form-control' id='SO_CMND' type='text' placeholder='Số CMND' onChange={this.handleInput('text', 'SO_CMND')} value={this.state.text.SO_CMND}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NOI_NGAYCAP'>Nơi ngày cấp</label>
                                <input className='form-control' id='NOI_NGAYCAP' type='text' placeholder='Nơi ngày cấp' onChange={this.handleInput('text', 'NOI_NGAYCAP')} value={this.state.text.NOI_NGAYCAP}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DANTOC'>Dân tộc</label>
                                <Dropdown ref={this.dantoc} number='' items={dantoc.map(e => Object.assign({}, e, {text: e.Dan_toc}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TON_GIAO'>Tôn giáo</label>
                                <Dropdown ref={this.tongiao} number='' items={tongiao.map(e => Object.assign({}, e, {text: e.TON_GIAO}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHA_TEN'>Cha tên</label>
                                <input className='form-control' id='CHA_TEN' type='text' placeholder='Cha tên' onChange={this.handleInput('text', 'CHA_TEN')} value={this.state.text.CHA_TEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHA_NAM_SINH'>Cha năm sinh</label>
                                <input className='form-control' id='CHA_NAM_SINH' type='number' placeholder='Cha năm sinh' onChange={this.handleInput('number', 'CHA_NAM_SINH')} value={this.state.number.CHA_NAM_SINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHA_NNGHIEP'>Cha nghề nghiệp</label>
                                <input className='form-control' id='CHA_NNGHIEP' type='text' placeholder='Cha nghề nghiệp' onChange={this.handleInput('text', 'CHA_NNGHIEP')} value={this.state.text.CHA_NNGHIEP}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='CHA_CONGTAC'>Cha công tác</label>
                                <input className='form-control' id='CHA_CONGTAC' type='text' placeholder='Cha công tác' onChange={this.handleInput('text', 'CHA_CONGTAC')} value={this.state.text.CHA_CONGTAC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ME_TEN'>Mẹ tên</label>
                                <input className='form-control' id='ME_TEN' type='text' placeholder='Mẹ tên' onChange={this.handleInput('text', 'ME_TEN')} value={this.state.text.ME_TEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ME_NAM_SINH'>Mẹ năm sinh</label>
                                <input className='form-control' id='ME_NAM_SINH' type='number' placeholder='Mẹ năm sinh' onChange={this.handleInput('number', 'ME_NAM_SINH')} value={this.state.number.ME_NAM_SINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ME_NNGHIEP'>Mẹ nghề nghiệp</label>
                                <input className='form-control' id='ME_NNGHIEP' type='text' placeholder='Mẹ nghề nghiệp' onChange={this.handleInput('text', 'ME_NNGHIEP')} value={this.state.text.ME_NNGHIEP}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='ME_CONGTAC'>Mẹ công tác</label>
                                <input className='form-control' id='ME_CONGTAC' type='text' placeholder='Mẹ công tác' onChange={this.handleInput('text', 'ME_CONGTAC')} value={this.state.text.ME_CONGTAC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='VC_TEN'>Vợ chồng tên</label>
                                <input className='form-control' id='VC_TEN' type='text' placeholder='Vợ chồng tên' onChange={this.handleInput('text', 'VC_TEN')} value={this.state.text.VC_TEN}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='VC_NAMSINH'>Vợ chồng năm sinh</label>
                                <input className='form-control' id='VC_NAMSINH' type='number' placeholder='Vợ chồng năm sinh' onChange={this.handleInput('number', 'VC_NAMSINH')} value={this.state.number.VC_NAMSINH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='VC_NNGHIEP'>Vợ chồng nghề nghiệp</label>
                                <input className='form-control' id='VC_NNGHIEP' type='text' placeholder='Vợ chồng nghề nghiệp' onChange={this.handleInput('text', 'VC_NNGHIEP')} value={this.state.text.VC_NNGHIEP}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='VC_CONGTAC'>Vợ chồng công tác</label>
                                <input className='form-control' id='VC_CONGTAC' type='text' placeholder='Vợ chồng công tác' onChange={this.handleInput('text', 'VC_CONGTAC')} value={this.state.text.VC_CONGTAC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='SO_SO_HK'>Số sổ HK</label>
                                <input className='form-control' id='SO_SO_HK' type='text' placeholder='Số Sổ HK' onChange={this.handleInput('text', 'SO_SO_HK')} value={this.state.text.SO_SO_HK}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HOTEN_CHU_HO_HK'>Họ tên chủ HK</label>
                                <input className='form-control' id='HOTEN_CHU_HO_HK' type='text' placeholder='Họ tên chủ HK' onChange={this.handleInput('text', 'HOTEN_CHU_HO_HK')} value={this.state.text.HOTEN_CHU_HO_HK}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='LOAI_GIAY_TO'>Loại giấy tờ</label>
                                <input className='form-control' id='LOAI_GIAY_TO' type='number' placeholder='Loại giấy tờ' onChange={this.handleInput('number', 'LOAI_GIAY_TO')} value={this.state.number.LOAI_GIAY_TO}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MA_TINH_BV'>Mã tỉnh BV</label>
                                <input className='form-control' id='MA_TINH_BV' type='number' placeholder='Mã tỉnh BV' onChange={this.handleInput('number', 'MA_TINH_BV')} value={this.state.number.MA_TINH_BV}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='QUOC_TICH'>Quốc tịch</label>
                                <input className='form-control' id='QUOC_TICH' type='text' placeholder='Quốc tịch' onChange={this.handleInput('text', 'QUOC_TICH')} value={this.state.text.QUOC_TICH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TRA_THE_BHYT'>Trả thẻ BHYT</label>
                                <input className='form-control' id='TRA_THE_BHYT' type='text' placeholder='Trả thẻ BHYT' onChange={this.handleInput('text', 'TRA_THE_BHYT')} value={this.state.text.TRA_THE_BHYT}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MA_BV'>Mã BV</label>
                                <Dropdown ref={this.benhvien} number='' items={benhvien.map(e => Object.assign({}, e, {text: e.Noi_kham}))} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='MASO_BHXH'>Mã số BHXH</label>
                                <input className='form-control' id='MASO_BHXH' type='text' placeholder='Mã số BHSH' onChange={this.handleInput('text', 'MASO_BHXH')} value={this.state.text.MASO_BHXH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHI_CHU_NOP_SO_BHXH'>Ghi chú nộp sổ BHXH</label>
                                <input className='form-control' id='GHI_CHU_NOP_SO_BHXH' type='text' placeholder='Ghi chú nộp sổ BHXH' onChange={this.handleInput('text', 'GHI_CHU_NOP_SO_BHXH')} value={this.state.text.GHI_CHU_NOP_SO_BHXH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='SO_BHXH'>Số BHXH</label>
                                <input className='form-control' id='SO_BHXH' type='text' placeholder='Số BHXH' onChange={this.handleInput('text', 'SO_BHXH')} value={this.state.text.SO_BHXH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NO_PC'>Nợ PC</label>
                                <input className='form-control' id='NO_PC' type='boolean' placeholder='Nợ PC' onChange={this.handleInput('boolean', 'NO_PC')} value={this.state.boolean.NO_PC}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NO_DONG_BHXH'>Nợ đóng BHXH</label>
                                <input className='form-control' id='NO_DONG_BHXH' type='boolean' placeholder='Nợ đóng BHXH' onChange={this.handleInput('boolean', 'CD')} value={this.state.boolean.NO_DONG_BHXH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHICHU_BHXH'>Ghi chú BHXH</label>
                                <input className='form-control' id='GHICHU_BHXH' type='text' placeholder='Ghi chú BHXH' onChange={this.handleInput('text', 'GHICHU_BHXH')} value={this.state.text.GHICHU_BHXH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NO_BHXH'>Nợ BHXH</label>
                                <input className='form-control' id='NO_BHXH' type='boolean' placeholder='Nợ BHXH' onChange={this.handleInput('boolean', 'NO_BHXH')} value={this.state.boolean.NO_BHXH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GHICHU_KY_HIEU'>Ghi chú ký hiệu</label>
                                <input className='form-control' id='GHICHU_KY_HIEU' type='text' placeholder='Ghi chú ký hiệu' onChange={this.handleInput('text', 'GHICHU_KY_HIEU')} value={this.state.text.GHICHU_KY_HIEU}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HIEULUC_GD_HD'>Hiệu lực GD HĐ</label>
                                <input className='form-control' id='HIEULUC_GD_HD' type='date' placeholder='Hiệu lực GD HĐ' onChange={this.handleInput('date', 'HIEULUC_GD_HD')} value={this.state.date.HIEULUC_GD_HD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='TANG'>Tăng</label>
                                <input className='form-control' id='TANG' type='text' placeholder='Tăng' onChange={this.handleInput('text', 'TANG')} value={this.state.text.TANG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='KH_TANG'>KH tăng</label>
                                <input className='form-control' id='KH_TANG' type='text' placeholder='KH tăng' onChange={this.handleInput('text', 'KH_TANG')} value={this.state.text.KH_TANG}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='GIAM'>Giảm</label>
                                <input className='form-control' id='GIAM' type='text' placeholder='Giảm' onChange={this.handleInput('text', 'GIAM')} value={this.state.text.GIAM}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='KH_GIAM'>KH giảm</label>
                                <input className='form-control' id='KH_GIAM' type='text' placeholder='KH giảm' onChange={this.handleInput('text', 'KH_GIAM')} value={this.state.text.KH_GIAM}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='SO_QH_HD'>Số QH HD</label>
                                <input className='form-control' id='SO_QH_HD' type='text' placeholder='Số QH HD' onChange={this.handleInput('text', 'SO_QH_HD')} value={this.state.text.SO_QH_HD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_KY_QH_HD'>Ngày ký QH HD</label>
                                <input className='form-control' id='NGAY_KY_QH_HD' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_KY_QH_HD')} value={this.state.date.NGAY_KY_QH_HD}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='NGAY_NHAP_HS'>Ngày nhập HS</label>
                                <input className='form-control' id='NGAY_NHAP_HS' type='date' placeholder='' onChange={this.handleInput('date', 'NGAY_NHAP_HS')} value={this.state.date.NGAY_NHAP_HS}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DONG_BHXH'>Đóng BHXH</label>
                                <input className='form-control' id='DONG_BHXH' type='text' placeholder='Đóng BHXH' onChange={this.handleInput('text', 'DONG_BHXH')} value={this.state.text.DONG_BHXH}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='HL_DEN_NGAY'>HL đến ngày</label>
                                <input className='form-control' id='HL_DEN_NGAY' type='date' placeholder='HL_DEN_NGAY' onChange={this.handleInput('date', 'HL_DEN_NGAY')} value={this.state.date.HL_DEN_NGAY}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='DIEN_GIAI_HD'>Diễn giải HĐ</label>
                                <input className='form-control' id='DIEN_GIAI_HD' type='number' placeholder='Diễn giải HD' onChange={this.handleInput('number', 'DIEN_GIAI_HD')} value={this.state.number.DIEN_GIAI_HD}/>
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