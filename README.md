# A Birthday Delivery for Saule

A small interactive birthday card built for Saule Sulcaite. It uses original SVG artwork, a short identity-verification sequence, clickable birthday jokes, and a Groq-powered penguin assistant.

## What is included

- Responsive GitHub Pages frontend
- Original penguin, cat and bicycle SVG assets
- Three-question Saule verification sequence
- Interactive books, laptop, bicycle, car keys, food and 29 July sections
- Final birthday message from Omkar
- Google Apps Script backend for Groq
- Editable custom assistant instructions
- No photographs, tracking or external image assets

## Repository structure

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── bicycle.svg
│   ├── cat.svg
│   └── penguin.svg
└── backend/
    ├── Code.gs
    └── appsscript.json
```

## Preview through GitHub Pages

1. Open the repository settings.
2. Open **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder.
5. Save.

The static card works without the backend. Until the Apps Script URL is added, the penguin chat explains that it is not connected yet.

## Set up the Groq backend

### 1. Create the Apps Script project

1. Open Google Apps Script and create a blank project.
2. Replace the default `Code.gs` with the contents of `backend/Code.gs`.
3. Open **Project Settings** and enable **Show "appsscript.json" manifest file in editor**.
4. Replace the manifest with `backend/appsscript.json`.

### 2. Store the Groq API key securely

In Apps Script:

1. Open **Project Settings**.
2. Under **Script Properties**, add:
   - Property: `GROQ_API_KEY`
   - Value: your Groq API key
3. Optional model override:
   - Property: `GROQ_MODEL`
   - Value: `llama-3.3-70b-versatile`

Never put the Groq API key in `script.js` or commit it to GitHub.

### 3. Deploy the web app

1. Select **Deploy → New deployment**.
2. Choose **Web app**.
3. Execute as: **Me**.
4. Who has access: **Anyone**.
5. Deploy and copy the URL ending in `/exec`.

### 4. Connect the frontend

Open `script.js` and update:

```js
const CONFIG = {
  backendUrl: "PASTE_YOUR_APPS_SCRIPT_EXEC_URL_HERE",
  assistantName: "The Birthday Penguin",
  maxHistory: 10
};
```

Commit the change and refresh the GitHub Pages site.

## Editing the assistant personality

The custom instructions are near the top of `backend/Code.gs` in:

```js
const PENGUIN_SYSTEM_INSTRUCTIONS = `...`;
```

The frontend never sends system instructions. This prevents visitors from replacing the intended assistant personality through the browser.

## Security notes

- The API key remains in Apps Script Properties.
- Incoming messages are length-limited and conversation history is capped.
- The backend applies a small per-session rate limit.
- Client-supplied system messages are ignored.
- The public frontend contains no personal photographs or analytics.
