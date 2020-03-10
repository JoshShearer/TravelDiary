import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";


export default class Header extends React.Component{
    render (){
        return (
            <NavWrapper className="navbar navbar-expand-lg justify-content-between">
                <ul className="navbar-nav align-items-left">
                    <li className="nav-item ml-5 border rounded">
                        <Link to="/route" className="nav-link">
                            Route
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ml-5 border rounded">
                        <Link to='/entries' className="nav-link">
                            Entries
                        </Link>                
                    </li>
                </ul>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav`
background:var(--lightOrange);
.nav-link{
color:var(--mainWhite);
}
font-weight:bold;
`;