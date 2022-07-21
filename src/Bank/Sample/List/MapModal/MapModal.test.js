import React from 'react';
import { render, screen } from 'test-utils';
import MapModal from './MapModal';

test('render MapModal', () => {
    render(
        <MapModal
            data={{ sample: { nameLat: 'Vulpes vulpes', code: 'A00003' }, samples: [] }}
            onClose={() => {}}
            open={true}
            loading={false}
            serverGeneralError={''}
        />
    );

    expect(screen.getByText('Vulpes vulpes')).toBeInTheDocument();
});
