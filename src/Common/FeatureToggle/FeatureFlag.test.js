import React from 'react';
import { render } from 'test-utils';
import FeatureFlag from 'Common/FeatureToggle/FeatureFlag';
import FeaturesProvider from 'Common/FeatureToggle/FeaturesProvider';

test('renders content if feature is active', () => {
    const { container } = render(
        <FeaturesProvider features={['FEATURE']}>
            <FeatureFlag name="FEATURE">Content</FeatureFlag>
        </FeaturesProvider>
    );

    expect(container).toHaveTextContent(/Content/);
});

test('does not render content if feature is not active', () => {
    const { container } = render(
        <FeaturesProvider features={[]}>
            <FeatureFlag name="FEATURE">Content</FeatureFlag>
        </FeaturesProvider>
    );

    expect(container).not.toHaveTextContent(/Content/);
});

test('does not render content in not mode', () => {
    const { container } = render(
        <FeaturesProvider features={['FEATURE']}>
            <FeatureFlag name="FEATURE" not>
                Content
            </FeatureFlag>
        </FeaturesProvider>
    );

    expect(container).not.toHaveTextContent(/Content/);
});

test('renders content in not mode', () => {
    const { container } = render(
        <FeaturesProvider features={[]}>
            <FeatureFlag name="FEATURE" not>
                Content
            </FeatureFlag>
        </FeaturesProvider>
    );

    expect(container).toHaveTextContent(/Content/);
});
