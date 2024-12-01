chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'processText') {
    const { apiKey, prompt, text, processType, targetLanguage } = message;

    if (containsProfanity(prompt)) {
      sendResponse({
        result: null,
        error: 'You might violate OpenAI usage policies with this prompt.'
      });
      return;
    }

    let fullPrompt = '';

    if (processType === 'translate') {
      fullPrompt = `Translate the following text into ${targetLanguage} using the tone: "${prompt}". Text: "${text}"`;
    } else {
      // Detect the language explicitly
      fullPrompt = `
        Detect the language of the following text and rewrite it using the tone: "${prompt}".
        Correct any grammatical mistakes except if explicitly instructed to make them.
        Ensure the refined response is in the same language as the input text.
        Input Text: "${text}"
        Respond only in the detected language.
      `;
    }

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: fullPrompt }],
        temperature: 0.7
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          sendResponse({ result: null, error: data.error.message });
        } else {
          const result = data.choices[0].message.content.trim();
          sendResponse({ result: result });
        }
      })
      .catch((error) => {
        console.error(error);
        sendResponse({ result: null, error: 'Network error occurred.' });
      });

    return true; // Keeps the message channel open for sendResponse
  }
});

// Listen for the keyboard shortcut command
chrome.commands.onCommand.addListener((command) => {
  if (command === 'process_text_input') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'triggerProcessing' });
    });
  }
});

// Simple profanity detection function
function containsProfanity(text) {
  // A simple list of profane words; replace with a comprehensive list or use a library
  const profaneWords = ['badword1', 'badword2']; // Replace with actual words
  const regex = new RegExp(`\\b(${profaneWords.join('|')})\\b`, 'i');
  return regex.test(text);
}
