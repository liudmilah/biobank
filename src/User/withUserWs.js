import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWs } from 'Common';
import { changeName, changePassword, selectUserId } from 'User';

const withUserWs = (Component) => {
    const Wrapped = (props) => {
        const { subscribe } = useWs();
        const userId = useSelector(selectUserId);
        const dispatch = useDispatch();

        useEffect(() => {
            if (userId) {
                const handlers = {
                    USER_NAME_CHANGED: handleNameChanged,
                    USER_PASSWORD_CHANGED: handlePasswordChanged,
                };

                subscribe(`user_${userId}`, handlers);
            }
        }, [userId]);

        function handleNameChanged(data) {
            dispatch(changeName(data));
        }
        function handlePasswordChanged(data) {
            dispatch(changePassword(data));
        }

        return <Component {...props} />;
    };

    Wrapped.displayName = 'WithUserWs';

    return Wrapped;
};

export default withUserWs;
