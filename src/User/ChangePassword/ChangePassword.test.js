import React from 'react';
import { render } from 'test-utils';
import ChangePassword from './ChangePassword';

test('render ChangePassword', () => {
    render(<ChangePassword visible={true} open={true} onClose={() => null} />);
});
