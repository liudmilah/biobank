import React from 'react';
import { render } from 'test-utils';
import List from './List';

test('render List', () => {
    render(<List type={'mammal'} visible={true} />);
});
