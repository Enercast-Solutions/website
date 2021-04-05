import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import "./footer.css";
const Footer = () => {
    return(
        <div className = "main-footer">

                <p className = 'col-sm'>
                    @Copy Right 2021 | All Rights Reserved
                </p>
                <Link className = 'col-sm'to={"/c/contactus"}>
                    Contact Us
                </Link>

        </div>
    )
}

export default Footer;
