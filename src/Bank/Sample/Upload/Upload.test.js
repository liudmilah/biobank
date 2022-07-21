import React from 'react';
import { render } from 'test-utils';
import Upload from './Upload';

test('render Upload', () => {
    render(<Upload type={'mammal'} visible={true} />);
});
