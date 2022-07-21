import React from 'react';
import { render, screen } from 'test-utils';
import DeleteSelectedModal from './DeleteSelectedModal';

test('render DeleteSelectedModal', () => {
    render(
        <DeleteSelectedModal
            onClose={() => {}}
            open={true}
            loading={false}
            onConfirm={() => {}}
            serverGeneralError={''}
        />
    );

    expect(screen.getByText('samplesDeleteSelectedConfirm')).toBeInTheDocument();
});
