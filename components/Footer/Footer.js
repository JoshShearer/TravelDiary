import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';
import styled from "styled-components";


export default class Footer extends React.Component{
    render (){
        return (
            <div className="botNav">
                <NavWrapper className="navbar navbar-expand-lg justify-content-between">
                    <ul className="navbar-nav">
                        <li className="nav-item ml-5 border rounded">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item ml-5 border rounded">
                            <Link to='/newEntry' className="nav-link">
                                Add Entry
                            </Link>                
                        </li>
                    </ul>
                </NavWrapper>
            </div>
        )
    }
}

const NavWrapper = styled.nav `
background:var(--lightOrange);
.nav-link{
    color:var(--mainWhite);
}
`;