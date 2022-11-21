import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";
import "../../App.css";
import Cart from "../pages/Cart";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Session ended successfully");
  };

  const icon = (
    <i className="fa fa-shopping-cart fa-2x text-white" aria-hidden="false"></i>
  );

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-2">
          <div className="navbar-brand mb-0 h1">
            <Link to={"/"}>
              <img
                src="./logosmall.png"
                width={150}
                height={85}
                alt="Stone Store"
              ></img>
            </Link>
          </div>
        </div>
        {user ? (
          <div className="ml-4 dropdown d-inline">
            <Link
              to="#!"
              className="btn dropdown-toggle text-white mr-4"
              type="button"
              id="dropDownMenu"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user.avatar && user.avatar.url}
                  alt={user && user.name}
                  className="rounded-circle"
                ></img>
              </figure>
              <span>{user && user.name}</span>
            </Link>
            <>
              <div className="col-md-1">
                <div className="dropdown-menu" aria-labelledby="dropDownMenu">
                  {/*Identify logged role*/}
                  {user && user.role === "admin" && (
                    <Link className="dropdown-item" to="/productos">
                      Adm. Products
                    </Link>
                  )}
                  <Link className="dropdown-item" to="/myOrders">
                    Orders
                  </Link>
                  <Link className="dropdown-item" to="/myAccount">
                    My Profile
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={logoutHandler}
                  >
                    Sign off
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6 mt-2 mt-md-0"></div>
              <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <span className="ml-5"></span>
                <div className="btn-group" role="group">
                  <DropdownButton
                    title={icon}
                    id="bg-nested-dropdown"
                    autoClose="outside"
                  >
                    <Dropdown.Item eventKey="1">
                      <Cart />
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </div>
            </>
          </div>
        ) : (
          !loading && (
            <Link to="/login" className="btn ml-4" id="login_btn">
              LOGIN
            </Link>
          )
        )}
      </nav>
    </Fragment>
  );
};

export default Header;
