import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { matchPath, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUserName, ChangeName, ChangePassword } from 'User';
import { useAuth } from 'Auth';
import { sampleTypes } from 'Bank';
import { AppBar, Container, Box, Toolbar, Divider, LogoutIcon, req, urls } from 'Common';
import routes from 'routes';
import BankLogo from './BankLogo';
import DropdownMenu from './DropdownMenu';
import AvatarMenu from './AvatarMenu';
import MobileMenu from './MobileMenu';
import RegularMenuItem from './RegularMenuItem';

const appBarStyle = {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    justifyContent: 'space-between',
};
const toolbarStyle = {
    justifyContent: 'space-between',
};

const rightBoxStyle = { flexGrow: 0, justifyContent: 'flex-end', display: 'flex' };
const bankBoxStyle = { display: { xs: 'none', md: 'flex' } };
const logoWrapperStyle = { flexGrow: 1, display: { xs: 'flex', md: 'none' } };
const logoWrapperStyleMobile = { mr: 2, display: { xs: 'none', md: 'flex' } };

const initModals = {
    changeName: {
        open: false,
    },
    changePassword: {
        open: false,
    },
};

function Header() {
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname;
    const userName = useSelector(selectUserName);
    const { logout, loggedIn } = useAuth();
    const [modals, setModals] = useState(initModals);
    const navigate = useNavigate();

    const toggleModal = (name, open) => {
        const newModals = { ...modals };
        newModals[name].open = open;
        setModals(newModals);
    };
    const openChangeName = () => {
        toggleModal('changeName', true);
    };
    const closeChangeName = () => {
        toggleModal('changeName', false);
    };
    const openChangePassword = () => {
        toggleModal('changePassword', true);
    };
    const closeChangePassword = () => {
        toggleModal('changePassword', false);
    };

    const handleLogout = () => {
        req(urls.LOGOUT.path, urls.LOGOUT.method).then(() => {
            logout();
            navigate(routes.LOGIN);
        });
    };

    const bankItems = [
        { label: t('menuBird'), url: routes.BANK.replace(':type', sampleTypes.BIRD).replace(':page', 'list') },
        { label: t('menuMammal'), url: routes.BANK.replace(':type', sampleTypes.MAMMAL).replace(':page', 'list') },
        { label: t('menuPsrer'), url: routes.BANK.replace(':type', sampleTypes.PSRER).replace(':page', 'list') },
        { label: t('menuFish'), url: routes.BANK.replace(':type', sampleTypes.FISH).replace(':page', 'list') },
        { label: t('menuAi'), url: routes.BANK.replace(':type', sampleTypes.AI).replace(':page', 'list') },
    ];

    const userItems = [
        { label: t('menuChangeName'), onClick: openChangeName },
        { label: t('menuChangePassword'), onClick: openChangePassword },
        { component: <Divider key="divider" light /> },
        { label: t('menuLogout'), onClick: handleLogout, icon: <LogoutIcon fontSize="small" /> },
    ];

    return (
        <AppBar position="static" sx={appBarStyle} color="primary">
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={toolbarStyle}>
                    {/* MOBILE */}
                    <BankLogo styles={logoWrapperStyleMobile} />
                    <MobileMenu visible={loggedIn} menuItems={bankItems} />

                    {/* DESKTOP */}
                    <BankLogo styles={logoWrapperStyle} />

                    <Box sx={rightBoxStyle}>
                        <Box sx={bankBoxStyle}>
                            <DropdownMenu visible={loggedIn} title={t('menuBank')} menuItems={bankItems} />
                        </Box>

                        <AvatarMenu visible={loggedIn} menuItems={userItems} userName={userName} />

                        <RegularMenuItem
                            visible={!loggedIn && !!matchPath(routes.LOGIN, pathname)}
                            title={t('menuSignup')}
                            url={routes.SIGNUP}
                        />

                        <RegularMenuItem
                            visible={!loggedIn && !!matchPath(routes.SIGNUP, pathname)}
                            title={t('menuLogin')}
                            url={routes.LOGIN}
                        />
                    </Box>
                </Toolbar>
            </Container>

            <ChangeName visible={loggedIn} open={modals.changeName.open} onClose={closeChangeName} />

            <ChangePassword visible={loggedIn} open={modals.changePassword.open} onClose={closeChangePassword} />
        </AppBar>
    );
}

export default Header;
