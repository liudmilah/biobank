import React from 'react';
import { render } from 'test-utils';
import Statistics from './Statistics';

test('render Statistics', () => {
    render(<Statistics type={'mammal'} visible={true} />);
});
