module.exports = app =>{
    const schema = app.db.Schema({
        NGHI: { type: app.db.Schema.ObjectId, ref: 'nghi_ctac' },
        TAM_NGUNG: Number,
        IS_NNGOAI: String,
        IN_NUOC: String,
        LOAI: { type: app.db.Schema.ObjectId, ref: 'loai' },
        SHCC: { type: app.db.Schema.ObjectId, ref: 'pctn_nghe_2018' },
        MS_NV: String,
        MS_NV_CU: String,
        HO: String,
        TEN: String,
        PHAI: String,
        NGAY_SINH: Date,
        XA_PHUONG_NOISINH: String,
        QUAN_HUYEN_NOISINH: String,
        NOI_SINH_TINH_TP: String,
        NGAY_BD_CT: Date,
        NGAY_VAO: Date,
        NGAY_BC: Date,
        NGAY_CBGD: Date,
        NGAY_NGHI: Date,
        GIAY_TT_RA_TRUONG: String,
        So_BHXH_LD: String,
        THU_BHXH: String,
        CHUC_DANH: { type: app.db.Schema.ObjectId, ref: 'chucdanh' },
        TRINH_DO: { type: app.db.Schema.ObjectId, ref: 'trinhdo' },
        NGACH: { type: app.db.Schema.ObjectId, ref: 'ngach' },
        NGACHMOI: String,
        BAC_LG: Number,
        HESO_LG: Number,//?
        MOC_NANG_LG: Date,
        NGAY_HUONG_LG: Date,
        HD_KY_DEN: Date,
        VUOT_KHUNG: Number,
        NGAY_HUONG_VK: Date,
        PCTN_CU: Number,//?
        NGAY_PCTN_NEW: Date,
        PCTN_NEW: Number,
        THOI_DIEM_TANG_1: Date,
        GHI_CHU_LG: String,
        TYLE_PCUD: Number,
        CHUC_VU_BCH_DANG_BO: String,
        CHUC_VU_BCH_CONG_DOAN: String,
        CHUC_VU_BCH_DOAN_TN: String,
        PC_DOC_HAI: Number,
        MOI_TRUONG_DOC_HAI: String,
        MS_CVU: { type: app.db.Schema.ObjectId, ref: 'chucvu' },
        TEN_CV: String, 
        PCCV: Number,
        NGAY_PCCV: Date,
        NUOC_NGOAI: String,
        TU_NGAY_NN: Date,
        DEN_NGAY_NN: Date,
        NGAY_VE_THUC_TE_NN: Date,
        TUNGAY_KOLUONG: Date,
        DENNGAY_KOLUONG: Date,
        NGAYTIEPNHAN_KOLUONG: Date,
        PHUC_LOI: String,
        GHI_CHU_IN: String,
        MS_BM: { type: app.db.Schema.ObjectId, ref: 'bomon' },
        TDO_LLCT: String,
        TIN_HOC: String,
        NGOAI_NGU: String,
        GHI_CHU_NOP_BANG: String,
        CONG_NHAN_BANG: String,
        CHUYEN_NGANH: String,
        CD: String,
        KS: String,
        CH: String,
        TS: String,
        TSKH: String,
        TC: String,
        KHAC: String,
        GS: Date,
        PGS: Date,
        GVC: Date,
        GV: Date,
        GVTH: Date,
        TG: Date,
        NVC: Date,
        CVC: Date ,
        TG_QUANDOI: Date,
        CAP_BAC: String,
        HUY_CHUONG_SNGD: Date,
        NGND: Date,
        NGUT: Date,
        SO_THE: Number,
        NGAY_DANG_DB: Date,
        NOI_DANG_DB: String,
        DANG_VIEN: String,
        NGAY_DANG_CT: Date,
        NOI_DANG_CT: String,
        DOAN_VIEN: String,
        NGAY_DOAN: Date,
        NOI_DOAN: String,
        NOI_DKHK: String,
        DC_HIENTAI: String,
        DIEN_THOAI: String,
        EMAIL: String,
        NGUYEN_QUAN: String,
        SO_CMND: String,
        NOI_NGAYCAP: String,
        DANTOC:{ type: app.db.Schema.ObjectId, ref: 'dantoc' },
        TON_GIAO: { type: app.db.Schema.ObjectId, ref: 'tongiao' },
        CHA_TEN: String,
        CHA_NAM_SINH: Date,
        CHA_NNGHIEP: String,
        CHA_CONGTAC: String,
        ME_TEN: String,
        ME_NAM_SINH: Date,
        ME_NNGHIEP: String,
        ME_CONGTAC: String,
        VC_TEN: String,
        VC_NAMSINH: Date,
        VC_NNGHIEP: String,
        VC_CONGTAC: String,
        SO_SO_HK: String,
        HOTEN_CHU_HO_HK: String,
        LOAI_GIAY_TO: Number,
        MA_TINH_BV: Number,//?
        QUOC_TICH: String,
        TRA_THE_BHYT: String,
        MA_BV: { type: app.db.Schema.ObjectId, ref: 'benhvien' },
        MASO_BHXH: String,//?
        GHI_CHU_NOP_SO_BHXH: String,
        SO_BHXH: Number,
        NO_PC: String,
        NO_DONG_BHXH: String,
        GHICHU_BHXH: String,
        NO_BHXH: Boolean,
        GHICHU_KY_HIEU: String,
        HIEULUC_GD_HD: Date,
        TANG: String,//?
        KH_TANG: String,
        GIAM: String,//?
        KH_GIAM: String,
        SO_QH_HD: String,
        NGAY_KY_QH_HD: Date,
        NGAY_NHAP_HS: Date,
        DONG_BHXH: String,
        HL_DEN_NGAY: Date,
        DIEN_GIAI_HD: Number
    });
    const model = app.db.model('cbcnv',schema);

    app.model.cbcnv = {
        create: (data, done) => {
            model.find({
                $or : [
                    {
                        MS_NV: data.MS_NV                        
                    }                    
                ]
            }, (error, items) => {
                if (items.length > 0) {
                    if (done) done('Exist', items);
                }
                else{
                    model.create(data,done)
                }
            })},
        getPage: (pageNumber, pageSize, condition, done) => model.countDocuments(condition, (error, totalItem) => {
            if (error) {
                done(error);
            } else {
                let result = {
                    totalItem,
                    pageSize,
                    pageTotal: Math.ceil(totalItem / pageSize)
                };
                result.pageNumber = pageNumber === -1 ? result.pageTotal : Math.min(pageNumber, result.pageTotal);

                const skipNumber = (result.pageNumber > 0 ? result.pageNumber - 1 : 0) * result.pageSize;
                model.find(condition).sort({ _id: 1 }).populate(['NGHI', 'LOAI', 'SHCC', 'CHUC_DANH', 'TRINH_DO', 'NGACH', 'MS_CVU', 'MS_BM', 'DANTOC', 'TON_GIAO', 'MA_BV']).skip(skipNumber).limit(result.pageSize).exec((error, list) => {
                    result.list = list;
                    done(error, result);
                });
            }
        }),
        getAll: (done) => model.find({},done),
        get: (_id,done) => model.findById(_id,done),
        update: (_id, changes, done) =>  {
            model.find({
            $or : [
                {
                    MS_NV: changes.MS_NV                        
                }                    
            ]
            }, (error, items) => {
            if (items.length > 0) {
                if (done) done('Exist', items);
            }
            else{
                model.findOneAndUpdate({ _id }, { $set: changes }, { new: true }, done)
            }
        })},
        delete: (_id, done) => model.findById(_id, (error, item) => {
            if (error) {
                done(error);
            } else if (item == null) {
                done('Invalid Id!');
            } else {
                item.remove(done);
            }
        }),

        count: (condition, done) => done ? model.countDocuments(condition, done) : model.countDocuments({}, condition),
    };
};