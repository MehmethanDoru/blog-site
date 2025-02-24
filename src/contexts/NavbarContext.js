'use client';

import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

export function NavbarProvider({ children }) {
    const [navbarKey, setNavbarKey] = useState(0);

    const refreshNavbar = () => {
        setNavbarKey(prevKey => prevKey + 1);
    };

    return (
        <NavbarContext.Provider value={{ navbarKey, refreshNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
}

export function useNavbar() {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }
    return context;
} 