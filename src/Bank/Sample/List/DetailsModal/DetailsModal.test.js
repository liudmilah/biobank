import React from 'react';
import { render, screen } from 'test-utils';
import DetailsModal from './DetailsModal';

test('render DetailsModal', () => {
    render(
        <DetailsModal
            data={{ sample: { nameLat: 'Vulpes vulpes', code: 'A00003', lat: 28.87483, lon: 53.9893 }, type: 'mammal' }}
            onClose={() => {}}
            open={true}
            loading={false}
        />
    );

    expect(screen.getByText('Vulpes vulpes(A00003)')).toBeInTheDocument();
});
