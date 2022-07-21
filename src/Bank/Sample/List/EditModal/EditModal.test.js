import React from 'react';
import { render, screen } from 'test-utils';
import EditModal from './EditModal';

test('render update', () => {
    render(
        <EditModal
            isNewSample={false}
            data={{
                sample: { nameLat: 'Vulpes vulpes', code: 'A00003', lat: 28.87483, lon: 53.9893 },
                species: [{ nameLat: 'Vulpes vulpes' }],
                type: 'mammal',
            }}
            onClose={() => {}}
            onSave={() => {}}
            open={true}
            loading={false}
            serverGeneralError={''}
            serverValidationErrors={{}}
        />
    );

    expect(screen.getByText('samplesUpdateTitle')).toBeInTheDocument();
});

test('render create', () => {
    render(
        <EditModal
            isNewSample={true}
            data={{
                sample: { nameLat: 'Vulpes vulpes', code: 'A00003', lat: 28.87483, lon: 53.9893 },
                species: [{ nameLat: 'Vulpes vulpes' }],
                type: 'mammal',
            }}
            onClose={() => {}}
            onSave={() => {}}
            open={true}
            loading={false}
            serverGeneralError={''}
            serverValidationErrors={{}}
        />
    );

    expect(screen.getByText('samplesCreateTitle')).toBeInTheDocument();
});
