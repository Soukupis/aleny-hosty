import React from "react"
import logo from "../../../assets/leaf.png";

const Header = () =>{
    return(
        <h1 className="ui header" style={{paddingBottom: "40px"}}>
            <img src={logo} alt="leaf-logo" className="ui circular image"/>
            Aleny Hosty
        </h1>
    );
}
export default Header;
