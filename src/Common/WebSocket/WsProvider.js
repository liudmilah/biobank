import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Centrifuge from 'centrifuge';
import { req, urls } from 'Common';
import { useAuth } from 'Auth';
import WsContext from './WsContext';

function WsProvider({ url, children }) {
    const { loggedIn } = useAuth();
    const [ws, setWs] = useState();
    const [subscriptions, setSubscriptions] = useState({});
    const [activeSubscriptions, setActiveSubscriptions] = useState([]);

    useEffect(() => {
        if (loggedIn && url) {
            req(urls.GET_WS_TOKEN.path, urls.GET_WS_TOKEN.method).then((data) => {
                const ws = new Centrifuge(url);
                ws.setToken(data.token);
                ws.connect();
                setWs(ws);
            });
        }
    }, [loggedIn]);

    useEffect(() => {
        if (ws) {
            wsSubscribe(subscriptions);
        }
    }, [ws]);

    const wsSubscribe = (newSubscriptions) => {
        Object.keys(newSubscriptions).forEach((channel) => {
            if (activeSubscriptions.indexOf(channel) > -1) {
                return;
            }

            ws.subscribe(channel, (message) => {
                console.info(`MESSAGE ws:${channel}`, message.data.event, message.data.payload);
                const handlers = newSubscriptions[channel];
                if (handlers[message.data.event]) {
                    handlers[message.data.event](message.data.payload);
                } else {
                    console.error(`Unknown event ${message.data.event}`);
                }
            });

            console.info(`SUBSCRIBE ws:${channel}`);
            setActiveSubscriptions(activeSubscriptions.concat([channel]));
        });
    };

    const subscribe = (channel, handlers) => {
        const newSubscriptions = { ...subscriptions };
        newSubscriptions[channel] = handlers;
        setSubscriptions(newSubscriptions);

        if (ws) {
            wsSubscribe(newSubscriptions);
        }
    };

    const contextValue = {
        subscribe,
    };

    return <WsContext.Provider value={contextValue}>{children}</WsContext.Provider>;
}

WsProvider.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.object,
};

export default WsProvider;
