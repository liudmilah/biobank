import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'test-utils';
import SignupConfirm from './SignupConfirm';

test('render SignupConfirm', () => {
    render(
        <MemoryRouter>
            <SignupConfirm />
        </MemoryRouter>
    );
});
