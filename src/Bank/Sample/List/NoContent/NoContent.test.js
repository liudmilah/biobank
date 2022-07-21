import React from 'react';
import { render } from 'test-utils';
import NoContent from './NoContent';

test('render NoContent', () => {
    render(<NoContent visible={true} openModal={() => null} modal={<div />} />);
});
