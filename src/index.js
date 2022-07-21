import React from 'react';
import { createRoot } from 'react-dom/client';
import cookie from 'cookie';
import { mergeFeatures } from 'Common';
import { App } from 'App';
import defaultFeatures from './features';
import './wdyr';

const container = document.getElementById('root');
const root = createRoot(container);

const cookies = cookie.parse(document.cookie);
const cookieFeatures = (cookies.features || '').split(/\s*,\s*/g).filter(Boolean);

const features = mergeFeatures(defaultFeatures, cookieFeatures);

// todo removed React.StrictMode because of yandex map https://github.com/gribnoysup/react-yandex-maps/issues/333
root.render(<App features={features} />);
