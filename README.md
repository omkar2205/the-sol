# A Birthday Delivery for Saule

An interactive birthday card for Saule Sulcaite, hosted through GitHub Pages with an optional Groq-powered Birthday Penguin.

## Included

- Responsive illustrated birthday experience
- Original penguin, black cat and bicycle SVG artwork
- Three-question recipient verification with a management bypass
- Clickable books, laptop, birthday committee, car keys, India flag and bicycle
- Cat petting, feeding and comments
- Groq-powered Birthday Penguin with Saule-specific custom instructions
- Live page context sent to the assistant, including verification route, opened objects and cat interactions
- No photographs, analytics, contact details or language-profile information

## Repository structure

```text
.
├── index.html
├── styles.css
├── enhancements.css
├── ai.css
├── script.js
├── enhancements.js
├── assets/
│   ├── bicycle.svg
│   ├── cat.svg
│   └── penguin.svg
└── backend/
    ├── Code.gs
    └── appsscript.json
```

## GitHub Pages

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select `main` and `/ (root)`.
4. Save.

## Groq backend setup

The frontend is currently connected to the deployed Apps Script URL in `script.js`.

### Required Script Property

In Apps Script, open **Project Settings → Script Properties** and add:

- `GROQ_API_KEY`: your Groq API key

Optional:

- `GROQ_MODEL`: `llama-3.3-70b-versatile`

Never place the API key in GitHub or frontend JavaScript.

## Updating the live Apps Script backend

The version in `backend/Code.gs` now includes:

- A sharper Senior Birthday Delivery and Compliance Penguin personality
- Additional safe background information about Saule
- No language listings
- A controlled joke bank and anti-repetition rules
- Sanitised page-interaction context
- Longer conversation history and a higher birthday-session rate limit

Because Apps Script is deployed separately from GitHub, repository changes do not automatically update the live `/exec` deployment.

1. Replace the live Apps Script `Code.gs` with `backend/Code.gs`.
2. Save the project.
3. Open **Deploy → Manage deployments**.
4. Edit the existing web-app deployment.
5. Choose **New version** and deploy.
6. Keep **Execute as: Me** and access set to **Anyone**.

The existing `/exec` URL remains the same after updating the deployment.

## Assistant knowledge and privacy

The AI prompt contains only details deliberately supplied for the card and limited public professional background that is relevant to the humour. It excludes location, contact information, follower counts and language-profile details.

The frontend sends a small, sanitised interaction summary so the penguin can react to actions such as bypassing verification, feeding the cat or opening the laptop. It does not send personal device data or analytics.
