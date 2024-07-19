import React from "react";
import { BiPhoneCall, BiUserCircle, BiCog } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer bg-light ">
      <div className="container-fluid">
        <div className="row-footer text-center">
          <div className="col">
            <BiPhoneCall size="2em" className="text-success" />
          </div>
          <div className="col">
            <BiUserCircle size="2em" />
          </div>
          <div className="col">
            <BiCog size="2em" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
