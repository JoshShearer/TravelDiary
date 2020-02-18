import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';
import styled from "styled-components";


export default class Footer extends React.Component{
    render (){
        return (
            <div className="botNav">
                <NavWrapper className="navbar navbar-expand-lg navbar-dark px-sm-5">
                    <ul className="navbar-nav align-items-left">
                        <li className="nav-item ml-5">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item ml-5">
                            <Link to='/newEntry' className="nav-link">
                                Add Entry
                            </Link>                
                        </li>
                    </ul>
                    <ul className="navbar-nav justify-content-middle">
                        <li className="nav-item ml-5">
                            <Link to='/Settings' className="nav-link">
                                Setting
                            </Link>                
                        </li>
                    </ul>
                </NavWrapper>
            </div>
        )
    }
}

const NavWrapper = styled.nav `
background:var(--mainOrange);
.nav-link{
    color:var(--lightOrange);
}
`;