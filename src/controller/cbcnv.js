module.exports = app => {
    app.get('/admin/cbcnv/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.cbcnv.getPage(pageNumber, pageSize, {}, (error, page) => {
            page.list = page.list.map(item => app.clone(item, { message: '' }));
            res.send({ error, page });
        });
    });

    app.get('/admin/cbcnv/all', app.role.isAdmin, (req, res) => {
        app.model.cbcnv.getAll((error, cbcnv) => {
            if (error) {
                res.send({error});
            }
            else res.send({cbcnv});
        })
    })
    app.delete('/admin/cbcnv', app.role.isAdmin, (req, res) => app.model.cbcnv.delete(req.body._id, error => res.send({ error })));

    app.post('/admin/cbcnv', (req, res) => {        
        app.model.cbcnv.create(req.body.cbcnv, (error, item) => {
            res.send({ error, item });
        })
    });

    app.get('/admin/cbcnv/count', app.role.isAdmin, (req, res) => {
        app.model.cbcnv.count((error, count) => {
            res.send({error, count});
        })
    });

    app.put('/admin/cbcnv', app.role.isAdmin, (req, res) => {
        let data = req.body.changes;
            changes = {};
        if (data.NGHI && data.NGHI != '') changes.NGHI = data.NGHI;
        if (data.TAM_NGUNG && data.TAM_NGUNG != '') changes.TAM_NGUNG = data.TAM_NGUNG;
        if (data.IS_NNGOAI && data.IS_NNGOAI != '') changes.IS_NNGOAI = data.IS_NNGOAI;
        if (data.IN_NUOC && data.IN_NUOC != '') changes.IN_NUOC = data.IN_NUOC;
        if (data.LOAI && data.LOAI != '') changes.LOAI = data.LOAI;
        if (data.SHCC && data.SHCC != '') changes.SHCC = data.SHCC;
        if (data.MS_NV && data.MS_NV != '') changes.MS_NV = data.MS_NV;
        if (data.MS_NV_CU && data.MS_NV_CU != '') changes.MS_NV_CU = data.MS_NV_CU;
        if (data.HO && data.HO != '') changes.HO = data.HO;
        if (data.TEN && data.TEN != '') changes.TEN = data.TEN;
        if (data.PHAI && data.PHAI != '') changes.PHAI = data.PHAI;
        if (data.NGAY_SINH && data.NGAY_SINH != '') changes.NGAY_SINH = data.NGAY_SINH;
        if (data.XA_PHUONG_NOISINH && data.XA_PHUONG_NOISINH != '') changes.XA_PHUONG_NOISINH = data.XA_PHUONG_NOISINH;
        if (data.QUAN_HUYEN_NOISINH && data.QUAN_HUYEN_NOISINH != '') changes.QUAN_HUYEN_NOISINH = data.QUAN_HUYEN_NOISINH;
        if (data.NOI_SINH_TINH_TP && data.NOI_SINH_TINH_TP != '') changes.NOI_SINH_TINH_TP = data.NOI_SINH_TINH_TP;
        if (data.NGAY_BD_CT && data.NGAY_BD_CT != '') changes.NGAY_BD_CT = data.NGAY_BD_CT;
        if (data.NGAY_VAO && data.NGAY_VAO != '') changes.NGAY_VAO = data.NGAY_VAO;
        if (data.NGAY_BC && data.NGAY_BC != '') changes.NGAY_BC = data.NGAY_BC;
        if (data.NGAY_CBGD && data.NGAY_CBGD != '') changes.NGAY_CBGD = data.NGAY_CBGD;
        if (data.NGAY_NGHI && data.NGAY_NGHI != '') changes.NGAY_NGHI = data.NGAY_NGHI;
        if (data.GIAY_TT_RA_TRUONG && data.GIAY_TT_RA_TRUONG != '') changes.GIAY_TT_RA_TRUONG = data.GIAY_TT_RA_TRUONG;
        if (data.So_BHXH_LD && data.So_BHXH_LD != '') changes.So_BHXH_LD = data.So_BHXH_LD;
        if (data.THU_BHXH && data.THU_BHXH != '') changes.THU_BHXH = data.THU_BHXH;
        if (data.CHUC_DANH && data.CHUC_DANH != '') changes.CHUC_DANH = data.CHUC_DANH;
        if (data.TRINH_DO && data.TRINH_DO != '') changes.TRINH_DO = data.TRINH_DO;
        if (data.NGACH && data.NGACH != '') changes.NGACH = data.NGACH;
        if (data.NGACHMOI && data.NGACHMOI != '') changes.NGACHMOI = data.NGACHMOI;
        if (data.BAC_LG && data.BAC_LG != '') changes.BAC_LG = data.BAC_LG;
        if (data.HESO_LG && data.HESO_LG != '') changes.HESO_LG = data.HESO_LG;
        if (data.MOC_NANG_LG && data.MOC_NANG_LG != '') changes.MOC_NANG_LG = data.MOC_NANG_LG;
        if (data.NGAY_HUONG_LG && data.NGAY_HUONG_LG != '') changes.NGAY_HUONG_LG = data.NGAY_HUONG_LG;
        if (data.HD_KY_DEN && data.HD_KY_DEN != '') changes.HD_KY_DEN = data.HD_KY_DEN;
        if (data.VUOT_KHUNG && data.VUOT_KHUNG != '') changes.VUOT_KHUNG = data.VUOT_KHUNG;
        if (data.NGAY_HUONG_VK && data.NGAY_HUONG_VK != '') changes.NGAY_HUONG_VK = data.NGAY_HUONG_VK;
        if (data.PCTN_CU && data.PCTN_CU != '') changes.PCTN_CU = data.PCTN_CU;
        if (data.NGAY_PCTN_NEW && data.NGAY_PCTN_NEW != '') changes.NGAY_PCTN_NEW = data.NGAY_PCTN_NEW;
        if (data.PCTN_NEW && data.PCTN_NEW != '') changes.PCTN_NEW = data.PCTN_NEW;
        if (data.THOI_DIEM_TANG_1 && data.THOI_DIEM_TANG_1 != '') changes.THOI_DIEM_TANG_1 = data.THOI_DIEM_TANG_1;
        if (data.GHI_CHU_LG && data.GHI_CHU_LG != '') changes.GHI_CHU_LG = data.GHI_CHU_LG;
        if (data.TYLE_PCUD && data.TYLE_PCUD != '') changes.TYLE_PCUD = data.TYLE_PCUD;
        if (data.CHUC_VU_BCH_DANG_BO && data.CHUC_VU_BCH_DANG_BO != '') changes.CHUC_VU_BCH_DANG_BO = data.CHUC_VU_BCH_DANG_BO;
        if (data.CHUC_VU_BCH_CONG_DOAN && data.CHUC_VU_BCH_CONG_DOAN != '') changes.CHUC_VU_BCH_CONG_DOAN = data.CHUC_VU_BCH_CONG_DOAN;
        if (data.CHUC_VU_BCH_DOAN_TN && data.CHUC_VU_BCH_DOAN_TN != '') changes.CHUC_VU_BCH_DOAN_TN = data.CHUC_VU_BCH_DOAN_TN;
        if (data.PC_DOC_HAI && data.PC_DOC_HAI != '') changes.PC_DOC_HAI = data.PC_DOC_HAI;
        if (data.MOI_TRUONG_DOC_HAI && data.MOI_TRUONG_DOC_HAI != '') changes.MOI_TRUONG_DOC_HAI = data.MOI_TRUONG_DOC_HAI;
        if (data.MS_CVU && data.MS_CVU != '') changes.MS_CVU = data.MS_CVU;
        if (data.TEN_CV && data.TEN_CV != '') changes.TEN_CV = data.TEN_CV;
        if (data.NGAY_PCCV && data.NGAY_PCCV != '') changes.NGAY_PCCV = data.NGAY_PCCV;
        if (data.NUOC_NGOAI && data.NUOC_NGOAI != '') changes.NUOC_NGOAI = data.NUOC_NGOAI;
        if (data.TU_NGAY_NN && data.TU_NGAY_NN != '') changes.TU_NGAY_NN = data.TU_NGAY_NN;
        if (data.DEN_NGAY_NN && data.DEN_NGAY_NN != '') changes.DEN_NGAY_NN = data.DEN_NGAY_NN;
        if (data.NGAY_VE_THUC_TE_NN && data.NGAY_VE_THUC_TE_NN != '') changes.NGAY_VE_THUC_TE_NN = data.NGAY_VE_THUC_TE_NN;
        if (data.TUNGAY_KOLUONG && data.TUNGAY_KOLUONG != '') changes.TUNGAY_KOLUONG = data.TUNGAY_KOLUONG;
        if (data.DENNGAY_KOLUONG && data.DENNGAY_KOLUONG != '') changes.DENNGAY_KOLUONG = data.DENNGAY_KOLUONG;
        if (data.NGAYTIEPNHAN_KOLUONG && data.NGAYTIEPNHAN_KOLUONG != '') changes.NGAYTIEPNHAN_KOLUONG = data.NGAYTIEPNHAN_KOLUONG;
        if (data.PHUC_LOI && data.PHUC_LOI != '') changes.PHUC_LOI = data.PHUC_LOI;
        if (data.GHI_CHU_IN && data.GHI_CHU_IN != '') changes.GHI_CHU_IN = data.GHI_CHU_IN;
        if (data.MS_BM && data.MS_BM != '') changes.MS_BM = data.MS_BM;
        if (data.TDO_LLCT && data.TDO_LLCT != '') changes.TDO_LLCT = data.TDO_LLCT;
        if (data.TIN_HOC && data.TIN_HOC != '') changes.TIN_HOC = data.TIN_HOC;
        if (data.NGOAI_NGU && data.NGOAI_NGU != '') changes.NGOAI_NGU = data.NGOAI_NGU;
        if (data.GHI_CHU_NOP_BANG && data.GHI_CHU_NOP_BANG != '') changes.GHI_CHU_NOP_BANG = data.GHI_CHU_NOP_BANG;
        if (data.CONG_NHAN_BANG && data.CONG_NHAN_BANG != '') changes.CONG_NHAN_BANG = data.CONG_NHAN_BANG;
        if (data.CHUYEN_NGANH && data.CHUYEN_NGANH != '') changes.CHUYEN_NGANH = data.CHUYEN_NGANH;
        if (data.CD && data.CD != '') changes.CD = data.CD;
        if (data.KS && data.KS != '') changes.KS = data.KS;
        if (data.CH && data.CH != '') changes.CH = data.CH;
        if (data.TS && data.TS != '') changes.TS = data.TS;
        if (data.TSKH && data.TSKH != '') changes.TSKH = data.TSKH;
        if (data.TC && data.TC != '') changes.TC = data.TC;
        if (data.KHAC && data.KHAC != '') changes.KHAC = data.KHAC;
        if (data.GS && data.GS != '') changes.GS = data.GS;
        if (data.PGS && data.PGS != '') changes.PGS = data.PGS;
        if (data.GVC && data.GVC != '') changes.GVC = data.GVC;
        if (data.GV && data.GV != '') changes.GV = data.GV;
        if (data.GVTH && data.GVTH != '') changes.GVTH = data.GVTH;
        if (data.TG && data.TG != '') changes.TG = data.TG;
        if (data.NVC && data.NVC != '') changes.NVC = data.NVC;
        if (data.CVC && data.CVC != '') changes.CVC = data.CVC;
        if (data.TG_QUANDOI && data.TG_QUANDOI != '') changes.TG_QUANDOI = data.TG_QUANDOI;
        if (data.CAP_BAC && data.CAP_BAC != '') changes.CAP_BAC = data.CAP_BAC;
        if (data.HUY_CHUONG_SNGD && data.HUY_CHUONG_SNGD != '') changes.HUY_CHUONG_SNGD = data.HUY_CHUONG_SNGD;
        if (data.NGND && data.NGND != '') changes.NGND = data.NGND;
        if (data.NGUT && data.NGUT != '') changes.NGUT = data.NGUT;
        if (data.SO_THE && data.SO_THE != '') changes.SO_THE = data.SO_THE;
        if (data.NGAY_DANG_DB && data.NGAY_DANG_DB != '') changes.NGAY_DANG_DB = data.NGAY_DANG_DB;
        if (data.NOI_DANG_DB && data.NOI_DANG_DB != '') changes.NOI_DANG_DB = data.NOI_DANG_DB;
        if (data.DANG_VIEN && data.DANG_VIEN != '') changes.DANG_VIEN = data.DANG_VIEN;
        if (data.NGAY_DANG_CT && data.NGAY_DANG_CT != '') changes.NGAY_DANG_CT = data.NGAY_DANG_CT;
        if (data.NOI_DANG_CT && data.NOI_DANG_CT != '') changes.NOI_DANG_CT = data.NOI_DANG_CT;
        if (data.DOAN_VIEN && data.DOAN_VIEN != '') changes.DOAN_VIEN = data.DOAN_VIEN;
        if (data.NGAY_DOAN && data.NGAY_DOAN != '') changes.NGAY_DOAN = data.NGAY_DOAN;
        if (data.NOI_DOAN && data.NOI_DOAN != '') changes.NOI_DOAN = data.NOI_DOAN;
        if (data.NOI_DKHK && data.NOI_DKHK != '') changes.NOI_DKHK = data.NOI_DKHK;
        if (data.DC_HIENTAI && data.DC_HIENTAI != '') changes.DC_HIENTAI = data.DC_HIENTAI;
        if (data.DIEN_THOAI && data.DIEN_THOAI != '') changes.DIEN_THOAI = data.DIEN_THOAI;
        if (data.EMAIL && data.EMAIL != '') changes.EMAIL = data.EMAIL;
        if (data.NGUYEN_QUAN && data.NGUYEN_QUAN != '') changes.NGUYEN_QUAN = data.NGUYEN_QUAN;
        if (data.SO_CMND && data.SO_CMND != '') changes.SO_CMND = data.SO_CMND;
        if (data.NOI_NGAYCAP && data.NOI_NGAYCAP != '') changes.NOI_NGAYCAP = data.NOI_NGAYCAP;
        if (data.DANTOC && data.DANTOC != '') changes.DANTOC = data.DANTOC;
        if (data.TON_GIAO && data.TON_GIAO != '') changes.TON_GIAO = data.TON_GIAO;
        if (data.CHA_TEN && data.CHA_TEN != '') changes.CHA_TEN = data.CHA_TEN;
        if (data.CHA_NAM_SINH && data.CHA_NAM_SINH != '') changes.CHA_NAM_SINH = data.CHA_NAM_SINH;
        if (data.CHA_NNGHIEP && data.CHA_NNGHIEP != '') changes.CHA_NNGHIEP = data.CHA_NNGHIEP;
        if (data.CHA_CONGTAC && data.CHA_CONGTAC != '') changes.CHA_CONGTAC = data.CHA_CONGTAC;
        if (data.ME_TEN && data.ME_TEN != '') changes.ME_TEN = data.ME_TEN;
        if (data.ME_NAM_SINH && data.ME_NAM_SINH != '') changes.ME_NAM_SINH = data.ME_NAM_SINH;
        if (data.ME_NNGHIEP && data.ME_NNGHIEP != '') changes.ME_NNGHIEP = data.ME_NNGHIEP;
        if (data.ME_CONGTAC && data.ME_CONGTAC != '') changes.ME_CONGTAC = data.ME_CONGTAC;
        if (data.VC_TEN && data.VC_TEN != '') changes.VC_TEN = data.VC_TEN;
        if (data.VC_NAMSINH && data.VC_NAMSINH != '') changes.VC_NAMSINH = data.VC_NAMSINH;
        if (data.VC_NNGHIEP && data.VC_NNGHIEP != '') changes.VC_NNGHIEP = data.VC_NNGHIEP;
        if (data.VC_CONGTAC && data.VC_CONGTAC != '') changes.VC_CONGTAC = data.VC_CONGTAC;
        if (data.SO_SO_HK && data.SO_SO_HK != '') changes.SO_SO_HK = data.SO_SO_HK;
        if (data.HOTEN_CHU_HO_HK && data.HOTEN_CHU_HO_HK != '') changes.HOTEN_CHU_HO_HK = data.HOTEN_CHU_HO_HK;
        if (data.LOAI_GIAY_TO && data.LOAI_GIAY_TO != '') changes.LOAI_GIAY_TO = data.LOAI_GIAY_TO;
        if (data.MA_TINH_BV && data.MA_TINH_BV != '') changes.MA_TINH_BV = data.MA_TINH_BV;
        if (data.QUOC_TICH && data.QUOC_TICH != '') changes.QUOC_TICH = data.QUOC_TICH;
        if (data.TRA_THE_BHYT && data.TRA_THE_BHYT != '') changes.TRA_THE_BHYT = data.TRA_THE_BHYT;
        if (data.MA_BV && data.MA_BV != '') changes.MA_BV = data.MA_BV;
        if (data.MASO_BHXH && data.MASO_BHXH != '') changes.MASO_BHXH = data.MASO_BHXH;
        if (data.GHI_CHU_NOP_SO_BHXH && data.GHI_CHU_NOP_SO_BHXH != '') changes.GHI_CHU_NOP_SO_BHXH = data.GHI_CHU_NOP_SO_BHXH;
        if (data.SO_BHXH && data.SO_BHXH != '') changes.SO_BHXH = data.SO_BHXH;
        if (data.NO_PC && data.NO_PC != '') changes.NO_PC = data.NO_PC;
        if (data.NO_DONG_BHXH && data.NO_DONG_BHXH != '') changes.NO_DONG_BHXH = data.NO_DONG_BHXH;
        if (data.GHICHU_BHXH && data.GHICHU_BHXH != '') changes.GHICHU_BHXH = data.GHICHU_BHXH;
        if (data.NO_BHXH && data.NO_BHXH != '') changes.NO_BHXH = data.NO_BHXH;
        if (data.GHICHU_KY_HIEU && data.GHICHU_KY_HIEU != '') changes.GHICHU_KY_HIEU = data.GHICHU_KY_HIEU;
        if (data.HIEULUC_GD_HD && data.HIEULUC_GD_HD != '') changes.HIEULUC_GD_HD = data.HIEULUC_GD_HD;
        if (data.TANG && data.TANG != '') changes.TANG = data.TANG;
        if (data.KH_TANG && data.KH_TANG != '') changes.KH_TANG = data.KH_TANG;
        if (data.GIAM && data.GIAM != '') changes.GIAM = data.GIAM;
        if (data.KH_GIAM && data.KH_GIAM != '') changes.KH_GIAM = data.KH_GIAM;
        if (data.SO_QH_HD && data.SO_QH_HD != '') changes.SO_QH_HD = data.SO_QH_HD;
        if (data.NGAY_KY_QH_HD && data.NGAY_KY_QH_HD != '') changes.NGAY_KY_QH_HD = data.NGAY_KY_QH_HD;
        if (data.NGAY_NHAP_HS && data.NGAY_NHAP_HS != '') changes.NGAY_NHAP_HS = data.NGAY_NHAP_HS;
        if (data.DONG_BHXH && data.DONG_BHXH != '') changes.DONG_BHXH = data.DONG_BHXH;
        if (data.HL_DEN_NGAY && data.HL_DEN_NGAY != '') changes.HL_DEN_NGAY = data.HL_DEN_NGAY;
        if (data.DIEN_GIAI_HD && data.DIEN_GIAI_HD != '') changes.DIEN_GIAI_HD = data.DIEN_GIAI_HD;

        app.model.cbcnv.update(req.body._id, changes, (error, cbcnv) => {
            if (error) res.send(error);
            else res.send(cbcnv);
        })
    })
}