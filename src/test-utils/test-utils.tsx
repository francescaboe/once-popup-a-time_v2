import React, { ReactElement } from 'react';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';

// if the project is using react router and i18next, then the following imports are required, in order to add the providers to the custom render:

// REACT ROUTER
import { BrowserRouter } from 'react-router-dom';

// I18NEXT

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import enTranslations from '../../public/locales/en/translation.json'; // this requires "resolveJsonModule": true in tsconfig.json

// Initialize i18next for internationalization to pass to i18n provider
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  resources: {
    en: {
      translations: enTranslations,
    },
  },
});

// Wrapper component to provide BrowserRouter, i18n and any other necessary providers later on
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <>{children}</>
      </I18nextProvider>
    </BrowserRouter>
  );
};

// Custom render function that wraps the UI with AllTheProviders
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Export all from @testing-library/react and the custom render function
export * from '@testing-library/react';
export * from '@testing-library/user-event'; // supercharged fireEvent
export { customRender as render };

// import in test files as: import { render, ..any-other-testing-lib-method } from 'test-utils';
// import only valid if path is specified in jest.config and tsconfig.json
