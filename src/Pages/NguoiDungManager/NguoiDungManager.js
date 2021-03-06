import React, { useEffect, useState } from "react";

// Component and Library
import SearchNguoiDung from "../../Components/SearchNguoiDung/SearchNguoiDung";
import ModalNguoiDung from "../../Components/ModalNguoiDung/ModalNguoiDung";
import ModalSuaNguoiDung from "../../Components/ModalSuaNguoiDung/ModalSuaNguoiDung";
import { Table, Tag, Space } from "antd";
import "./NguoiDungManager.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// Modal
import { Modal } from "antd";

import {
  deleteUserAction,
  layDanhSachNguoiDungAction,
} from "../../redux/Actions/AdminAction";
import "./NguoiDungManager.css";
import Loading from "../../Components/Loading/Loading";
import TabNguoiDungModal from "../../Components/TabNguoiDungModal/TabNguoiDungModel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function NguoiDungManager(props) {
  //Modal add user
  const [visible, setVisible] = React.useState(false);
  //Modal edit
  const [edit, setedit] = React.useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  //Modal course
  const [more, setMore] = React.useState(false);
  // function show all modal
  const showModal = (status, data) => {
    if (status === 1) {
      setVisible(true);
    } else if (status === 0) {
      setedit(true);
    } else if (status === 2) {
      setMore(true);
      setDataModal(data);
    }
  };
  // function Close all modal
  const handleCancel = (e) => {
    setVisible(false);
    setedit(false);
    setMore(false);
  };
  //---------------------------Reducer-------------------------------------//
  // Get user List
  const danhSachNguoiDung = useSelector(
    (state) => state.AdminReducer.danhSachNguoiDung
  );
  // get user search
  const danhSachNguoiDungSearch = useSelector(
    (state) => state.AdminReducer.danhSachNguoiDungSearch
  );
  //creat Loading table
  const [done, setDone] = useState(undefined);
  //dispatch v?? useEffect
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(layDanhSachNguoiDungAction());
      setDone(true);
    }, 1800);
  }, [done]);
  const [dataModal, setDataModal] = useState(null);
  //data of table user
  const columns = [
    {
      title: "T??i Kho???n",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "H??? t??n",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 200,
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "soDt",
      key: "soDt",
      responsive: ["lg"],
    },
    {
      title: "Lo???i ng?????i d??ng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (maLoaiNguoiDung) => (
        <>
          <Tag
            color={maLoaiNguoiDung === "HV" ? "red" : "green"}
            className="d-flex justify-content-center w-50"
          >
            {maLoaiNguoiDung}
          </Tag>
        </>
      ),
      filters: [
        {
          text: "H???c vi??n",
          value: "HV",
        },
        {
          text: "Gi??o v???",
          value: "GV",
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
    },
    {
      title: "Thao t??c",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            className="text-warning"
            onClick={() => {
              showModal(0, text);
              setDataEdit(text);
            }}
          >
            S???a
          </a>
          <a className="text-danger" onClick={() => deleteUser(text.taiKhoan)}>
            X??a
          </a>
          <a
            className="text-primary"
            onClick={() => {
              showModal(2, text.taiKhoan);
            }}
          >
            Kh??a h???c
          </a>
        </Space>
      ),
    },
  ];
  var data = danhSachNguoiDung;
  if (danhSachNguoiDungSearch === null) {
    data = danhSachNguoiDung;
  } else {
    data = danhSachNguoiDungSearch;
  }

  //------------------------------UserAction----------------------------------//
  // Delete User
  const deleteUser = (taiKhoan) => {
    dispatch(deleteUserAction(taiKhoan, setDone));
  };
  return (
    <div className="container-fluid">
      <div className="form_admin">
        <div className="row">
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
            <div className="bg-card bg-card1">
              <div className="bg-text">
                <h3>45</h3>
                <span>B??i gi???ng tr???c tuy???n</span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
            <div className="bg-card bg-card2">
              <div className="bg-text">
                <h3>100</h3>
                <span>Gi???ng vi??n</span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
            <div className="bg-card bg-card3">
              <div className="bg-text">
                <h3>5000+</h3>
                <span>H???c vi??n</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2 justify-content-center">
          <div className="col-lg-10">
            <SearchNguoiDung loading={setDone} />
          </div>
          <div className="col-lg-2 justify-content-center d-flex">
            <button
              className="btnAddUser"
              onClick={() => {
                showModal(1);
              }}
            >
              Th??m ng?????i d??ng
            </button>
          </div>
        </div>
        <div>
          {!done ? (
            <Loading />
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                total: data?.length,
                pageSize: 7,
                hideOnSinglePage: true,
              }}
            />
          )}
        </div>
      </div>
      <ModalNguoiDung
        visible={visible}
        handleCancel={handleCancel}
        setDone={setDone}
      />
      <ModalSuaNguoiDung
        visible={edit}
        dataEdit={dataEdit}
        handleCancel={handleCancel}
        setDone={setDone}
      />
      <Modal
        title="Th??ng tin kh??a h???c"
        visible={more}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
        cancelText="H???y b???"
        className="modal_course"
      >
        {/* <TabNguoiDungModal data={dataModal} /> */}
        <TabNguoiDungModal data={dataModal}></TabNguoiDungModal>
        
      </Modal>
    </div>
  );
}
