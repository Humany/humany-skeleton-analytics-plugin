// import settings from './settings';
import { AnalyticsPlugin, LegacyAnalyticsPlugin } from '@humany/widget-plugins';

const MODE = 'LEGACY';
// const MODE = 'WEBPROVISIONS';

const clearButton = document.getElementById('clear-button');

if (clearButton) {
  clearButton.addEventListener('click', function () {
    const outputElem = document.getElementById('output');
    const inputs = outputElem.getElementsByTagName('input');

    for (var input of inputs) {
      input.value = '';
    }
  });
}

const humany = window.Humany;
if (!humany) {
  console.error('No Humany installation is available on the page.');
}

if (MODE === 'WEBPROVISIONS') {
  /* Webprovisions */
  humany.configure('*', config => {
    config.plugin(AnalyticsPlugin, {
      eventCallbacks: {
        openWidget: ({ location }) => {
          console.log('Bound: openWidget', location);
        },
        openGuide: ({ guide, categories, location }) => {
          console.log('Bound: guide', guide, location, categories)
        },
        giveGuideFeedback: ({ guide, categories, feedbackType, location }) => {
          console.log('Bound: giveGuideFeedback', guide, categories);
        },
        contactMethodEnter: ({ contactMethod, location }) => {
          console.log('Bound: contactMethodEnter');
        },
        contactMethodComplete: ({ contactMethod, location }) => {
          console.log('Bound: contactMethodComplete');
        },
        search: ({ phrase, hits, categories, location }) => {
          // TODO: should categories really emitted
          console.log('Bound: search', phrase, hits, categories, location)
        },
        searchResultClick: ({ position, guide, location }) => {
          console.log('Bound: searchResultClick', position, guide);
        },
      }
    });
  });
} else if (MODE === 'LEGACY') {
  /* Legacy */
  humany.configure(config => {
    const analyticsPluginSettings = {
      eventCallbacks: {
        openWidget: ({ location }) => {
          console.log('Bound: openWidget', location);

          const inputElem = document.getElementById('input-open-widget-location');
        },
        openGuide: ({ guide, categories, location }) => {
          console.log('Bound: guide', guide, location, categories);

          const guideInputElem = document.getElementById('input-open-guide-guide');
          const categoriesInputElem = document.getElementById('input-open-guide-categories');
          guideInputElem.value = JSON.stringify(guide);
          categoriesInputElem.value = JSON.stringify(categories);
        },
        giveGuideFeedback: ({ guide, categories, feedbackType, location }) => {
          console.log('Bound: giveGuideFeedback', guide, categories);

          const guideInputElem = document.getElementById('input-give-guide-feedback-guide');
          const categoriesInputElem = document.getElementById('input-give-guide-feedback-categories');
          const feedbackTypeInputElem = document.getElementById('input-give-guide-feedback-feedback-type');
          guideInputElem.value = JSON.stringify(guide);
          categoriesInputElem.value = JSON.stringify(categories);
          feedbackTypeInputElem.value = JSON.stringify(feedbackType);
        },
        contactMethodEnter: ({ contactMethod, location }) => {
          console.log('Bound: contactMethodEnter');
          const contactMethodInputElem = document.getElementById('input-contact-method-enter-contact-method');
          contactMethodInputElem.value = JSON.stringify(contactMethod);
        },
        contactMethodComplete: ({ contactMethod, location }) => {
          console.log('Bound: contactMethodComplete');

          const contactMethodInputElem = document.getElementById('input-contact-method-complete-contact-method');
          contactMethodInputElem.value = JSON.stringify(contactMethod);
        },
        search: ({ phrase, hits, location }) => {
          console.log('Bound: search', phrase, hits, location);

          const phraseInputElem = document.getElementById('input-search-phrase');
          const hitsInputElem = document.getElementById('input-search-hits');
          phraseInputElem.value = JSON.stringify(phrase);
          hitsInputElem.value = JSON.stringify(hits);
        },
        searchResultClick: ({ position, guide, location }) => {
          console.log('Bound: searchResultClick', position, guide);

          const positionInputElem = document.getElementById('input-search-result-click-position');
          const guideInputElem = document.getElementById('input-search-result-click-guide');
          positionInputElem.value = JSON.stringify(position);
          guideInputElem.value = JSON.stringify(guide);
        },
      }
    };

    const legacyAnalyticsPlugin = new LegacyAnalyticsPlugin(analyticsPluginSettings);
    config.registerPlugin(legacyAnalyticsPlugin);
  });
}


