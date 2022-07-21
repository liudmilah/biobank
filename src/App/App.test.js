import React from 'react';
import { render } from 'test-utils';
import App from './App';

test('render App', () => {
    render(<App features={[]} />);
});
