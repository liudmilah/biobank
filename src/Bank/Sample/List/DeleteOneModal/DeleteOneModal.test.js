import React from 'react';
import { render } from 'test-utils';
import DeleteOneModal from './DeleteOneModal';

test('render DeleteOneModal', () => {
    render(
        <DeleteOneModal
            data={{ sample: { nameLat: 'Vulpes vulpes', code: 'A00003' } }}
            onClose={() => {}}
            open={true}
            loading={false}
            onConfirm={() => {}}
            serverGeneralError={''}
        />
    );
});
