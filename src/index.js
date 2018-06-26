import { AnalyticsPlugin, LegacyAnalyticsPlugin } from '@humany/widget-tracking';

import settings from './settings';

const humany = window.Humany;
if (!humany) {
  console.error('No Humany installation is available on the page.');
}

const MODE = settings.webprovisionsEnabled ? 'WEBPROVISIONS' : 'LEGACY';

const clearButton = document.getElementById('clear-button');

const eventCallbacks = {
  openWidget: data => callback('openWidget', data),
  openGuide: data => callback('openGuide', data),
  giveGuideFeedback: data => callback('giveGuideFeedback', data),
  contactMethodEnter: data => callback('contactMethodEnter', data),
  contactMethodComplete: data => callback('contactMethodComplete', data),
  search: data => callback('search', data),
  searchResultClick: data => callback('searchResultClick', data),
};

const callback = (methodName, data) => {
  console.log('Bound:', methodName, data);
  updateInputs(methodName, data);
}

const updateInputs = (prefix, data) => {
  Object.keys(data).forEach(key => {
    const input =  document.getElementById(`input-${prefix}-${key}`);
    input.value = JSON.stringify(data[key]);
  });
}

if (clearButton) {
  clearButton.addEventListener('click', function () {
    const outputElem = document.getElementById('output');
    const inputs = outputElem.getElementsByTagName('input');

    for (var input of inputs) {
      input.value = '';
    }
  });
}

const callbackMap = {
  ReadGuide: (args) => eventCallbacks.openGuide(args),
  WidgetOpen: (args) => eventCallbacks.openWidget(args),
  Search: (args) => eventCallbacks.search(args),
  SearchResultClick: (args) => eventCallbacks.searchResultClick(args),
  ContactMethodEnter: (args) => eventCallbacks.contactMethodEnter(args),
  ContactMethodComplete: (args) => eventCallbacks.contactMethodComplete(args),
  FeedbackGiven: (args) => eventCallbacks.giveGuideFeedback(args),
}

if (MODE === 'WEBPROVISIONS') {
  /* Webprovisions */
  humany.configure('*', config => {
    config.plugin(AnalyticsPlugin, {
      action: ({ type, args, location })  => {
        console.log('ACTION DISPATCHED', type, args, location);

        const invokable = callbackMap[type];

        if (typeof invokable === 'function') {
          invokable(args);
        }
      },
      navigate: ({ type, args }) => {
        console.log('NAVIGATE DISPATCHED', type, args, location);
      },
    });
  });
} else if (MODE === 'LEGACY') {
  /* Legacy */
  humany.configure(config => {
    const analyticsPluginSettings = {
      eventCallbacks,
    };

    const legacyAnalyticsPlugin = new LegacyAnalyticsPlugin(analyticsPluginSettings);
    config.registerPlugin(legacyAnalyticsPlugin);
  });
}


