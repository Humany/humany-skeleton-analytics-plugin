import { LegacyAnalyticsPlugin } from '@humany/widget-tracking';

import { callbacks, setup } from './shared';

setup();

const humany = window.Humany;

humany.configure(config => {
  const analyticsPluginSettings = {
    action: ({ type, args, location })  => {
      console.log('ACTION DISPATCHED', type, args, location);

      const invokable = callbacks[type];

      if (typeof invokable === 'function') {
        invokable(args);
      }
    },
    navigate: ({ type, args }) => {
      console.log('NAVIGATE DISPATCHED', type, args, location);
    },
  };

  const legacyAnalyticsPlugin = new LegacyAnalyticsPlugin(analyticsPluginSettings);
  config.registerPlugin(legacyAnalyticsPlugin);
});

