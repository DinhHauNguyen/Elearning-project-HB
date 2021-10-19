import React from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./ButtonShouldLogin.css";

class ButtonShouldLogin extends React.Component {
    render() {
        return (
            <NavLink to="/dangnhap">
                <Button variant="contained" color="secondary">
                    Đăng nhập
                </Button>
            </NavLink>
        )
    }
}
export default ButtonShouldLogin