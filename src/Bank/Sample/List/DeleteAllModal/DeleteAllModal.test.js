import React from 'react';
import { render, screen } from 'test-utils';
import DeleteAllModal from './DeleteAllModal';

test('render DeleteAllModal', () => {
    render(
        <DeleteAllModal onClose={() => {}} open={true} loading={false} onConfirm={() => {}} serverGeneralError={''} />
    );

    expect(screen.getByText('samplesDeleteAllConfirm')).toBeInTheDocument();
});
