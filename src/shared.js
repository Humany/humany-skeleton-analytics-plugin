const updateInputs = (prefix, data) => {
  Object.keys(data).forEach(key => {
    const input =  document.getElementById(`input-${prefix}-${key}`);
    input.value = JSON.stringify(data[key]);
  });
}

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

export const callbacks = {
  ReadGuide: (args) => eventCallbacks.openGuide(args),
  WidgetOpen: (args) => eventCallbacks.openWidget(args),
  Search: (args) => eventCallbacks.search(args),
  SearchResultClick: (args) => eventCallbacks.searchResultClick(args),
  ContactMethodEnter: (args) => eventCallbacks.contactMethodEnter(args),
  ContactMethodComplete: (args) => eventCallbacks.contactMethodComplete(args),
  FeedbackGiven: (args) => eventCallbacks.giveGuideFeedback(args),
}


export const setup = () => {
  if (!window.Humany) {
    console.error('No Humany installation is available on the page.');
  }

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
}