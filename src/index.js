import { TrackingPlugin } from '@humany/widget-tracking';

import { callbacks, setup } from './shared';

setup();

const humany = window.humany;

class CustomAnalyzer {
  constructor(container, emit) {
    const { events } = container.get('$widget');

    events.subscribe('widget:move-outside-viewport', (e, data) => {
      emit('MovedOutsideViewport', () => Promise.resolve({
        message: 'moved outside viewport',
      }));
    });
  }
}

humany.configure(config => {
  config.plugin(TrackingPlugin, {
    action: ({ type, resolve })  => {
      resolve().then(data => {
        console.log('ACTION DISPATCHED', type, data);

        if (typeof invokable === 'function') {
          invokable(data);
        }
      }).catch(error => {
        console.log('error in tracking plugin', error);
      });

      const invokable = callbacks[type];

    },
    analyzers: [CustomAnalyzer],
  });
});
