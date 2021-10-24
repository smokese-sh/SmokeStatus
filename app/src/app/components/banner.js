import React from "react";

import Logo from "../assets/Logo";
import "../style.css";

export default function Banner() {


    return (
        <div className="bannerDiv">
            <Logo />
            <p className="bannerText">SmokeSe.sh</p>
        </div>
    )
}