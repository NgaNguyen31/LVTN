module.exports = app => {
    app.get('/admin/khoi_luong_gd_caohoc/page/:pageNumber/:pageSize', app.role.isAdmin, (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
            pageSize = parseInt(req.params.pageSize);
        app.model.khoi_luong_gd_caohoc.getPage(pageNumber, pageSize, {}, (error, page) => res.send({ error, page }));
    });

    app.get('/admin/khoi_luong_gd_caohoc/all', app.role.isAdmin, (req, res) => {
        app.model.khoi_luong_gd_caohoc.getAll((error, khoi_luong_gd_caohoc) => {
            if (error) res.send({error});
            else res.send({khoi_luong_gd_caohoc});
        })
    })

    app.post('/admin/khoi_luong_gd_caohoc', app.role.isAdmin, (req, res) => {
        console.log('data', req.body.khoi_luong_gd_caohoc);
        
        app.model.khoi_luong_gd_caohoc.create(req.body.khoi_luong_gd_caohoc, (error, khoi_luong_gd_caohoc) => {
            console.log('in',khoi_luong_gd_caohoc);
            
            res.send({ error, khoi_luong_gd_caohoc })
        });
    });

    app.put('/admin/khoi_luong_gd_caohoc', app.role.isAdmin, (req, res) => {
        let data = req.body.changes,
            changes = {};
        if (data.MSNV) changes.MSNV = data.MSNV;
        data.HO && data.HO != '' && (changes.HO = data.HO);
        data.TEN && data.TEN != '' && (changes.TEN = data.TEN);
        if (data.Hocvi_hocham) changes.Hocvi_hocham = data.Hocvi_hocham;
        data.Mon_giangday && data.Mon_giangday != '' && (changes.Mon_giangday = data.Mon_giangday);
        if (data.Day_khoa) changes.Day_khoa = data.Day_khoa;
        data.Nganh_day && data.Nganh_day != '' && (changes.Nganh_day = data.Nganh_day);
        data.Don_vi && data.Don_vi != '' && (changes.Don_vi = data.Don_vi);
        data.St_day_LT_thucte && data.St_day_LT_thucte != '' && (changes.St_day_LT_thucte = data.St_day_LT_thucte);
        data.St_day_TH && data.St_day_TH != '' && (changes.St_day_TH = data.St_day_TH);
        data.St_qui_doi_giangday && data.St_qui_doi_giangday != '' && (changes.St_qui_doi_giangday = data.St_qui_doi_giangday);
        data.Slg_tieu_luan && data.Slg_tieu_luan != '' && (changes.Slg_tieu_luan = data.Slg_tieu_luan);
        data.Tong_st_quidoi && data.Tong_st_quidoi != '' && (changes.Tong_st_quidoi = data.Tong_st_quidoi);
        data.Tong_cong && data.Tong_cong != '' && (changes.Tong_cong = data.Tong_cong);
        data.Ghi_chu && data.Ghi_chu != '' && (changes.Ghi_chu = data.Ghi_chu);

        app.model.khoi_luong_gd_caohoc.update(req.body._id, changes, (error, khoi_luong_gd_caohoc) => {
            if (error) {
                res.send({ error });
            } else {
                res.send({ error, khoi_luong_gd_caohoc });
            }
        })
    });

    app.delete('/admin/khoi_luong_gd_caohoc', app.role.isAdmin, (req, res) => {
        app.model.khoi_luong_gd_caohoc.delete(req.body._id, error => res.send({ error }))
    }
    );
};