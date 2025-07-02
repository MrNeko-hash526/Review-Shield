import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    // Load user from localStorage when component mounts
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Set loading to false after checking
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Optional: remove auth token as well
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
