# **PascualLang - Chrome & Firefox Extension**

![PascualLang Logo](icons/icon128.png)

**PascualLang** is a powerful browser extension designed to improve your text input across the web. Whether you’re writing an email, crafting a social media post, or participating in an online chat, PascualLang refines your text, corrects grammar, and can even translate it seamlessly—all with customizable tones and styles.

---

## **Key Features**

- **Customizable Text Tones**: Choose from presets like:
  - **Charles**: Professional and formal.
  - **Cindy**: Informal with youthful vibes and emojis.
  - **Maxime**: Balanced and neutral tone.
  - **Kevin-Momo**: Casual with slang and intentional mistakes.
  - Or create your own custom tone!
  
- **Language-Aware Editing**: Refines text while maintaining the original language (e.g., French remains French).
  
- **Seamless Translation**: Use `/translate to [language]` to translate any text while applying the selected tone.

- **Grammar Corrections**: Automatically fixes grammar issues unless otherwise specified.

- **Intuitive UI**: Add the enhancement icon to text fields or use the keyboard shortcut (`Ctrl+Shift+Y` on Windows/Linux or `Command+Shift+Y` on macOS).

- **Cross-Browser Support**: Available for both Chrome and Firefox.

---

## **How to Install**

### **Google Chrome**
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore/) (link to be added after publishing).
2. Click **Add to Chrome**.
3. Pin the extension to your toolbar for quick access.

### **Firefox**
1. Visit the [Firefox Add-ons Store](https://addons.mozilla.org/) (link to be added after publishing).
2. Click **Add to Firefox**.
3. Allow necessary permissions when prompted.

---

## **How to Use**

1. **Activate the Extension**: Click the Text Enhancer icon in your browser toolbar or use the shortcut (`Ctrl+Shift+Y`/`Command+Shift+Y`).
2. **Set Your Preferences**:
   - Select a tone preset or create your own custom tone.
   - Optionally save your OpenAI API key for advanced features.
3. **Enhance Your Text**:
   - Type your text in any input field (e.g., Gmail, WhatsApp Web).
   - Click the enhancement icon or use the keyboard shortcut to process the text.
4. **Translate on the Fly**:
   - Use `/translate to [language]` to translate text into the specified language while keeping the desired tone.

---

## **Development**

### **Technologies Used**
- **Manifest V3** for Chrome Extension.
- **JavaScript** for content and background scripts.
- **HTML/CSS** for the popup interface.
- **OpenAI API** for text refinement and translation.

---

## **Setup for Local Development**

### **Prerequisites**
- Google Chrome or Firefox browser.
- Node.js (if you plan to enhance the code with modern JavaScript tooling).

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/FlorianPascual/PascualLang.git
2. Navigate to the project folder:
   ```bash
   cd PascualLang
3. **Load the extension:**
   - **For Chrome:**
     1. Go to `chrome://extensions/` in your Chrome browser.
     2. Enable **Developer mode** by toggling the switch in the top-right corner.
     3. Click **Load unpacked** and select the root folder of your project (where `manifest.json` is located).
     4. The extension should now appear in the list of installed extensions.

   - **For Firefox:**
     1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
     2. Click **Load Temporary Add-on**.
     3. Select the `manifest.json` file in your project folder.
     4. The extension will be temporarily added and active until the browser is restarted.

4. **Test the Extension:**
   - Visit a website with text input fields (e.g., Gmail or WhatsApp Web).
   - Type text into an input field.
   - Use the enhancement icon or keyboard shortcut (`Ctrl+Shift+Y` or `Command+Shift+Y`) to process the text.
   - Test the `/translate to [language]` command in a text field.

5. **Make Changes and Debug:**
   - Use your browser's Developer Tools (`F12`) to debug the extension.
   - Make code changes in your local files and reload the extension to test updates.
