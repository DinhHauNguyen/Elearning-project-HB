import { combineReducers } from "redux";
import { KhoaHocReducer } from "./KhoaHocReducer";
import { DanhMucReducer } from "./DanhMucReducer";
import { NguoiDungReducer } from "./NguoiDungReducer";
import { AdminReducer } from "./AdminReducer";

export const rootReducer = combineReducers({
  DanhMucReducer,
  KhoaHocReducer,
  NguoiDungReducer,
  AdminReducer,
});
