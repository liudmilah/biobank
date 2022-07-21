import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'User';
import { req, urls } from 'Common';
import { selectLoggedIn, updateLoggedIn } from '../authSlice';
import AuthContext from './AuthContext';

function AuthProvider(props) {
    const dispatch = useDispatch();
    const loggedIn = useSelector(selectLoggedIn);
    const [loading, setLoading] = useState(true);

    const getUser = () => {
        setLoading(true);

        req(urls.GET_USER.path, urls.GET_USER.method)
            .then(handleUserFetched)
            .catch(logout)
            .finally(() => {
                setLoading(false);
            });
    };

    const login = () => {
        getUser();
    };

    const logout = () => {
        window.localStorage.setItem('loggedIn', 'false');
        dispatch(updateLoggedIn({ loggedIn: false }));
    };

    const handleUserFetched = (data) => {
        dispatch(updateUser(data));
        window.localStorage.setItem('loggedIn', 'true');
        dispatch(updateLoggedIn({ loggedIn: true }));
    };

    React.useEffect(() => {
        getUser();
    }, []);

    const contextValue = useMemo(
        () => ({
            login,
            logout,
            loading,
            loggedIn,
        }),
        [loggedIn, login, logout, loading]
    );

    return <AuthContext.Provider value={contextValue} {...props} />;
}

export default AuthProvider;
