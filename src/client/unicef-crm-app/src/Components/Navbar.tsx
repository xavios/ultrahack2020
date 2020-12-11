import React, { FC, ReactElement } from 'react';
import { NavbarConstants } from '../NavbarConstants';

type NavbarProps = {
    selectedItem: string;
    onClick: (selectedItem: string) => void;
}

const Navbar : FC<NavbarProps> = (props): ReactElement => {    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand" onClick={() => props.onClick(NavbarConstants.home)}>{NavbarConstants.home}</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <span className={props.selectedItem === NavbarConstants.calendar ? 'nav-link active' : 'nav-link'}                                                
                          onClick={() => props.onClick(NavbarConstants.calendar)}>{NavbarConstants.calendar}</span>
                </li>
                <li className="nav-item">
                    <span className={props.selectedItem === NavbarConstants.myProfile ? 'nav-link active' : 'nav-link'}                        
                          onClick={() => props.onClick(NavbarConstants.myProfile)}>{NavbarConstants.myProfile}</span>
                </li>
                <li className="nav-item">
                    <span className={props.selectedItem === NavbarConstants.registration ? 'nav-link active' : 'nav-link'}                        
                          onClick={() => props.onClick(NavbarConstants.registration)}>{NavbarConstants.registration}</span>
                </li>
                <li className="nav-item">
                    <span className={props.selectedItem === NavbarConstants.tasks ? 'nav-link active' : 'nav-link'}                        
                          onClick={() => props.onClick(NavbarConstants.tasks)}>{NavbarConstants.tasks}</span>
                </li>
                </ul>
            </div>
        </nav>
    );    
};

export default Navbar;