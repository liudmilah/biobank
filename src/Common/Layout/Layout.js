import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'Common';
import { Footer } from './Footer';
import { Header } from './Header';

const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%',
    backgroundColor: '#f6f6f6',
};
const containerStyle = { flex: '1 1 auto', mt: '20px' };

const Layout = ({ children }) => {
    return (
        <div style={layoutStyle}>
            <Header />

            <Container maxWidth="lg" sx={containerStyle}>
                {children}
            </Container>

            <Footer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
