import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box, Typography } from 'Common';
import routes from 'routes';
import sampleTypes from './sampleTypes';
import { Samples, withSamplesWs, Upload, Statistics } from './Sample';

const headerStyle = { borderBottom: 1, borderColor: 'divider' };
const contentStyle = { padding: '20px 0' };

function Bank() {
    const { t } = useTranslation();
    const { type = sampleTypes.BIRD, page = 'list' } = useParams();
    const navigate = useNavigate();

    const tabItems = [
        {
            number: 0,
            page: 'list',
            label: t('samplesTitle'),
            component: <Samples type={type} visible={page === 'list'} />,
        },
        {
            number: 1,
            page: 'statistics',
            label: t('samplesStatisticsTitle'),
            component: <Statistics type={type} visible={page === 'statistics'} />,
        },
        {
            number: 2,
            page: 'upload',
            label: t('samplesUploadTitle'),
            component: <Upload type={type} visible={page === 'upload'} />,
        },
    ];

    const pageTitle = {
        [sampleTypes.AI]: t('menuAi'),
        [sampleTypes.BIRD]: t('menuBird'),
        [sampleTypes.FISH]: t('menuFish'),
        [sampleTypes.MAMMAL]: t('menuMammal'),
        [sampleTypes.PSRER]: t('menuPsrer'),
    };

    const currentTab = tabItems.find((item) => item.page === page);
    const tabNumber = currentTab ? currentTab.number : 0;

    const handleChange = (event, newTabNumber) => {
        const newTab = tabItems.find((item) => item.number === newTabNumber);
        navigate({ pathname: routes.BANK.replace(':type', type).replace(':page', newTab.page) });
    };

    return (
        <>
            <Typography variant="h5" gutterBottom component="div">
                {pageTitle[type]}
            </Typography>

            <Box sx={headerStyle}>
                <Tabs value={tabNumber} onChange={handleChange} aria-label="Tabs">
                    {tabItems.map((tab) => (
                        <Tab
                            label={tab.label}
                            id={`tab-${tab.number}`}
                            key={`tab-${tab.number}`}
                            aria-controls={`panel-${tab.number}`}
                        />
                    ))}
                </Tabs>
            </Box>

            <Box sx={contentStyle}>
                {tabItems.map((tab) => (
                    <div
                        key={`panel-${tab.number}`}
                        role="tabpanel"
                        hidden={tabNumber !== tab.number}
                        id={`panel-${tab.number}`}
                        aria-labelledby={`tab-${tab.number}`}
                    >
                        {tabNumber === tab.number && tab.component}
                    </div>
                ))}
            </Box>
        </>
    );
}

export default withSamplesWs(Bank);
