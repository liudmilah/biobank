import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider, Login, Signup, ResetPassword, ResetPasswordConfirm, SignupConfirm, useAuth } from 'Auth';
import { NotFound, Loading, Layout, WsProvider, FeaturesProvider } from 'Common';
import { Bank } from 'Bank';
import routes from 'routes';
import store from 'store';
import './index.css';

const theme = createTheme({
    palette: {
        primary: {
            light: '#256bb0',
            main: '#20558a',
            dark: '#194067',
            contrastText: '#fff',
        },
        secondary: {
            light: '#fa6825',
            main: '#D55D24',
            dark: '#b74e1f',
            contrastText: '#fff',
        },
    },
});

function Content() {
    const { loggedIn, loading } = useAuth();

    return (
        <>
            <Loading visible={loading} />

            {!loading && loggedIn && (
                <Routes>
                    <Route exact path={routes.BANK} element={<Bank />} />
                    <Route index element={<Bank />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}

            {!loading && !loggedIn && (
                <Routes>
                    <Route exact path={routes.LOGIN} element={<Login />} />
                    <Route exact path={routes.SIGNUP} element={<Signup />} />
                    <Route exact path={routes.SIGNUP_CONFIRM} element={<SignupConfirm />} />
                    <Route exact path={routes.RESET_PASSWORD} element={<ResetPassword />} />
                    <Route exact path={routes.RESET_PASSWORD_CONFIRM} element={<ResetPasswordConfirm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}
        </>
    );
}

function App({ features }) {
    return (
        <FeaturesProvider features={features}>
            <Suspense fallback={<Loading />}>
                <StoreProvider store={store}>
                    <AuthProvider>
                        <WsProvider url={`ws://${process.env.REACT_APP_FRONTEND_URL}/centrifugo/connection/websocket`}>
                            <ThemeProvider theme={theme}>
                                <BrowserRouter>
                                    <Layout>
                                        <Content />
                                    </Layout>
                                </BrowserRouter>
                            </ThemeProvider>
                        </WsProvider>
                    </AuthProvider>
                </StoreProvider>
            </Suspense>
        </FeaturesProvider>
    );
}

App.propTypes = {
    features: PropTypes.array.isRequired,
};

App.whyDidYouRender = true;

export default App;
