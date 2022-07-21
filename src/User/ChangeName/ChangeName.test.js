import React from 'react';
import { render } from 'test-utils';
import ChangeName from './ChangeName';

test('render ChangeName', () => {
    render(<ChangeName visible={true} open={true} onClose={() => null} />);
});
