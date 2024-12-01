// content.js

// Inject the processing icon into text inputs
function injectIcon(input) {
  if (input.dataset.iconInjected) return; // Prevent duplicate processing
  input.dataset.iconInjected = 'true'; // Mark as processed

  // Create the icon
  const icon = document.createElement('img');
  icon.src = chrome.runtime.getURL('icons/icon16.png');
  icon.alt = 'Process Text';
  icon.title = 'Click to enhance or translate text';
  icon.style.position = 'absolute';
  icon.style.cursor = 'pointer';
  icon.style.width = '16px';
  icon.style.height = '16px';
  icon.style.right = '5px';
  icon.style.top = '50%';
  icon.style.transform = 'translateY(-50%)';
  icon.style.zIndex = '1000';

  // Create a wrapper to handle positioning
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.style.display = 'inline-block';
  wrapper.style.width = input.offsetWidth + 'px';

  // Wrap the input and append the icon
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);
  wrapper.appendChild(icon);

  // Add click event to process the text
  icon.addEventListener('click', () => {
    processInput(input);
  });
}

// Process the input text with user-defined settings
function processInput(input) {
  const text = input.value || input.innerText;

  chrome.storage.sync.get(['tone', 'apiKey', 'preset'], (data) => {
    let prompt = data.tone || '';
    const apiKey = data.apiKey || '';
    const preset = data.preset || 'charles';

    // Use preset prompts if applicable
    if (preset && preset !== 'custom') {
      prompt = getPresetPrompt(preset);
    }

    // Show an alert if the API key is missing
    if (!apiKey) {
      alert('Please set your OpenAI API key in the extension popup.');
      return;
    }

    let action = 'enhance';
    let content = text;
    let targetLanguage = '';

    // Detect if the user is using the /translate command
    const translateRegex = /^\/translate(?: to ([^\s]+))?\s+(.+)/i;
    const translateMatch = text.match(translateRegex);

    if (translateMatch) {
      action = 'translate';
      targetLanguage = translateMatch[1] || 'English';
      content = translateMatch[2];
    }

    // Send a message to the background script to process the text
    chrome.runtime.sendMessage(
      {
        action: 'processText',
        text: content,
        prompt: prompt,
        apiKey: apiKey,
        processType: action,
        targetLanguage: targetLanguage
      },
      (response) => {
        if (response && response.result) {
          // Replace the original text with the processed text
          if (input.value !== undefined) {
            input.value = response.result;
          } else {
            input.innerText = response.result;
          }
        } else {
          alert(response.error || 'Error processing text.');
        }
      }
    );
  });
}

// Get the preset-specific prompt
function getPresetPrompt(preset) {
  switch (preset) {
    case 'charles':
      return 'Write in a professional and informal tone.';
    case 'cindy':
      return 'Write informally like a youngster, using plenty of emojis.';
    case 'maxime':
      return 'Use a standard and balanced tone.';
    case 'kevin-momo':
      return 'Use slang, talk casually, and include intentional basic writing mistakes.';
    default:
      return '';
  }
}

// Observe DOM changes to inject icons into dynamically added inputs
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      if (
        node.matches &&
        (node.matches('input[type="text"], input[type="search"], textarea, [contenteditable="true"]'))
      ) {
        injectIcon(node);
      } else if (node.querySelectorAll) {
        node
          .querySelectorAll('input[type="text"], input[type="search"], textarea, [contenteditable="true"]')
          .forEach((input) => {
            injectIcon(input);
          });
      }
    });
  });
});

// Start observing the DOM for changes
observer.observe(document.body, { childList: true, subtree: true });

// Inject icons into existing inputs on page load
document
  .querySelectorAll('input[type="text"], input[type="search"], textarea, [contenteditable="true"]')
  .forEach((input) => {
    injectIcon(input);
  });

// Listen for the keyboard shortcut to process the currently focused input
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'triggerProcessing') {
    const activeElement = document.activeElement;

    if (
      activeElement &&
      (activeElement.matches('input[type="text"], input[type="search"], textarea') ||
        activeElement.isContentEditable)
    ) {
      processInput(activeElement);
    }
  }
});
