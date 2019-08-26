import { GoogleAnalyticsPlugin } from '@humany/widget-analytics';

const humany = window.humany;

if (!humany) {
  console.error('No Humany installation is available on the page.');
}

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
