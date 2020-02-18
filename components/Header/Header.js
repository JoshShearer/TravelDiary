import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";


export default class Header extends React.Component{
    render (){
        return (
            <NavWrapper className="navbar navbar-expand-lg navbar-dark px-sm-5">
                <ul className="navbar-nav align-items-left">
                    <li className="nav-item ml-5">
                        <Link to="/route" className="nav-link">
                            Route
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav align-items-right">
                    <li className="nav-item ml-5">
                        <Link to='/entries' className="nav-link">
                            Entries
                        </Link>                
                    </li>
                </ul>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav 
`background:var(--mainOrange);
.nav-link{
color:var(--white);
}
font-weight:bold;
`;