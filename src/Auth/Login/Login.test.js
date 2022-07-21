import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'test-utils';
import Login from './Login';

test('render Login', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
});
