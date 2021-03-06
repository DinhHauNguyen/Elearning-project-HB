import {
  LAY_DANH_MUC_KHOA_HOC,
  LAY_DANH_SACH,
  LAY_CHI_TIET_KHOA_HOC,
  LAY_KHOA_HOC_THEO_MUC,
  LAY_KHOA_HOC_THEO_SEARCH,
} from "../Constants/KhoaHocConstants";
import { DOMAIN, USER_LOGIN } from "../../Ultity/ConfigWeb";

import axios from "axios";

import swal from "sweetalert";
export const layDanhMucKhoaHocAction = () => {
  return async (dispatch) => {
    let { data } = await axios(
      "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc"
    );
    dispatch({
      type: LAY_DANH_MUC_KHOA_HOC,
      danhMucKhoaHoc: data,
    });
  };
};

export const layDanhSachKhoaHocAction = () => {
  return async (dispatch) => {
    let { data } = await axios(
      "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP05"
    );
    dispatch({
      type: LAY_DANH_SACH,
      dsKhoaHoc: data,
    });
  };
};

export const layChiTietKhoaHocAction = (maKhoaHoc) => {
  return async (dispatch) => {
    let { data } = await axios.get(
      `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
    );
    dispatch({
      type: LAY_CHI_TIET_KHOA_HOC,
      chiTietKhoaHoc: data,
    });
  };
};
export const layKhoaHocTheoMucAction = (maDanhMuc, setDone) => {
  return (dispatch) => {
    try {
      axios({
        url:
          DOMAIN +
          `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP05`,
        method: "get",
      })
        .then((res) => {
          dispatch({
            type: LAY_KHOA_HOC_THEO_MUC,
            khoaHocTheoDanhMuc: res.data,
          });
        })
        .catch((err) =>
          dispatch({
            type: LAY_KHOA_HOC_THEO_MUC,
            khoaHocTheoDanhMuc: null,
          })
        );
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
export const layKhoaHocTheoSearchAction = (maDanhMuc, setDone) => {
  return (dispatch) => {
    try {
      axios({
        url:
          DOMAIN +
          `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP05`,
        method: "get",
      })
        .then((res) => {
          dispatch({
            type: LAY_KHOA_HOC_THEO_SEARCH,
            khoaHocTheoDanhMuc: res.data,
          });
        })
        .catch((err) =>
          dispatch({
            type: LAY_KHOA_HOC_THEO_SEARCH,
            khoaHocTheoDanhMuc: null,
          })
        );
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const khoaHocSearchAction = (tuKhoa) => {
  return (dispatch) => {
    try {
      axios({
        url:
          DOMAIN +
          `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tuKhoa}&MaNhom=GP05`,
        method: "get",
      })
        .then((res) => {
          let { data } = res;
          dispatch({
            type: "LAY_KHOA_HOC_SEARCH",
            khoaHoc: data,
            keyWord: tuKhoa,
          });
        })
        .catch((err) =>
          dispatch({
            type: LAY_KHOA_HOC_THEO_SEARCH,
            khoaHocTheoDanhMuc: null,
          })
        );
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
export const deleteCourseAction = (maKhoaHoc, setDone) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      swal({
        title: "B???n ch???c ch????",
        text: "Kh??a h???c n??y x??a kh??ng th??? kh??i ph???c l???i!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios({
            url: DOMAIN + `api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => {
              let { status } = res;
              if (status === 200) {
                swal("Th??nh c??ng", "X??a th??nh c??ng", "success");
              }
              layDanhSachKhoaHocAction();
              setDone(undefined);
            })
            .catch((err) => {
              swal("Th???t b???i", "Kh??ng th??? x??a kh??a h???c n??y", "warning");
            });
        }
      });
    } catch (error) {
      console.log("error");
    }
  };
};
