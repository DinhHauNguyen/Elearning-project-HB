import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  layThongTinNguoiDungAction,
  huyDangKyKhoaHocAction,
  dangKyKhoaHocAction,
} from "../../../redux/Actions/NguoiDungActions";
import "./ChiTietKhoaHoc.Label.css";
import { Card, Button } from "antd";
import {
  VideoCameraOutlined,
  SnippetsOutlined,
  FolderOpenOutlined,
  ReloadOutlined,
  MobileOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { USER_LOGIN } from "../../../Ultity/ConfigWeb";

export default function ChiTietKhoaHocLabel(props) {
  let maKhoaHoc = props.maKhoaHoc;
  let chiTietKhoaHoc = props.chiTietKhoaHoc;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction(userNow.taiKhoan, maKhoaHoc));
  }, []);

  const dangKyKhoaHoc = (taiKhoan, maKhoaHoc) => {
    dispatch(dangKyKhoaHocAction(taiKhoan, maKhoaHoc, chiTietKhoaHoc));
  };
  const huyDangKyKhoaHoc = (taiKhoan, maKhoaHoc) => {
    dispatch(huyDangKyKhoaHocAction(taiKhoan, maKhoaHoc));
  };
  let userNow = useSelector((state) => state.NguoiDungReducer?.userLocal);

  let taiKhoanLocal = useSelector(
    (state) => state.NguoiDungReducer.thongTinTaiKhoan
  );
  let status = useSelector((state) => state.NguoiDungReducer.trangThaiKhoaHoc);
  return (
    <Card
      hoverable
      style={{ width: "90%" }}
      cover={<img src={props.chiTietKhoaHoc.hinhAnh} alt="example" />}
      className="label-img"
    >
      {localStorage.getItem(USER_LOGIN) ? (
        status === false ? (
          <Button
            className="label-button_add"
            type="primary"
            onClick={() => {
              {
                dangKyKhoaHoc(
                  taiKhoanLocal.taiKhoan,
                  props.chiTietKhoaHoc.maKhoaHoc
                );
              }
            }}
          >
            GHI DANH
          </Button>
        ) : (
          <Button
            className="label-button_add"
            type="danger"
            onClick={() => {
              {
                huyDangKyKhoaHoc(
                  taiKhoanLocal.taiKhoan,
                  props.chiTietKhoaHoc.maKhoaHoc
                );
              }
            }}
          >
            H???Y
          </Button>
        )
      ) : (
        <NavLink to="/dangnhap">
          <Button className="label-button_buy" type="default">
            ????ng nh???p
          </Button>
        </NavLink>
      )}

      <div className="label-detail">
        <p>Kh??a h???c n??y bao g???m: </p>
        <ul>
          <li>
            <span>
              <VideoCameraOutlined />
            </span>
            8.5 gi??? h???c Video
          </li>
          <li>
            <span>
              <SnippetsOutlined />
            </span>
            26 Ph???n
          </li>
          <li>
            <span>
              <FolderOpenOutlined />
            </span>
            4 Ngu???n download t??i li???u
          </li>
          <li>
            <span>
              <ReloadOutlined />
            </span>
            Quy???n truy c???p c??? ?????i
          </li>
          <li>
            <span>
              <MobileOutlined />
            </span>
            Ph?? h???p tr??n PC v?? mobile
          </li>
          <li>
            <span>
              <FireOutlined />
            </span>
            C???p ch???ng ch??? khi ho??n th??nh kh??a h???c
          </li>
        </ul>
      </div>
    </Card>
  );
}
