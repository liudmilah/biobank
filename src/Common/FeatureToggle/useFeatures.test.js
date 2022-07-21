import React from 'react';
import { render } from 'test-utils';
import FeaturesProvider from 'Common/FeatureToggle/FeaturesProvider';
import useFeatures from './useFeatures';

test('read features', () => {
    const Component = () => {
        const features = useFeatures();
        return features.toString();
    };

    const { container } = render(
        <FeaturesProvider features={['ONE', 'TWO']}>
            <Component />
        </FeaturesProvider>
    );

    expect(container).toHaveTextContent('ONE,TWO');
});
