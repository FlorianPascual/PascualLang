// popup.js

document.addEventListener('DOMContentLoaded', () => {
  // Load existing settings
  chrome.storage.sync.get(['tone', 'apiKey', 'preset'], (data) => {
    document.getElementById('apiKey').value = data.apiKey || '';
    const preset = data.preset || 'charles';
    const presetRadios = document.getElementsByName('preset');

    presetRadios.forEach((radio) => {
      if (radio.value === preset) {
        radio.checked = true;
      }
    });

    if (preset === 'custom') {
      document.getElementById('customToneSection').style.display = 'block';
      document.getElementById('tone').value = data.tone || '';
    } else {
      document.getElementById('customToneSection').style.display = 'none';
    }
  });

  // Add event listeners for preset changes
  const presetRadios = document.getElementsByName('preset');
  presetRadios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      const preset = event.target.value;
      if (preset === 'custom') {
        document.getElementById('customToneSection').style.display = 'block';
      } else {
        document.getElementById('customToneSection').style.display = 'none';
      }
    });
  });

  document.getElementById('save').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    let preset = 'charles';
    const presetRadios = document.getElementsByName('preset');
    presetRadios.forEach((radio) => {
      if (radio.checked) {
        preset = radio.value;
      }
    });

    let tone = '';
    if (preset === 'custom') {
      tone = document.getElementById('tone').value;
    }

    chrome.storage.sync.set({ tone: tone, apiKey: apiKey, preset: preset }, () => {
      alert('Settings saved.');
    });
  });
});
