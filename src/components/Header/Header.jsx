import React from 'react';
import { NavLink, useLocation } from "react-router-dom";


export default function Header() {
    return (
        <header>
            <div>LOGO</div>
            <nav>
                <NavLink to="/">Accueil</NavLink>
                <NavLink to="/rules">Règlements</NavLink>
            </nav>
            <div>BOUTon</div>
        </header>
    )
}
