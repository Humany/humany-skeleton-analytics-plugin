import { GoogleAnalyticsPlugin } from '@humany/widget-analytics';

const humany = window.humany;

humany.configure(config => {
  config.plugin(GoogleAnalyticsPlugin, {
    action: ({ type, resolve })  => {
      resolve()
        .then(data => {
          console.log('Action emitted:', type, data);
        });
    },
  });
});
