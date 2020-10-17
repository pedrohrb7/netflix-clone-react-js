import React from 'react';
import './Header.css';
import NetflixLogo from '../assets/netflix_logo.png';

export default ({ bgBlack }) => {

    return (
        <header className={bgBlack ? 'bg-header' : ''}>
            <div className="header-logo">
                <a href="/">
                    <img src={NetflixLogo} alt='netflix-logo' />
                </a>
            </div>
        </header>
    )
}