import React from 'react';
import { render } from 'test-utils';
import SamplesTable from './SamplesTable';

test('render SamplesTable', () => {
    render(
        <SamplesTable
            visible={true}
            loading={false}
            canManageData={true}
            selected={{}}
            columns={['code', 'nameLat']}
            orderBy={'code'}
            order={'asc'}
            itemActions={[]}
            samples={[]}
            handleSelectOne={() => {}}
            handleSelectAll={() => {}}
            areSelectedAll={false}
            handleSort={() => {}}
            emptyRowsCount={0}
        />
    );
});
