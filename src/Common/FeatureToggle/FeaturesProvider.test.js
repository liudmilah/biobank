import React from 'react';
import { render, screen } from 'test-utils';
import FeaturesProvider from 'Common/FeatureToggle/FeaturesProvider';
import FeaturesContext from './FeaturesContext';

test('passes features', () => {
    const features = ['ONE', 'TWO'];

    render(
        <FeaturesProvider features={features}>
            <FeaturesContext.Consumer>
                {(features) => <div data-testid="features">{features.toString()}</div>}
            </FeaturesContext.Consumer>
        </FeaturesProvider>
    );

    expect(screen.getByTestId('features')).toHaveTextContent('ONE,TWO');
});
