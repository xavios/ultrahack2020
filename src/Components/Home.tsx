import React, { FC, ReactElement } from "react";

import homeImage from '../karacsony2020_web-hero-image.jpg';

const Home : FC = (): ReactElement => {    
    return (
        <img src={homeImage} className="img-fluid" alt="Home page" />
        
    ) 
 };
 
 export default Home;